export type DeckTone = 'furia' | 'arcano' | 'naturaleza' | 'orden' | 'sombra' | 'vacio';

export type DeckFaction = 'Furia' | 'Arcano' | 'Naturaleza' | 'Orden' | 'Sombra' | 'Vacio';

export type DeckId =
  | 'FURIA_EMBESTIDA'
  | 'FURIA_CALDERA'
  | 'ARCANO_GLACIAL'
  | 'ARCANO_ESTELAR'
  | 'NATURALEZA_RAICES'
  | 'NATURALEZA_GUARDIANES'
  | 'ORDEN_ALBA'
  | 'ORDEN_BASTION'
  | 'SOMBRA_CRIPTA'
  | 'SOMBRA_NOBLEZA'
  | 'VACIO_ABISMO'
  | 'VACIO_ENTROPIA';

export interface DeckDefinition {
  id: DeckId;
  name: string;
  faction: DeckFaction;
  commanderFaction: 'FURIA' | 'ARCANO';
  archetype: string;
  description: string;
  tone: DeckTone;
  mark: string;
}

export const DECK_CATALOG: readonly DeckDefinition[] = [
  {
    id: 'FURIA_EMBESTIDA',
    name: 'Embestida de Brasas',
    faction: 'Furia',
    commanderFaction: 'FURIA',
    archetype: 'Agresivo',
    description: 'Presion temprana con cargas, orcos y dano directo para cerrar la partida rapido.',
    tone: 'furia',
    mark: 'F1',
  },
  {
    id: 'FURIA_CALDERA',
    name: 'Caldera Colosal',
    faction: 'Furia',
    commanderFaction: 'FURIA',
    archetype: 'Colosos',
    description: 'Aguanta el inicio y remata con gigantes, dragones y erupciones de alto impacto.',
    tone: 'furia',
    mark: 'F2',
  },
  {
    id: 'ARCANO_GLACIAL',
    name: 'Dominio Glacial',
    faction: 'Arcano',
    commanderFaction: 'ARCANO',
    archetype: 'Control',
    description: 'Congela amenazas, protege el tablero y gana tiempo hasta dominar el santuario.',
    tone: 'arcano',
    mark: 'A1',
  },
  {
    id: 'ARCANO_ESTELAR',
    name: 'Nexus Estelar',
    faction: 'Arcano',
    commanderFaction: 'ARCANO',
    archetype: 'Hechizos',
    description: 'Robo de cartas, estructuras arcanas y hechizos cosmicos con gran alcance.',
    tone: 'arcano',
    mark: 'A2',
  },
  {
    id: 'NATURALEZA_RAICES',
    name: 'Raices Salvajes',
    faction: 'Naturaleza',
    commanderFaction: 'FURIA',
    archetype: 'Bestias',
    description: 'Centauros, faunos y bestias flexibles que se mueven bien por el tablero.',
    tone: 'naturaleza',
    mark: 'N1',
  },
  {
    id: 'NATURALEZA_GUARDIANES',
    name: 'Guardianes del Bosque',
    faction: 'Naturaleza',
    commanderFaction: 'FURIA',
    archetype: 'Crecimiento',
    description: 'Totems, curacion y criaturas resistentes para ganar por presencia estable.',
    tone: 'naturaleza',
    mark: 'N2',
  },
  {
    id: 'ORDEN_ALBA',
    name: 'Legion del Alba',
    faction: 'Orden',
    commanderFaction: 'ARCANO',
    archetype: 'Aereo',
    description: 'Grifos, pegasos y luz sagrada para jugar limpio, movil y contundente.',
    tone: 'orden',
    mark: 'O1',
  },
  {
    id: 'ORDEN_BASTION',
    name: 'Bastion Dorado',
    faction: 'Orden',
    commanderFaction: 'ARCANO',
    archetype: 'Defensa',
    description: 'Clerigos, guardianes y estructuras que protegen hasta imponer ventaja.',
    tone: 'orden',
    mark: 'O2',
  },
  {
    id: 'SOMBRA_CRIPTA',
    name: 'Cripta Maldita',
    faction: 'Sombra',
    commanderFaction: 'ARCANO',
    archetype: 'Desgaste',
    description: 'No-muertos, espectros y estructuras oscuras para desgastar al rival.',
    tone: 'sombra',
    mark: 'S1',
  },
  {
    id: 'SOMBRA_NOBLEZA',
    name: 'Pacto de Sangre',
    faction: 'Sombra',
    commanderFaction: 'ARCANO',
    archetype: 'Ataque',
    description: 'Vampiros, demonios y pesadillas para presionar con amenazas duras.',
    tone: 'sombra',
    mark: 'S2',
  },
  {
    id: 'VACIO_ABISMO',
    name: 'Abismo Astral',
    faction: 'Vacio',
    commanderFaction: 'ARCANO',
    archetype: 'Cosmico',
    description: 'Horrores del Vacio apoyados por magia estelar y control arcano.',
    tone: 'vacio',
    mark: 'V1',
  },
  {
    id: 'VACIO_ENTROPIA',
    name: 'Entropia Silenciosa',
    faction: 'Vacio',
    commanderFaction: 'ARCANO',
    archetype: 'Late game',
    description: 'Plan lento y poderoso con leviatanes, devoradores y aniquilacion.',
    tone: 'vacio',
    mark: 'V2',
  },
];

export function getDeckDefinition(deckId: DeckId): DeckDefinition {
  const definition = DECK_CATALOG.find((deck) => deck.id === deckId);
  if (!definition) throw new Error(`No existe el mazo ${deckId}.`);
  return definition;
}
