import { z } from 'zod';

export const FactionSchema = z.enum(['FURIA', 'ARCANO', 'NATURALEZA', 'ORDEN', 'SOMBRA', 'VACIO']);
export type Faction = z.infer<typeof FactionSchema>;

export const ManaTypeSchema = z.enum(['furia', 'arcano', 'naturaleza', 'orden', 'sombra', 'vacio']);
export type ManaType = z.infer<typeof ManaTypeSchema>;

export const CardTypeSchema = z.enum(['MANA', 'UNIDAD', 'ESTRUCTURA', 'HECHIZO', 'COMANDANTE']);
export type CardType = z.infer<typeof CardTypeSchema>;

export const RaritySchema = z.enum(['COMUN', 'RARA', 'EPICA', 'LEGENDARIA']);
export type Rarity = z.infer<typeof RaritySchema>;

export const CardCostSchema = z.object({
  generic: z.number().min(0),
  furia: z.number().min(0).optional(),
  arcano: z.number().min(0).optional(),
  naturaleza: z.number().min(0).optional(),
  orden: z.number().min(0).optional(),
  sombra: z.number().min(0).optional(),
  vacio: z.number().min(0).optional(),
});
export type CardCost = z.infer<typeof CardCostSchema>;

export const CardSchema = z.object({
  id: z.string(),
  name: z.string(),
  faction: FactionSchema,
  type: CardTypeSchema,
  subtype: z.string().optional(),
  cost: CardCostSchema,
  rarity: RaritySchema,
  rulesText: z.string(),
  flavorText: z.string(),
  attack: z.number().min(0).optional(),
  maxHealth: z.number().min(1).optional(),
  health: z.number().optional(),
  cardNumber: z.number().min(0).max(400),
  artPath: z.string(),
  range: z.number().min(1).optional(),
  movement: z.number().min(0).optional(),
  artist: z.string().optional(),
  artistStyle: z.string().optional(),
});
export type Card = z.infer<typeof CardSchema>;

export const PositionSchema = z.object({
  x: z.number().min(0).max(9),
  y: z.number().min(0).max(9),
});
export type Position = z.infer<typeof PositionSchema>;

export const BoardEntitySchema = z.object({
  id: z.string(),
  cardId: z.string(),
  controller: z.enum(['PLAYER', 'OPPONENT']),
  position: PositionSchema,
  health: z.number(),
  maxHealth: z.number(),
  attack: z.number(),
  hasMovedThisTurn: z.boolean(),
  hasAttackedThisTurn: z.boolean(),
  frozenTurns: z.number(),
});
export type BoardEntity = z.infer<typeof BoardEntitySchema>;

export const ManaPoolSchema = z.object({
  total: z.number().min(0),
  spent: z.number().min(0),
});

export const ManaSourcesSchema = z.object({
  furia: ManaPoolSchema,
  arcano: ManaPoolSchema,
  naturaleza: ManaPoolSchema,
  orden: ManaPoolSchema,
  sombra: ManaPoolSchema,
  vacio: ManaPoolSchema,
});
export type ManaSources = z.infer<typeof ManaSourcesSchema>;

export const PlayerStateSchema = z.object({
  id: z.enum(['PLAYER', 'OPPONENT']),
  nexusHealth: z.number(),
  hand: z.array(CardSchema),
  deck: z.array(CardSchema),
  graveyard: z.array(CardSchema),
  manaSources: ManaSourcesSchema,
  manaPlayedThisTurn: z.boolean(),
  commander: CardSchema,
  commanderInPlay: z.boolean(),
});
export type PlayerState = z.infer<typeof PlayerStateSchema>;

export const GameStateSchema = z.object({
  board: z.record(z.string(), BoardEntitySchema), // Key format: "x,y"
  player: PlayerStateSchema,
  opponent: PlayerStateSchema,
  turn: z.number(),
  activePlayer: z.enum(['PLAYER', 'OPPONENT']),
  phase: z.enum(['START', 'MAIN', 'END']),
  winner: z.enum(['PLAYER', 'OPPONENT']).nullable(),
  seed: z.string(),
});
export type GameState = z.infer<typeof GameStateSchema>;

export const DeckSchema = z.object({
  cards: z.array(CardSchema).length(50),
});
