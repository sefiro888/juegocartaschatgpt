import type { BoardEntity, Card, GameState, PlayerState, Position } from '../types/card';
import { BOARD_SIZE, OPPONENT_BACK_ROW, PLAYER_BACK_ROW } from './boardConfig';
import { getReachablePositions, isBoardObstacle } from './boardPathfinding';
import { CARDS_DB, getCommanderForFaction, getPreconstructedDeck } from './cardsDb';
import type { DeckId } from './deckCatalog';
import {
  canAfford,
  canAffordCard,
  canAttackTarget,
  combatAttack,
  endTurn,
  getDistance,
  getMovementAllowance,
  initializeGame,
  isAdjacent,
  moveUnit,
  playManaCard,
  playSpell,
  summonUnit,
} from './engine';
import { getDeckDefinition } from './deckCatalog';
import { cardHasKeyword } from './cardKeywords';
import {
  DIRECT_DAMAGE_SPELL_IDS,
  FREEZE_SPELL_IDS,
  getDirectDamageSpellDefinition,
  getFreezeSpellDefinition,
} from './spellEffectsCatalog';

type Controller = 'PLAYER' | 'OPPONENT';

export type SimulatedActionKind = 'mana' | 'summon' | 'spell' | 'attack' | 'move' | 'end-turn';

export interface MatchSimulationResult {
  state: GameState;
  winner: Controller | null;
  completedRounds: number;
  turnsPlayed: number;
  reason: 'winner' | 'turn-limit';
  actions: Record<SimulatedActionKind, number>;
}

const SUPPORTED_ENEMY_SPELLS = new Set<string>([
  ...DIRECT_DAMAGE_SPELL_IDS,
  ...FREEZE_SPELL_IDS.filter(
    (cardId) => getFreezeSpellDefinition(cardId)?.targetMode === 'single-entity',
  ),
  'vortice-mana',
]);
const SUPPORTED_FRIENDLY_SPELLS = new Set(['impetu-fuego', 'furia-nexo']);
const SUPPORTED_COLUMN_SPELLS = new Set<string>(
  FREEZE_SPELL_IDS.filter(
    (cardId) => getFreezeSpellDefinition(cardId)?.targetMode === 'column',
  ),
);
const SUPPORTED_NO_TARGET_SPELLS = new Set(['erupcion-volcanica']);

function isSupportedSpell(card: Card): boolean {
  return SUPPORTED_ENEMY_SPELLS.has(card.id)
    || SUPPORTED_FRIENDLY_SPELLS.has(card.id)
    || SUPPORTED_COLUMN_SPELLS.has(card.id)
    || SUPPORTED_NO_TARGET_SPELLS.has(card.id);
}

function getSide(state: GameState, controller: Controller): PlayerState {
  return controller === 'PLAYER' ? state.player : state.opponent;
}

function getEnemyController(controller: Controller): Controller {
  return controller === 'PLAYER' ? 'OPPONENT' : 'PLAYER';
}

function isCommander(entity: BoardEntity): boolean {
  return entity.id === 'commander-player' || entity.id === 'commander-opponent';
}

function getEntities(state: GameState, controller: Controller): BoardEntity[] {
  return Object.values(state.board).filter(
    (entity) => !isBoardObstacle(entity) && entity.controller === controller,
  );
}

function getCommander(state: GameState, controller: Controller): BoardEntity | undefined {
  const id = controller === 'PLAYER' ? 'commander-player' : 'commander-opponent';
  return Object.values(state.board).find((entity) => entity.id === id);
}

function getSummonPositions(state: GameState, controller: Controller): Position[] {
  const backRow = controller === 'PLAYER' ? PLAYER_BACK_ROW : OPPONENT_BACK_ROW;
  const allies = getEntities(state, controller);
  const positions: Position[] = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (state.board[`${x},${y}`]) continue;
      const position = { x, y };
      if (y === backRow || allies.some((entity) => isAdjacent(entity.position, position))) {
        positions.push(position);
      }
    }
  }

  return positions.sort((left, right) =>
    (controller === 'PLAYER' ? right.y - left.y : left.y - right.y)
      || Math.abs(left.x - 5) - Math.abs(right.x - 5)
      || left.x - right.x,
  );
}

function totalCost(card: Card): number {
  return card.cost.generic
    + (card.cost.furia ?? 0)
    + (card.cost.arcano ?? 0)
    + (card.cost.naturaleza ?? 0)
    + (card.cost.orden ?? 0)
    + (card.cost.sombra ?? 0)
    + (card.cost.vacio ?? 0);
}

function summonPriority(card: Card): number {
  const cost = Math.max(1, totalCost(card));
  if (card.type === 'ESTRUCTURA') return ((card.maxHealth ?? 1) + 2) / cost;
  const keywordBonus = (cardHasKeyword(card, 'charge') ? 4 : 0)
    + (cardHasKeyword(card, 'flying') ? 2 : 0)
    + (cardHasKeyword(card, 'resistance') ? 2 : 0);
  return (((card.attack ?? 0) * 2) + (card.maxHealth ?? 1) + ((card.movement ?? 1) * 2) + keywordBonus) / cost;
}

function selectBattlecryTarget(
  state: GameState,
  controller: Controller,
  card: Card,
): Position | undefined {
  if (card.id === 'tejedora-escarcha') {
    return getEntities(state, getEnemyController(controller))
      .filter((entity) => entity.frozenTurns === 0)
      .sort((left, right) => right.attack - left.attack)[0]?.position;
  }
  if (card.id === 'tejedora-tiempo') {
    return getEntities(state, controller)
      .filter((entity) => !isCommander(entity) && (entity.hasMovedThisTurn || entity.hasAttackedThisTurn))
      .sort((left, right) => right.attack - left.attack)[0]?.position;
  }
  return undefined;
}

function playMana(state: GameState): GameState {
  const controller = state.activePlayer;
  const side = getSide(state, controller);
  const manaCard = side.hand.find((card) => card.type === 'MANA');
  if (!manaCard || side.manaPlayedThisTurn) return state;
  return playManaCard(state, controller, manaCard.id);
}

function summonAffordableCards(
  initialState: GameState,
  record: (kind: SimulatedActionKind) => void,
): GameState {
  let state = initialState;
  const controller = state.activePlayer;

  for (let summons = 0; summons < 6; summons += 1) {
    const side = getSide(state, controller);
    const card = side.hand
      .filter((candidate) =>
        (candidate.type === 'UNIDAD' || candidate.type === 'ESTRUCTURA') && canAfford(side, candidate),
      )
      .sort((left, right) => summonPriority(right) - summonPriority(left)
        || totalCost(right) - totalCost(left)
        || left.id.localeCompare(right.id))[0];
    const position = getSummonPositions(state, controller)[0];
    if (!card || !position) break;

    const nextState = summonUnit(
      state,
      controller,
      card.id,
      position,
      selectBattlecryTarget(state, controller, card),
    );
    if (nextState === state) break;
    state = nextState;
    record('summon');
  }
  return state;
}

function selectEnemySpellTarget(
  state: GameState,
  controller: Controller,
  card: Card,
): Position | undefined {
  const enemies = getEntities(state, getEnemyController(controller));
  if (card.id === 'vortice-mana') {
    return enemies
      .filter((entity) => !isCommander(entity))
      .sort((left, right) => right.attack - left.attack || right.health - left.health)[0]?.position;
  }

  const damage = getDirectDamageSpellDefinition(card.id)?.damage ?? 0;
  const killable = enemies
    .filter((entity) => !isCommander(entity) && damage > 0 && entity.health <= damage)
    .sort((left, right) => right.attack - left.attack || right.health - left.health)[0];
  if (killable) return killable.position;

  return enemies
    .sort((left, right) => {
      const leftScore = (isCommander(left) ? 100 : 0) + left.attack * 3 - left.health;
      const rightScore = (isCommander(right) ? 100 : 0) + right.attack * 3 - right.health;
      return rightScore - leftScore;
    })[0]?.position;
}

function castSupportedSpells(
  initialState: GameState,
  record: (kind: SimulatedActionKind) => void,
): GameState {
  let state = initialState;
  const controller = state.activePlayer;

  for (let casts = 0; casts < 4; casts += 1) {
    const side = getSide(state, controller);
    const card = side.hand.find((candidate) =>
      candidate.type === 'HECHIZO' && isSupportedSpell(candidate) && canAffordCard(state, controller, candidate),
    );
    if (!card) break;

    let target: Position | undefined;
    if (SUPPORTED_ENEMY_SPELLS.has(card.id)) {
      target = selectEnemySpellTarget(state, controller, card);
      if (!target) break;
    } else if (SUPPORTED_FRIENDLY_SPELLS.has(card.id)) {
      target = getEntities(state, controller)
        .filter((entity) => !isCommander(entity))
        .sort((left, right) => right.attack - left.attack)[0]?.position;
      if (!target) break;
    } else if (SUPPORTED_COLUMN_SPELLS.has(card.id)) {
      target = selectEnemySpellTarget(state, controller, card);
      if (!target) break;
    } else if (!SUPPORTED_NO_TARGET_SPELLS.has(card.id)) {
      break;
    }

    const nextState = playSpell(state, controller, card.id, target);
    if (nextState === state) break;
    state = nextState;
    record('spell');
    if (state.winner) break;
  }
  return state;
}

function attackAvailableTargets(
  initialState: GameState,
  record: (kind: SimulatedActionKind) => void,
): GameState {
  let state = initialState;
  const controller = state.activePlayer;

  for (let attacks = 0; attacks < 30 && !state.winner; attacks += 1) {
    const attacker = getEntities(state, controller)
      .filter((entity) => !entity.hasAttackedThisTurn && entity.frozenTurns === 0)
      .find((entity) => Object.values(state.board).some((target) =>
        target.id !== entity.id && canAttackTarget(state, entity.position, target.position),
      ));
    if (!attacker) break;

    const target = Object.values(state.board)
      .filter((entity) => entity.id !== attacker.id && canAttackTarget(state, attacker.position, entity.position))
      .sort((left, right) => {
        const score = (entity: BoardEntity) =>
          (isCommander(entity) ? 10_000 : 0)
          + (entity.health <= attacker.attack ? 1_000 : 0)
          + entity.attack * 10
          - entity.health;
        return score(right) - score(left);
      })[0];
    if (!target) break;

    const nextState = combatAttack(state, attacker.position, target.position);
    if (nextState === state) break;
    state = nextState;
    record('attack');
  }
  return state;
}

function moveTowardEnemy(
  initialState: GameState,
  record: (kind: SimulatedActionKind) => void,
): GameState {
  let state = initialState;
  const controller = state.activePlayer;
  const enemyCommander = getCommander(state, getEnemyController(controller));
  if (!enemyCommander) return state;

  const unitIds = getEntities(state, controller)
    .filter((entity) => !isCommander(entity))
    .map((entity) => entity.id);

  for (const unitId of unitIds) {
    const unit = getEntities(state, controller).find((entity) => entity.id === unitId);
    if (!unit || unit.hasMovedThisTurn || unit.frozenTurns > 0) continue;
    const card = CARDS_DB[unit.cardId];
    if (!card || card.type === 'ESTRUCTURA') continue;

    const currentDistance = getDistance(unit.position, enemyCommander.position);
    const destination = getReachablePositions(state.board, unit.position, getMovementAllowance(state, unit), {
      allowDiagonal: true,
      canFly: cardHasKeyword(card, 'flying'),
    })
      .sort((left, right) =>
        getDistance(left.position, enemyCommander.position) - getDistance(right.position, enemyCommander.position)
          || left.position.x - right.position.x
          || left.position.y - right.position.y,
      )
      .find((candidate) => getDistance(candidate.position, enemyCommander.position) < currentDistance);
    if (!destination) continue;

    const nextState = moveUnit(state, unit.position, destination.position);
    if (nextState !== state) {
      state = nextState;
      record('move');
    }
  }
  return state;
}

export function executeAutomatedTurn(
  initialState: GameState,
  onAction?: (kind: SimulatedActionKind, state: GameState) => void,
): GameState {
  if (initialState.winner) return initialState;
  let state = initialState;
  const record = (kind: SimulatedActionKind) => onAction?.(kind, state);

  const afterMana = playMana(state);
  if (afterMana !== state) {
    state = afterMana;
    record('mana');
  }
  state = summonAffordableCards(state, record);
  state = castSupportedSpells(state, record);
  state = attackAvailableTargets(state, record);
  state = moveTowardEnemy(state, record);
  state = attackAvailableTargets(state, record);

  if (!state.winner) state = endTurn(state);
  record('end-turn');
  return state;
}

export function simulateMatch(
  playerDeckId: DeckId,
  opponentDeckId: DeckId,
  seed: string,
  maxRounds = 80,
): MatchSimulationResult {
  const playerDeck = getDeckDefinition(playerDeckId);
  const opponentDeck = getDeckDefinition(opponentDeckId);
  let state = initializeGame(
    getPreconstructedDeck(playerDeckId),
    getPreconstructedDeck(opponentDeckId),
    getCommanderForFaction(playerDeck.commanderFaction),
    getCommanderForFaction(opponentDeck.commanderFaction),
    seed,
  );
  const actions: Record<SimulatedActionKind, number> = {
    mana: 0,
    summon: 0,
    spell: 0,
    attack: 0,
    move: 0,
    'end-turn': 0,
  };
  const maxTurns = maxRounds * 2;
  let turnsPlayed = 0;

  while (!state.winner && turnsPlayed < maxTurns) {
    state = executeAutomatedTurn(state, (kind) => {
      actions[kind] += 1;
    });
    turnsPlayed += 1;
  }

  return {
    state,
    winner: state.winner,
    completedRounds: state.turn - 1,
    turnsPlayed,
    reason: state.winner ? 'winner' : 'turn-limit',
    actions,
  };
}
