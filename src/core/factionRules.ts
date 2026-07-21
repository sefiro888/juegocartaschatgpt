import type { Card, Faction, GameState, ManaSources, ManaType } from '../types/card';

export const MANA_TYPES: readonly ManaType[] = [
  'furia',
  'arcano',
  'naturaleza',
  'orden',
  'sombra',
  'vacio',
];

export const MANA_SOURCE_CARD_IDS: Record<ManaType, string> = {
  furia: 'fuente-furia',
  arcano: 'fuente-arcana',
  naturaleza: 'fuente-naturaleza',
  orden: 'fuente-orden',
  sombra: 'fuente-sombra',
  vacio: 'fuente-vacio',
};

export function factionToManaType(faction: Faction): ManaType {
  return faction.toLowerCase() as ManaType;
}

export function manaTypeToFaction(manaType: ManaType): Faction {
  return manaType.toUpperCase() as Faction;
}

export function createEmptyManaSources(): ManaSources {
  return {
    furia: { total: 0, spent: 0 },
    arcano: { total: 0, spent: 0 },
    naturaleza: { total: 0, spent: 0 },
    orden: { total: 0, spent: 0 },
    sombra: { total: 0, spent: 0 },
    vacio: { total: 0, spent: 0 },
  };
}

export function normalizeManaSources(sources?: Partial<ManaSources>): ManaSources {
  const normalized = createEmptyManaSources();
  for (const manaType of MANA_TYPES) {
    const source = sources?.[manaType];
    if (source) normalized[manaType] = { total: source.total ?? 0, spent: source.spent ?? 0 };
  }
  return normalized;
}

export function cloneManaSources(sources: ManaSources): ManaSources {
  return normalizeManaSources(sources);
}

export function getAvailableMana(sources: ManaSources, manaType: ManaType): number {
  return Math.max(0, sources[manaType].total - sources[manaType].spent);
}

export function getCardFactionCosts(card: Card): Array<{ manaType: ManaType; amount: number }> {
  return MANA_TYPES.flatMap((manaType) => {
    const amount = card.cost[manaType] ?? 0;
    return amount > 0 ? [{ manaType, amount }] : [];
  });
}

export function getTotalCardCost(card: Card): number {
  return card.cost.generic + getCardFactionCosts(card).reduce((total, cost) => total + cost.amount, 0);
}

export function normalizeGameStateResources(state: GameState): GameState {
  return {
    ...state,
    player: { ...state.player, manaSources: normalizeManaSources(state.player.manaSources) },
    opponent: { ...state.opponent, manaSources: normalizeManaSources(state.opponent.manaSources) },
  };
}
