import { getCommanderForFaction, getPreconstructedDeck } from '../core/cardsDb';
import { DECK_CATALOG, getDeckDefinition, type DeckId } from '../core/deckCatalog';
import { initializeGame } from '../core/engine';
import type { GameState } from '../types/card';

export function createOnlineGameState(hostDeckId: DeckId): GameState {
  const hostDeck = getDeckDefinition(hostDeckId);
  const guestDeckId = DECK_CATALOG.find((deck) => deck.commanderFaction !== hostDeck.commanderFaction)?.id ?? 'ARCANO_GLACIAL';
  const guestDeck = getDeckDefinition(guestDeckId);

  return initializeGame(
    getPreconstructedDeck(hostDeck.id),
    getPreconstructedDeck(guestDeck.id),
    getCommanderForFaction(hostDeck.commanderFaction),
    getCommanderForFaction(guestDeck.commanderFaction),
    `online-game-${Date.now()}`,
  );
}

export function configureOnlineGuestDeck(gameState: GameState, guestDeckId: DeckId): GameState {
  const guestDeck = getDeckDefinition(guestDeckId);
  const completeHostDeck = [
    ...gameState.player.hand,
    ...gameState.player.deck,
    ...gameState.player.graveyard,
  ];

  return initializeGame(
    completeHostDeck,
    getPreconstructedDeck(guestDeck.id),
    gameState.player.commander,
    getCommanderForFaction(guestDeck.commanderFaction),
    `${gameState.seed}-guest-ready`,
  );
}
