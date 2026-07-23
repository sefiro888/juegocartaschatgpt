import type { Card } from '../types/card';

export type HandCardPrimaryAction = 'play-mana' | 'toggle-selection';

export function getHandCardPrimaryAction(
  card: Pick<Card, 'type'>,
  isPlayable: boolean,
): HandCardPrimaryAction {
  return card.type === 'MANA' && isPlayable
    ? 'play-mana'
    : 'toggle-selection';
}
