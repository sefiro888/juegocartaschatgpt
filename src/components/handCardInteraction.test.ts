import { describe, expect, it } from 'vitest';
import { getHandCardPrimaryAction } from './handCardInteraction';

describe('hand card primary action', () => {
  it('plays an available mana source immediately on every layout and game mode', () => {
    expect(getHandCardPrimaryAction({ type: 'MANA' }, true)).toBe('play-mana');
  });

  it('keeps blocked mana and other cards on the normal selection flow', () => {
    expect(getHandCardPrimaryAction({ type: 'MANA' }, false)).toBe('toggle-selection');
    expect(getHandCardPrimaryAction({ type: 'UNIDAD' }, true)).toBe('toggle-selection');
    expect(getHandCardPrimaryAction({ type: 'HECHIZO' }, true)).toBe('toggle-selection');
  });
});
