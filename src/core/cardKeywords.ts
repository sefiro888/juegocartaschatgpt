export type CardKeywordId =
  | 'charge'
  | 'flying'
  | 'resistance'
  | 'freeze'
  | 'battlecry'
  | 'last-breath'
  | 'obstruction'
  | 'diagonal'
  | 'spell-immunity'
  | 'cover';

export interface CardKeywordDefinition {
  id: CardKeywordId;
  label: string;
  description: string;
  patterns: string[];
}

export const CARD_KEYWORDS: CardKeywordDefinition[] = [
  {
    id: 'charge',
    label: 'Carga',
    description: 'Puede moverse y atacar durante el turno en que entra en juego.',
    patterns: ['carga'],
  },
  {
    id: 'flying',
    label: 'Vuelo',
    description: 'Puede saltar obstáculos al calcular su ruta de movimiento.',
    patterns: ['vuelo'],
  },
  {
    id: 'resistance',
    label: 'Resistencia',
    description: 'Reduce en 1 el daño recibido, según indique la carta.',
    patterns: ['resistencia'],
  },
  {
    id: 'freeze',
    label: 'Congelar',
    description: 'La unidad afectada no puede moverse ni atacar mientras esté congelada.',
    patterns: ['congela', 'congelación', 'congelacion'],
  },
  {
    id: 'battlecry',
    label: 'Grito de batalla',
    description: 'El efecto se activa inmediatamente al entrar en juego.',
    patterns: ['grito de batalla'],
  },
  {
    id: 'last-breath',
    label: 'Último aliento',
    description: 'El efecto se activa cuando esta carta muere.',
    patterns: ['último aliento', 'ultimo aliento', 'ãšltimo aliento'],
  },
  {
    id: 'obstruction',
    label: 'Obstrucción',
    description: 'No puede moverse ni atacar y bloquea el paso por su casilla.',
    patterns: ['obstrucción', 'obstruccion'],
  },
  {
    id: 'diagonal',
    label: 'Diagonal',
    description: 'Puede desplazarse y atacar también en dirección diagonal.',
    patterns: ['movimiento diagonal'],
  },
  {
    id: 'spell-immunity',
    label: 'Inmune',
    description: 'No puede ser objetivo de hechizos de ningún jugador.',
    patterns: ['inmune a hechizos'],
  },
  {
    id: 'cover',
    label: 'Cobertura',
    description: 'Reduce en 1 el daño de ataques a distancia contra unidades protegidas.',
    patterns: ['cobertura'],
  },
];

export function getCardKeywords(rulesText: string): CardKeywordDefinition[] {
  const normalized = rulesText.toLocaleLowerCase('es');
  return CARD_KEYWORDS.filter((keyword) =>
    keyword.patterns.some((pattern) => normalized.includes(pattern)),
  );
}
