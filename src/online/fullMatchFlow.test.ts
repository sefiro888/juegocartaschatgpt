import { describe, expect, it } from 'vitest';
import { executeAutomatedTurn } from '../core/matchSimulator';
import { configureOnlineGuestDeck, createOnlineGameState } from './gameSetup';
import { validateOnlineGameState } from './gameStateValidation';
import { shouldApplyOnlineRevision } from './syncPolicy';

describe('recorrido completo de una partida online', () => {
  it('crea, configura, juega, serializa y recupera el estado compartido', () => {
    const waitingState = createOnlineGameState('NATURALEZA_RAICES');
    let state = configureOnlineGuestDeck(waitingState, 'SOMBRA_CRIPTA');
    let revision = 0;

    for (let turn = 0; turn < 20 && !state.winner; turn += 1) {
      const nextState = executeAutomatedTurn(state);
      const incomingRevision = revision + 1;

      expect(shouldApplyOnlineRevision(revision, incomingRevision, false)).toBe(true);
      state = validateOnlineGameState(JSON.parse(JSON.stringify(nextState)) as typeof nextState);
      revision = incomingRevision;
    }

    expect(revision).toBeGreaterThan(0);
    expect(state.turn).toBeGreaterThan(1);
    expect(state.player.commander.faction).toBe('NATURALEZA');
    expect(state.opponent.commander.faction).toBe('SOMBRA');
    expect(() => validateOnlineGameState(state)).not.toThrow();
  });
});
