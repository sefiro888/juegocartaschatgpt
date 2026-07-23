import { describe, expect, it } from 'vitest';
import { DECK_CATALOG } from '../deckCatalog';
import { CARDS_DB, getCommanderForFaction, getPreconstructedDeck } from '../cardsDb';
import { canAfford, initializeGame, playManaCard } from '../engine';
import {
  MANA_SOURCE_CARD_IDS,
  MANA_TYPES,
  createEmptyManaSources,
  factionToManaType,
  normalizeGameStateResources,
} from '../factionRules';
import type { Card, Faction, ManaSources } from '../../types/card';

const FACTIONS: readonly Faction[] = ['FURIA', 'ARCANO', 'NATURALEZA', 'ORDEN', 'SOMBRA', 'VACIO'];

describe('recursos de las seis facciones', () => {
  it.each(FACTIONS)('%s tiene fuente y comandante propios', (faction) => {
    const manaType = factionToManaType(faction);
    const source = CARDS_DB[MANA_SOURCE_CARD_IDS[manaType]];
    const commander = getCommanderForFaction(faction);

    expect(source.type).toBe('MANA');
    expect(source.faction).toBe(faction);
    expect(commander.type).toBe('COMANDANTE');
    expect(commander.faction).toBe(faction);
  });

  it.each(DECK_CATALOG)('$id incluye fuentes para todos los costes de faccion', (definition) => {
    const deck = getPreconstructedDeck(definition.id);
    const sourceFactions = new Set(
      deck.filter((card) => card.type === 'MANA').map((card) => card.faction),
    );

    for (const card of deck.filter((candidate) => candidate.type !== 'MANA')) {
      for (const manaType of MANA_TYPES) {
        if ((card.cost[manaType] ?? 0) > 0) {
          expect(sourceFactions.has(manaType.toUpperCase() as Faction)).toBe(true);
        }
      }
    }
  });

  it.each(FACTIONS)('jugar una fuente de %s aumenta solo su reserva', (faction) => {
    const playerCommander = getCommanderForFaction(faction);
    const opponentCommander = getCommanderForFaction(faction === 'FURIA' ? 'ARCANO' : 'FURIA');
    let state = initializeGame([], [], playerCommander, opponentCommander, `resource-${faction}`);
    const manaType = factionToManaType(faction);
    const source = CARDS_DB[MANA_SOURCE_CARD_IDS[manaType]];
    state.player.hand = [{ ...source }];

    state = playManaCard(state, 'PLAYER', source.id);

    expect(state.player.manaSources[manaType].total).toBe(1);
    expect(
      MANA_TYPES.filter((candidate) => candidate !== manaType)
        .every((candidate) => state.player.manaSources[candidate].total === 0),
    ).toBe(true);
  });

  it('exige el color correcto y permite pagar el coste generico con cualquier reserva', () => {
    const sources = createEmptyManaSources();
    sources.naturaleza.total = 1;
    sources.orden.total = 2;
    const player = {
      ...initializeGame([], [], getCommanderForFaction('NATURALEZA'), getCommanderForFaction('ORDEN'), 'payment').player,
      manaSources: sources,
    };
    const card: Card = {
      ...CARDS_DB['fauno-bosque'],
      cost: { generic: 2, naturaleza: 1 },
    };

    expect(canAfford(player, card)).toBe(true);
    const wrongSources = createEmptyManaSources();
    wrongSources.orden.total = 3;
    expect(canAfford({ ...player, manaSources: wrongSources }, card)).toBe(false);
  });

  it('recupera partidas antiguas que solo almacenaban Furia y Arcano', () => {
    const state = initializeGame([], [], getCommanderForFaction('FURIA'), getCommanderForFaction('ARCANO'), 'legacy');
    const legacySources = {
      furia: { total: 2, spent: 1 },
      arcano: { total: 1, spent: 0 },
    } as unknown as ManaSources;
    const recovered = normalizeGameStateResources({
      ...state,
      player: { ...state.player, manaSources: legacySources },
    });

    expect(recovered.player.manaSources.furia).toEqual({ total: 2, spent: 1 });
    expect(recovered.player.manaSources.naturaleza).toEqual({ total: 0, spent: 0 });
    expect(recovered.player.manaSources.vacio).toEqual({ total: 0, spent: 0 });
  });
});
