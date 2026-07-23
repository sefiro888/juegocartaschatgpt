import { describe, expect, it } from 'vitest';
import { analyzeDeckBalance } from '../balanceAnalysis';
import { DECK_CATALOG } from '../deckCatalog';
import { simulateMatch } from '../matchSimulator';

function readPositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

describe('analisis reproducible de balance', () => {
  it('produce exactamente el mismo resultado con la misma semilla', () => {
    const first = simulateMatch('FURIA_EMBESTIDA', 'ARCANO_GLACIAL', 'repeatable-match', 40);
    const second = simulateMatch('FURIA_EMBESTIDA', 'ARCANO_GLACIAL', 'repeatable-match', 40);

    expect(second).toEqual(first);
  });

  it('enfrenta los doce mazos desde ambos lados del tablero', () => {
    const reportMode = process.env.BALANCE_REPORT === '1';
    const seedsPerMatchup = reportMode
      ? readPositiveInteger(process.env.BALANCE_SEEDS, 3)
      : 1;
    const maxRounds = reportMode
      ? readPositiveInteger(process.env.BALANCE_ROUNDS, 60)
      : 40;
    const analysis = analyzeDeckBalance({
      seedsPerMatchup,
      maxRounds,
      seedPrefix: reportMode ? process.env.BALANCE_SEED_PREFIX ?? 'balance-report' : 'test',
    });
    const expectedMatches = DECK_CATALOG.length * (DECK_CATALOG.length - 1);

    expect(analysis.totalMatches).toBe(expectedMatches * seedsPerMatchup);
    expect(analysis.decks).toHaveLength(DECK_CATALOG.length);
    expect(analysis.decks.every((deck) =>
      deck.games === (DECK_CATALOG.length - 1) * 2 * seedsPerMatchup,
    )).toBe(true);
    expect(analysis.matches.every((match) => match.actions.mana > 0)).toBe(true);
    expect(analysis.matches.every((match) => match.actions.summon > 0)).toBe(true);

    if (reportMode) {
      const deckRows = analysis.decks.map((deck) => [
        deck.deckName.padEnd(24),
        `${(deck.winRate * 100).toFixed(1)}%`.padStart(6),
        `${(deck.completionRate * 100).toFixed(1)}%`.padStart(7),
        deck.averageRounds.toFixed(2).padStart(6),
      ].join(' | '));
      console.info([
        '',
        'Mazo                     | Victorias | Fin     | Rondas',
        '-------------------------|-----------|---------|-------',
        ...deckRows,
        '',
        `Partidas terminadas: ${analysis.completedMatches}/${analysis.totalMatches}`,
        `Duracion media: ${analysis.averageRounds} rondas`,
      ].join('\n'));
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
