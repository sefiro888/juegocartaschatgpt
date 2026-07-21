import { describe, expect, it } from 'vitest';
import { GameStateSchema } from '../../types/card';
import { DECK_CATALOG } from '../deckCatalog';
import { executeAutomatedTurn, simulateMatch } from '../matchSimulator';
import { getCommanderForFaction, getPreconstructedDeck } from '../cardsDb';
import { initializeGame } from '../engine';

describe('recorridos completos de partida', () => {
  it('juega una partida entera sin producir estados invalidos', () => {
    const result = simulateMatch('FURIA_EMBESTIDA', 'ARCANO_GLACIAL', 'full-match-seed', 80);

    expect(result.turnsPlayed).toBeGreaterThan(2);
    expect(result.actions.mana).toBeGreaterThan(0);
    expect(result.actions.summon).toBeGreaterThan(0);
    expect(result.actions.move).toBeGreaterThan(0);
    expect(result.actions.attack).toBeGreaterThan(0);
    expect(GameStateSchema.safeParse(result.state).success).toBe(true);
    expect(new Set(Object.values(result.state.board).map((entity) => entity.id)).size)
      .toBe(Object.keys(result.state.board).length);
  });

  it.each(DECK_CATALOG)('el mazo $name completa 12 rondas sin bloquearse', ({ id, commanderFaction }) => {
    const opponent = id === 'ARCANO_GLACIAL' ? 'FURIA_EMBESTIDA' : 'ARCANO_GLACIAL';
    const opponentDefinition = DECK_CATALOG.find((deck) => deck.id === opponent);
    if (!opponentDefinition) throw new Error(`No existe el mazo rival ${opponent}.`);

    let state = initializeGame(
      getPreconstructedDeck(id),
      getPreconstructedDeck(opponent),
      getCommanderForFaction(commanderFaction),
      getCommanderForFaction(opponentDefinition.commanderFaction),
      `smoke-${id}`,
    );

    for (let turn = 0; turn < 24 && !state.winner; turn += 1) {
      state = executeAutomatedTurn(state);
      expect(GameStateSchema.safeParse(state).success).toBe(true);
    }

    expect(state.turn).toBeGreaterThanOrEqual(2);
  });
});
