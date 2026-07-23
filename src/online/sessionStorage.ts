import type { OnlineRole } from './types';
import { readLocalStorage, removeLocalStorage, writeLocalStorage } from '../utils/safeStorage';

const ONLINE_SESSION_STORAGE_KEY = 'nexo-online-session-v1';

export interface StoredOnlineSession {
  matchId: string;
  roomCode: string;
  role: OnlineRole;
}

export function parseStoredOnlineSession(value: string | null): StoredOnlineSession | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<StoredOnlineSession>;
    if (
      typeof parsed.matchId !== 'string' || !parsed.matchId ||
      typeof parsed.roomCode !== 'string' || !/^[A-Z2-9]{6}$/.test(parsed.roomCode) ||
      (parsed.role !== 'host' && parsed.role !== 'guest')
    ) return null;
    return { matchId: parsed.matchId, roomCode: parsed.roomCode, role: parsed.role };
  } catch {
    return null;
  }
}

export function loadStoredOnlineSession(): StoredOnlineSession | null {
  return parseStoredOnlineSession(readLocalStorage(ONLINE_SESSION_STORAGE_KEY));
}

export function saveStoredOnlineSession(session: StoredOnlineSession): void {
  writeLocalStorage(ONLINE_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredOnlineSession(): void {
  removeLocalStorage(ONLINE_SESSION_STORAGE_KEY);
}
