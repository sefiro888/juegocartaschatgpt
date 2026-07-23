import { describe, expect, it } from 'vitest';
import type { BoardEntity, GameState } from '../../types/card';
import { CARDS_DB, getCommanderForFaction, getPreconstructedDeck } from '../cardsDb';
import {
  canAfford,
  canAffordCard,
  combatAttack,
  getMovementAllowance,
  initializeGame,
  playSpell,
  summonUnit,
} from '../engine';
import { MANA_TYPES } from '../factionRules';

function createState(): GameState {
  const state = initializeGame(
    getPreconstructedDeck('NATURALEZA_RAICES'),
    getPreconstructedDeck('SOMBRA_CRIPTA'),
    getCommanderForFaction('NATURALEZA'),
    getCommanderForFaction('SOMBRA'),
    'faction-mechanics',
  );
  for (const manaType of MANA_TYPES) state.player.manaSources[manaType].total = 10;
  return state;
}

function entity(cardId: string, id: string, controller: BoardEntity['controller'], x: number, y: number): BoardEntity {
  const card = CARDS_DB[cardId];
  return {
    id,
    cardId,
    controller,
    position: { x, y },
    health: card.maxHealth ?? 1,
    maxHealth: card.maxHealth ?? 1,
    attack: card.attack ?? 0,
    hasMovedThisTurn: false,
    hasAttackedThisTurn: false,
    frozenTurns: 0,
  };
}

describe('mecanicas de las facciones curadas', () => {
  it('aplica el dano de los hechizos de Naturaleza, Orden y Sombra', () => {
    const spellCases = [
      ['espora-venenosa', 2],
      ['juicio-divino', 3],
      ['pesadilla-mortal', 3],
    ] as const;

    for (const [cardId, damage] of spellCases) {
      const state = createState();
      state.player.hand = [{ ...CARDS_DB[cardId] }];
      const result = playSpell(state, 'PLAYER', cardId, { x: 5, y: 9 });
      expect(result.board['5,9'].health).toBe(25 - damage);
    }
  });

  it('reduce el coste de hechizos mientras haya un Aprendiz del Nexo', () => {
    const state = createState();
    const spell = CARDS_DB['cometa-arcano'];
    state.player.hand = [{ ...spell }];
    for (const manaType of MANA_TYPES) state.player.manaSources[manaType].total = 0;
    state.player.manaSources.arcano.total = 5;
    state.board['4,0'] = entity('aprendiz-nexo', 'apprentice-test', 'PLAYER', 4, 0);

    expect(canAfford(state.player, spell)).toBe(false);
    expect(canAffordCard(state, 'PLAYER', spell)).toBe(true);
    expect(playSpell(state, 'PLAYER', spell.id, { x: 5, y: 9 }).board['5,9'].health).toBe(21);
  });

  it('aplica el aura del Totem y la ralentizacion de la Horca', () => {
    let state = createState();
    state.player.hand = [{ ...CARDS_DB['totem-naturaleza'] }, { ...CARDS_DB['fauno-bosque'] }];
    state = summonUnit(state, 'PLAYER', 'totem-naturaleza', { x: 4, y: 0 });
    state = summonUnit(state, 'PLAYER', 'fauno-bosque', { x: 4, y: 1 });
    expect(state.board['4,1'].maxHealth).toBe((CARDS_DB['fauno-bosque'].maxHealth ?? 1) + 1);

    state.board['3,1'] = entity('horca-renegada', 'gallows-test', 'OPPONENT', 3, 1);
    expect(getMovementAllowance(state, state.board['4,1'])).toBe(0);
  });

  it('cura al Vampiro Noble cuando inflige dano de combate', () => {
    const state = createState();
    state.board['4,4'] = entity('vampiro-noble', 'vampire-test', 'PLAYER', 4, 4);
    state.board['4,4'].health = 3;
    state.board['4,5'] = entity('zombi-hambriento', 'target-test', 'OPPONENT', 4, 5);

    const result = combatAttack(state, { x: 4, y: 4 }, { x: 4, y: 5 });
    expect(result.board['4,4'].health).toBeGreaterThanOrEqual(2);
  });
});
