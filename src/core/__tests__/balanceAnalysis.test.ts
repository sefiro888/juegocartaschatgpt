import { describe, expect, it } from 'vitest';
import { analyzeDeckBalance } from '../balanceAnalysis';
import { DECK_CATALOG } from '../deckCatalog';
import { simulateMatch } from '../matchSimulator';

describe('analisis reproducible de balance', () => {
  it('produce exactamente el mismo resultado con la misma semilla', () => {
    const first = simulateMatch('FURIA_EMBESTIDA', 'ARCANO_GLACIAL', 'repeatable-match', 40);
    const second = simulateMatch('FURIA_EMBESTIDA', 'ARCANO_GLACIAL', 'repeatable-match', 40);

    expect(second).toEqual(first);
  });

  it('enfrenta los doce mazos desde ambos lados del tablero', () => {
    const reportMode = process.env.BALANCE_REPORT === '1';
    const analysis = analyzeDeckBalance({
      seedsPerMatchup: reportMode ? 3 : 1,
      maxRounds: reportMode ? 60 : 40,
      seedPrefix: 'test',
    });
    const expectedMatches = DECK_CATALOG.length * (DECK_CATALOG.length - 1);

    expect(analysis.totalMatches).toBe(expectedMatches * (reportMode ? 3 : 1));
    expect(analysis.decks).toHaveLength(DECK_CATALOG.length);
    expect(analysis.decks.every((deck) =>
      deck.games === (DECK_CATALOG.length - 1) * 2 * (reportMode ? 3 : 1),
    )).toBe(true);
    expect(analysis.matches.every((match) => match.actions.mana > 0)).toBe(true);
    expect(analysis.matches.every((match) => match.actions.summon > 0)).toBe(true);

    if (reportMode) {
      console.info('BALANCE_REPORT', JSON.stringify({
        totalMatches: analysis.totalMatches,
        completedMatches: analysis.completedMatches,
        completionRate: analysis.completionRate,
        averageRounds: analysis.averageRounds,
        decks: analysis.decks,
      }));
    }
  }, 15_000);
});
