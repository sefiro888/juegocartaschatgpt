import { describe, expect, it } from 'vitest';
import type { CardKeywordId } from '../../types/card';
import { CardSchema } from '../../types/card';
import { CARDS_DB } from '../cardsDb';
import { CARD_KEYWORDS_BY_CARD_ID } from '../cardMechanicsCatalog';
import { cardHasKeyword, getCardKeywordIds, getCardKeywords } from '../cardKeywords';

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

  it('uses structured keywords without depending on the visible rules text', () => {
    const migratedCard = {
      keywords: ['charge', 'flying'] as CardKeywordId[],
      rulesText: 'Localized copy without mechanical names.',
    };

    expect(getCardKeywordIds(migratedCard)).toEqual(['charge', 'flying']);
    expect(cardHasKeyword(migratedCard, 'charge')).toBe(true);
    expect(cardHasKeyword(migratedCard, 'resistance')).toBe(false);
  });

  it('keeps legacy cards working while their data is being migrated', () => {
    const legacyCard = { rulesText: 'Resistencia. Movimiento Diagonal.' };

    expect(cardHasKeyword(legacyCard, 'resistance')).toBe(true);
    expect(cardHasKeyword(legacyCard, 'diagonal')).toBe(true);
  });

  it('preserves structured keywords when a game state card is validated', () => {
    const parsedCard = CardSchema.parse(CARDS_DB['sabueso-brasa']);

    expect(parsedCard.keywords).toEqual(['charge']);
  });

  it('keeps the structured mechanics catalog linked to real cards', () => {
    for (const [cardId, keywordIds] of Object.entries(CARD_KEYWORDS_BY_CARD_ID)) {
      const card = CARDS_DB[cardId];
      expect(card, `Missing card ${cardId}`).toBeDefined();
      expect(getCardKeywordIds(card)).toEqual([...keywordIds]);
    }
  });
});
