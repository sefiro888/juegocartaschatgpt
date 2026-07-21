import { DECK_CATALOG, type DeckId } from './deckCatalog';
import { simulateMatch, type SimulatedActionKind } from './matchSimulator';

export interface BalanceAnalysisOptions {
  seedsPerMatchup?: number;
  maxRounds?: number;
  seedPrefix?: string;
}

export interface DeckBalanceStats {
  deckId: DeckId;
  deckName: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  completionRate: number;
  averageRounds: number;
  averageActions: number;
}

export interface MatchupBalanceResult {
  playerDeckId: DeckId;
  opponentDeckId: DeckId;
  seed: string;
  winnerDeckId: DeckId | null;
  rounds: number;
  completed: boolean;
  actions: Record<SimulatedActionKind, number>;
}

export interface BalanceAnalysis {
  matches: MatchupBalanceResult[];
  decks: DeckBalanceStats[];
  totalMatches: number;
  completedMatches: number;
  completionRate: number;
  averageRounds: number;
}

function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function analyzeDeckBalance(options: BalanceAnalysisOptions = {}): BalanceAnalysis {
  const seedsPerMatchup = Math.max(1, Math.floor(options.seedsPerMatchup ?? 1));
  const maxRounds = Math.max(1, Math.floor(options.maxRounds ?? 60));
  const seedPrefix = options.seedPrefix ?? 'balance';
  const matches: MatchupBalanceResult[] = [];

  for (const playerDeck of DECK_CATALOG) {
    for (const opponentDeck of DECK_CATALOG) {
      if (playerDeck.id === opponentDeck.id) continue;

      for (let sample = 0; sample < seedsPerMatchup; sample += 1) {
        const seed = `${seedPrefix}:${playerDeck.id}:${opponentDeck.id}:${sample}`;
        const result = simulateMatch(playerDeck.id, opponentDeck.id, seed, maxRounds);
        matches.push({
          playerDeckId: playerDeck.id,
          opponentDeckId: opponentDeck.id,
          seed,
          winnerDeckId: result.winner === 'PLAYER'
            ? playerDeck.id
            : result.winner === 'OPPONENT'
              ? opponentDeck.id
              : null,
          rounds: result.completedRounds,
          completed: result.reason === 'winner',
          actions: result.actions,
        });
      }
    }
  }

  const decks = DECK_CATALOG.map((deck): DeckBalanceStats => {
    const deckMatches = matches.filter((match) =>
      match.playerDeckId === deck.id || match.opponentDeckId === deck.id,
    );
    const wins = deckMatches.filter((match) => match.winnerDeckId === deck.id).length;
    const draws = deckMatches.filter((match) => match.winnerDeckId === null).length;
    const losses = deckMatches.length - wins - draws;
    const totalActions = deckMatches.reduce(
      (sum, match) => sum + Object.values(match.actions).reduce((actionSum, count) => actionSum + count, 0),
      0,
    );

    return {
      deckId: deck.id,
      deckName: deck.name,
      games: deckMatches.length,
      wins,
      losses,
      draws,
      winRate: round(deckMatches.length > 0 ? wins / deckMatches.length : 0, 3),
      completionRate: round(deckMatches.length > 0 ? (deckMatches.length - draws) / deckMatches.length : 0, 3),
      averageRounds: round(
        deckMatches.length > 0
          ? deckMatches.reduce((sum, match) => sum + match.rounds, 0) / deckMatches.length
          : 0,
      ),
      averageActions: round(deckMatches.length > 0 ? totalActions / deckMatches.length : 0),
    };
  });
  const completedMatches = matches.filter((match) => match.completed).length;

  return {
    matches,
    decks,
    totalMatches: matches.length,
    completedMatches,
    completionRate: round(matches.length > 0 ? completedMatches / matches.length : 0, 3),
    averageRounds: round(
      matches.length > 0 ? matches.reduce((sum, match) => sum + match.rounds, 0) / matches.length : 0,
    ),
  };
}
