import { describe, expect, it } from 'vitest';
import { getCommanderForFaction } from '../core/cardsDb';
import { initializeGame } from '../core/engine';
import type { GameState, ManaSources } from '../types/card';
import { validateOnlineGameState } from './gameStateValidation';

describe('validacion del estado online', () => {
  it('migra recursos antiguos antes de validar', () => {
    const state = initializeGame([], [], getCommanderForFaction('FURIA'), getCommanderForFaction('ARCANO'), 'online-legacy');
    const legacyMana = {
      furia: { total: 3, spent: 1 },
      arcano: { total: 2, spent: 0 },
    } as unknown as ManaSources;

    const recovered = validateOnlineGameState({
      ...state,
      player: { ...state.player, manaSources: legacyMana },
    });

    expect(recovered.player.manaSources.furia.total).toBe(3);
    expect(recovered.player.manaSources.orden.total).toBe(0);
  });

  it('rechaza coordenadas imposibles antes de renderizar el tablero', () => {
    const state = initializeGame([], [], getCommanderForFaction('FURIA'), getCommanderForFaction('ARCANO'), 'online-invalid');
    const invalidState = {
      ...state,
      board: {
        ...state.board,
        '20,20': {
          ...state.board['5,0'],
          position: { x: 20, y: 20 },
        },
      },
    } as GameState;

    expect(() => validateOnlineGameState(invalidState)).toThrow('no es compatible');
  });
});
