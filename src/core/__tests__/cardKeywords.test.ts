import { describe, expect, it } from 'vitest';
import { getCardKeywords } from '../cardKeywords';

describe('card keywords', () => {
  it('recognizes multiple printed keywords without duplicates', () => {
    const keywords = getCardKeywords('Vuelo. Grito de Batalla: Congela una unidad. Vuelo.');
    expect(keywords.map((keyword) => keyword.id)).toEqual(['flying', 'freeze', 'battlecry']);
  });

  it('recognizes accented and fallback spellings', () => {
    expect(getCardKeywords('Último Aliento y Movimiento Diagonal').map((keyword) => keyword.id))
      .toEqual(['last-breath', 'diagonal']);
    expect(getCardKeywords('Inmune a Hechizos').map((keyword) => keyword.id))
      .toContain('spell-immunity');
  });
});
