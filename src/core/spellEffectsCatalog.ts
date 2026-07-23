export interface DirectDamageSpellDefinition {
  kind: 'direct-damage';
  damage: number;
  canTargetObstacles: boolean;
  drawCards?: number;
  discardRandomCards?: number;
}

export type FreezeTargetMode = 'single-entity' | 'column';
export type FreezeTargetController = 'any' | 'enemy';

export interface FreezeSpellDefinition {
  kind: 'freeze';
  duration: number;
  targetMode: FreezeTargetMode;
  targetController: FreezeTargetController;
  excludesObstacles: boolean;
  requiresAdjacentCommander?: boolean;
  respectsSpellImmunity?: boolean;
  drawCards?: number;
}

export interface FriendlyBuffSpellDefinition {
  kind: 'friendly-buff';
  attackBonus: number;
  resetMovement: boolean;
  resetAttack: boolean;
}

export interface BounceSpellDefinition {
  kind: 'bounce';
  excludesCommanders: boolean;
  destination: 'owner-hand';
  maximumHandSize: number;
}

export interface GlobalDamageSpellDefinition {
  kind: 'global-damage';
  damage: number;
  excludesCommanders: boolean;
  includesObstacles: boolean;
}

export const DIRECT_DAMAGE_SPELLS = {
  'lluvia-ceniza': {
    kind: 'direct-damage',
    damage: 3,
    canTargetObstacles: true,
  },
  'chispa-fugaz': {
    kind: 'direct-damage',
    damage: 2,
    canTargetObstacles: true,
    discardRandomCards: 1,
  },
  'cometa-arcano': {
    kind: 'direct-damage',
    damage: 4,
    canTargetObstacles: true,
    drawCards: 1,
  },
  'espora-venenosa': {
    kind: 'direct-damage',
    damage: 2,
    canTargetObstacles: false,
  },
  'juicio-divino': {
    kind: 'direct-damage',
    damage: 3,
    canTargetObstacles: false,
  },
  'pesadilla-mortal': {
    kind: 'direct-damage',
    damage: 3,
    canTargetObstacles: false,
  },
} as const satisfies Record<string, DirectDamageSpellDefinition>;

export type DirectDamageSpellId = keyof typeof DIRECT_DAMAGE_SPELLS;
export const DIRECT_DAMAGE_SPELL_IDS = Object.keys(DIRECT_DAMAGE_SPELLS) as DirectDamageSpellId[];

export const FREEZE_SPELLS = {
  'prision-glacial': {
    kind: 'freeze',
    duration: 2,
    targetMode: 'single-entity',
    targetController: 'any',
    excludesObstacles: true,
  },
  'destello-runico': {
    kind: 'freeze',
    duration: 1,
    targetMode: 'single-entity',
    targetController: 'any',
    excludesObstacles: true,
    requiresAdjacentCommander: true,
    drawCards: 1,
  },
  'congelacion-rapida': {
    kind: 'freeze',
    duration: 1,
    targetMode: 'single-entity',
    targetController: 'enemy',
    excludesObstacles: true,
    drawCards: 1,
  },
  'tormenta-mana': {
    kind: 'freeze',
    duration: 1,
    targetMode: 'column',
    targetController: 'enemy',
    excludesObstacles: true,
    respectsSpellImmunity: true,
  },
} as const satisfies Record<string, FreezeSpellDefinition>;

export type FreezeSpellId = keyof typeof FREEZE_SPELLS;
export const FREEZE_SPELL_IDS = Object.keys(FREEZE_SPELLS) as FreezeSpellId[];

export const FRIENDLY_BUFF_SPELLS = {
  'impetu-fuego': {
    kind: 'friendly-buff',
    attackBonus: 2,
    resetMovement: true,
    resetAttack: false,
  },
  'furia-nexo': {
    kind: 'friendly-buff',
    attackBonus: 3,
    resetMovement: true,
    resetAttack: true,
  },
} as const satisfies Record<string, FriendlyBuffSpellDefinition>;

export type FriendlyBuffSpellId = keyof typeof FRIENDLY_BUFF_SPELLS;
export const FRIENDLY_BUFF_SPELL_IDS = Object.keys(
  FRIENDLY_BUFF_SPELLS,
) as FriendlyBuffSpellId[];

export const BOUNCE_SPELLS = {
  'vortice-mana': {
    kind: 'bounce',
    excludesCommanders: true,
    destination: 'owner-hand',
    maximumHandSize: 10,
  },
} as const satisfies Record<string, BounceSpellDefinition>;

export type BounceSpellId = keyof typeof BOUNCE_SPELLS;
export const BOUNCE_SPELL_IDS = Object.keys(BOUNCE_SPELLS) as BounceSpellId[];

export const GLOBAL_DAMAGE_SPELLS = {
  'erupcion-volcanica': {
    kind: 'global-damage',
    damage: 2,
    excludesCommanders: true,
    includesObstacles: true,
  },
} as const satisfies Record<string, GlobalDamageSpellDefinition>;

export type GlobalDamageSpellId = keyof typeof GLOBAL_DAMAGE_SPELLS;
export const GLOBAL_DAMAGE_SPELL_IDS = Object.keys(
  GLOBAL_DAMAGE_SPELLS,
) as GlobalDamageSpellId[];

export function getDirectDamageSpellDefinition(
  cardId: string,
): DirectDamageSpellDefinition | undefined {
  return cardId in DIRECT_DAMAGE_SPELLS
    ? DIRECT_DAMAGE_SPELLS[cardId as DirectDamageSpellId]
    : undefined;
}

export function getFreezeSpellDefinition(cardId: string): FreezeSpellDefinition | undefined {
  return cardId in FREEZE_SPELLS
    ? FREEZE_SPELLS[cardId as FreezeSpellId]
    : undefined;
}

export function getFriendlyBuffSpellDefinition(
  cardId: string,
): FriendlyBuffSpellDefinition | undefined {
  return cardId in FRIENDLY_BUFF_SPELLS
    ? FRIENDLY_BUFF_SPELLS[cardId as FriendlyBuffSpellId]
    : undefined;
}

export function getBounceSpellDefinition(cardId: string): BounceSpellDefinition | undefined {
  return cardId in BOUNCE_SPELLS
    ? BOUNCE_SPELLS[cardId as BounceSpellId]
    : undefined;
}

export function getGlobalDamageSpellDefinition(
  cardId: string,
): GlobalDamageSpellDefinition | undefined {
  return cardId in GLOBAL_DAMAGE_SPELLS
    ? GLOBAL_DAMAGE_SPELLS[cardId as GlobalDamageSpellId]
    : undefined;
}
