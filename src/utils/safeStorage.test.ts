import { afterEach, describe, expect, it, vi } from 'vitest';
import { readLocalStorage, removeLocalStorage, writeLocalStorage } from './safeStorage';

describe('safe browser storage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('reads, writes and removes values when storage is available', () => {
    expect(writeLocalStorage('nexo-test', 'ready')).toBe(true);
    expect(readLocalStorage('nexo-test')).toBe('ready');
    expect(removeLocalStorage('nexo-test')).toBe(true);
    expect(readLocalStorage('nexo-test')).toBeNull();
  });

  it('does not crash the application when the browser blocks storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });

    expect(readLocalStorage('nexo-test')).toBeNull();
    expect(writeLocalStorage('nexo-test', 'ready')).toBe(false);
    expect(removeLocalStorage('nexo-test')).toBe(false);
  });
});
