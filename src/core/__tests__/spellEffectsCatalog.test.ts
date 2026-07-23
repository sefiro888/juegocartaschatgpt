import { describe, expect, it } from 'vitest';
import type { BoardEntity, GameState } from '../../types/card';
import { CARDS_DB, getCommanderForFaction, getPreconstructedDeck } from '../cardsDb';
import { canSpellTargetObstacle, initializeGame, playSpell } from '../engine';
import { MANA_TYPES } from '../factionRules';
import {
  DIRECT_DAMAGE_SPELLS,
  FREEZE_SPELLS,
  getDirectDamageSpellDefinition,
  getFreezeSpellDefinition,
} from '../spellEffectsCatalog';

function createSpellState(): GameState {
  const state = initializeGame(
    getPreconstructedDeck('FURIA_EMBESTIDA'),
    getPreconstructedDeck('ARCANO_GLACIAL'),
    getCommanderForFaction('FURIA'),
    getCommanderForFaction('ARCANO'),
    'structured-spell-effects',
  );
  for (const manaType of MANA_TYPES) state.player.manaSources[manaType].total = 10;
  return state;
}

function createEntity(
  cardId: string,
  id: string,
  controller: BoardEntity['controller'],
  x: number,
  y: number,
): BoardEntity {
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

describe('structured spell effects', () => {
  it('links every direct-damage definition to a real spell card', () => {
    for (const [cardId, definition] of Object.entries(DIRECT_DAMAGE_SPELLS)) {
      expect(CARDS_DB[cardId]?.type, `Invalid direct-damage spell ${cardId}`).toBe('HECHIZO');
      expect(definition.damage).toBeGreaterThan(0);
      expect(getDirectDamageSpellDefinition(cardId)).toEqual(definition);
    }
  });

  it('derives obstacle targeting from the spell definition', () => {
    expect(canSpellTargetObstacle('lluvia-ceniza')).toBe(true);
    expect(canSpellTargetObstacle('chispa-fugaz')).toBe(true);
    expect(canSpellTargetObstacle('cometa-arcano')).toBe(true);
    expect(canSpellTargetObstacle('espora-venenosa')).toBe(false);
  });

  it('keeps Chispa Fugaz damage and deterministic discard behavior', () => {
    const state = createSpellState();
    state.player.hand = [
      { ...CARDS_DB['chispa-fugaz'] },
      { ...CARDS_DB['sabueso-brasa'] },
      { ...CARDS_DB['centinela-cristal'] },
    ];
    state.player.deck = [];

    const result = playSpell(state, 'PLAYER', 'chispa-fugaz', { x: 5, y: 9 });

    expect(result.board['5,9'].health).toBe(23);
    expect(result.player.hand).toHaveLength(1);
    expect(result.player.graveyard.map((card) => card.id)).toContain('chispa-fugaz');
    expect(result.player.graveyard).toHaveLength(2);
  });

  it('keeps Cometa Arcano damage and card draw behavior', () => {
    const state = createSpellState();
    state.player.hand = [{ ...CARDS_DB['cometa-arcano'] }];
    state.player.deck = [{ ...CARDS_DB['sabueso-brasa'] }];

    const result = playSpell(state, 'PLAYER', 'cometa-arcano', { x: 5, y: 9 });

    expect(result.board['5,9'].health).toBe(21);
    expect(result.player.deck).toHaveLength(0);
    expect(result.player.hand.map((card) => card.id)).toEqual(['sabueso-brasa']);
  });

  it('links every freeze definition to a real spell card', () => {
    for (const [cardId, definition] of Object.entries(FREEZE_SPELLS)) {
      expect(CARDS_DB[cardId]?.type, `Invalid freeze spell ${cardId}`).toBe('HECHIZO');
      expect(definition.duration).toBeGreaterThan(0);
      expect(getFreezeSpellDefinition(cardId)).toEqual(definition);
    }
  });

  it('keeps Prision Glacial at two frozen turns', () => {
    const state = createSpellState();
    state.player.hand = [{ ...CARDS_DB['prision-glacial'] }];

    const result = playSpell(state, 'PLAYER', 'prision-glacial', { x: 5, y: 9 });

    expect(result.board['5,9'].frozenTurns).toBe(2);
  });

  it('keeps Destello Runico adjacency and draw behavior', () => {
    const state = createSpellState();
    state.player.hand = [{ ...CARDS_DB['destello-runico'] }];
    state.player.deck = [{ ...CARDS_DB['sabueso-brasa'] }];
    state.board['4,0'] = createEntity('centinela-cristal', 'flash-target', 'OPPONENT', 4, 0);

    const result = playSpell(state, 'PLAYER', 'destello-runico', { x: 4, y: 0 });

    expect(result.board['4,0'].frozenTurns).toBe(1);
    expect(result.player.hand.map((card) => card.id)).toEqual(['sabueso-brasa']);
  });

  it('keeps Congelacion Rapida enemy filtering and draw behavior', () => {
    const state = createSpellState();
    state.player.hand = [{ ...CARDS_DB['congelacion-rapida'] }];
    state.player.deck = [{ ...CARDS_DB['sabueso-brasa'] }];
    state.board['4,4'] = createEntity('centinela-cristal', 'quick-freeze-target', 'OPPONENT', 4, 4);

    const result = playSpell(state, 'PLAYER', 'congelacion-rapida', { x: 4, y: 4 });

    expect(result.board['4,4'].frozenTurns).toBe(1);
    expect(result.player.hand.map((card) => card.id)).toEqual(['sabueso-brasa']);
  });

  it('freezes only vulnerable enemies in the selected Tormenta de Mana column', () => {
    const state = createSpellState();
    state.player.hand = [{ ...CARDS_DB['tormenta-mana'] }];
    state.board['4,4'] = createEntity('sabueso-brasa', 'storm-target', 'OPPONENT', 4, 4);
    state.board['4,5'] = createEntity('golem-glaciar', 'storm-immune', 'OPPONENT', 4, 5);
    state.board['4,3'] = createEntity('sabueso-brasa', 'storm-friendly', 'PLAYER', 4, 3);
    state.board['3,4'] = createEntity('sabueso-brasa', 'storm-other-column', 'OPPONENT', 3, 4);

    const result = playSpell(state, 'PLAYER', 'tormenta-mana', { x: 4, y: 4 });

    expect(result.board['4,4'].frozenTurns).toBe(1);
    expect(result.board['4,5'].frozenTurns).toBe(0);
    expect(result.board['4,3'].frozenTurns).toBe(0);
    expect(result.board['3,4'].frozenTurns).toBe(0);
  });
});
