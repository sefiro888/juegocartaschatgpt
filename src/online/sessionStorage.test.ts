import { describe, expect, it } from 'vitest';
import { parseStoredOnlineSession } from './sessionStorage';

describe('persistencia de la sesion online', () => {
  it('recupera una sesion valida', () => {
    expect(parseStoredOnlineSession(JSON.stringify({
      matchId: 'match-123',
      roomCode: 'ABC234',
      role: 'guest',
    }))).toEqual({ matchId: 'match-123', roomCode: 'ABC234', role: 'guest' });
  });

  it.each([
    null,
    '',
    '{',
    JSON.stringify({ matchId: '', roomCode: 'ABC234', role: 'host' }),
    JSON.stringify({ matchId: 'match-123', roomCode: 'BAD', role: 'host' }),
    JSON.stringify({ matchId: 'match-123', roomCode: 'ABC234', role: 'spectator' }),
  ])('rechaza datos incompletos o manipulados', (serialized) => {
    expect(parseStoredOnlineSession(serialized)).toBeNull();
  });
});
