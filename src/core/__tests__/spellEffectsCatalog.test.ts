import { describe, expect, it } from 'vitest';
import type { BoardEntity, GameState } from '../../types/card';
import { CARDS_DB, getCommanderForFaction, getPreconstructedDeck } from '../cardsDb';
import { canSpellTargetObstacle, initializeGame, playSpell } from '../engine';
import { MANA_TYPES } from '../factionRules';
import {
  BOUNCE_SPELLS,
  DIRECT_DAMAGE_SPELLS,
  FREEZE_SPELLS,
  FRIENDLY_BUFF_SPELLS,
  GLOBAL_DAMAGE_SPELLS,
  getBounceSpellDefinition,
  getDirectDamageSpellDefinition,
  getFreezeSpellDefinition,
  getFriendlyBuffSpellDefinition,
  getGlobalDamageSpellDefinition,
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

  it('links friendly buffs to real spells and preserves their action resets', () => {
    for (const [cardId, definition] of Object.entries(FRIENDLY_BUFF_SPELLS)) {
      expect(CARDS_DB[cardId]?.type, `Invalid friendly buff ${cardId}`).toBe('HECHIZO');
      expect(getFriendlyBuffSpellDefinition(cardId)).toEqual(definition);
    }

    const impetusState = createSpellState();
    impetusState.player.hand = [{ ...CARDS_DB['impetu-fuego'] }];
    impetusState.board['4,4'] = createEntity('sabueso-brasa', 'impetus-target', 'PLAYER', 4, 4);
    impetusState.board['4,4'].hasMovedThisTurn = true;
    impetusState.board['4,4'].hasAttackedThisTurn = true;

    const impetusResult = playSpell(impetusState, 'PLAYER', 'impetu-fuego', { x: 4, y: 4 });

    expect(impetusResult.board['4,4']).toMatchObject({
      attack: 4,
      hasMovedThisTurn: false,
      hasAttackedThisTurn: true,
    });

    const furyState = createSpellState();
    furyState.player.hand = [{ ...CARDS_DB['furia-nexo'] }];
    furyState.board['4,4'] = createEntity('sabueso-brasa', 'fury-target', 'PLAYER', 4, 4);
    furyState.board['4,4'].hasMovedThisTurn = true;
    furyState.board['4,4'].hasAttackedThisTurn = true;

    const furyResult = playSpell(furyState, 'PLAYER', 'furia-nexo', { x: 4, y: 4 });

    expect(furyResult.board['4,4']).toMatchObject({
      attack: 5,
      hasMovedThisTurn: false,
      hasAttackedThisTurn: false,
    });
  });

  it('returns a non-commander entity to its owner hand through the bounce catalog', () => {
    expect(getBounceSpellDefinition('vortice-mana')).toEqual(BOUNCE_SPELLS['vortice-mana']);

    const state = createSpellState();
    state.player.hand = [{ ...CARDS_DB['vortice-mana'] }];
    state.board['4,4'] = createEntity('sabueso-brasa', 'bounce-target', 'OPPONENT', 4, 4);
    const opponentHandSize = state.opponent.hand.length;

    const result = playSpell(state, 'PLAYER', 'vortice-mana', { x: 4, y: 4 });

    expect(result.board['4,4']).toBeUndefined();
    expect(result.opponent.hand).toHaveLength(opponentHandSize + 1);
    expect(result.opponent.hand.at(-1)?.id).toBe('sabueso-brasa');
  });

  it('applies cataloged global damage without harming commanders', () => {
    expect(getGlobalDamageSpellDefinition('erupcion-volcanica')).toEqual(
      GLOBAL_DAMAGE_SPELLS['erupcion-volcanica'],
    );

    const state = createSpellState();
    state.player.hand = [{ ...CARDS_DB['erupcion-volcanica'] }];
    state.board['3,3'] = createEntity('sabueso-brasa', 'eruption-unit', 'OPPONENT', 3, 3);
    state.board['4,4'] = createEntity('obstaculo-risco', 'eruption-obstacle', 'OPPONENT', 4, 4);
    state.board['4,4'].health = 3;
    state.board['4,4'].maxHealth = 3;

    const result = playSpell(state, 'PLAYER', 'erupcion-volcanica');

    expect(result.board['3,3']).toBeUndefined();
    expect(result.board['4,4'].health).toBe(1);
    expect(result.board['5,0'].health).toBe(25);
    expect(result.board['5,9'].health).toBe(25);
  });
});
