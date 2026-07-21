import { GameStateSchema, type GameState } from '../types/card';
import { normalizeGameStateResources } from '../core/factionRules';

export function validateOnlineGameState(gameState: GameState): GameState {
  const normalized = normalizeGameStateResources(gameState);
  const result = GameStateSchema.safeParse(normalized);
  if (!result.success) {
    throw new Error('El estado online recibido no es compatible con esta version del juego.');
  }
  return result.data;
}
