export interface ObstacleDefinition {
  name: string;
  description: string;
  terrainLabel: string;
  tacticalEffect: string;
  destructionReward?: string;
}

const OBSTACLE_DEFINITIONS: Record<string, ObstacleDefinition> = {
  'obstaculo-risco': {
    name: 'Risco quebrado',
    description: 'Bloquea el paso y protege del fuego a distancia a las unidades adyacentes.',
    terrainLabel: 'Roca destructible',
    tacticalEffect: 'Cobertura: reduce en 1 el dano de ataques a distancia contra unidades adyacentes.',
  },
  'obstaculo-pilar': {
    name: 'Pilar de cristal',
    description: 'Un foco arcano que bloquea la casilla hasta colapsar.',
    terrainLabel: 'Cristal destructible',
    tacticalEffect: 'Bloquea movimiento y linea de vision.',
    destructionReward: 'Al destruirlo, roba 1 carta.',
  },
  'obstaculo-corriente': {
    name: 'Corriente arcana',
    description: 'Una fractura energetica que corta la ruta y ralentiza las posiciones cercanas.',
    terrainLabel: 'Corriente destructible',
    tacticalEffect: 'Las unidades adyacentes pierden 1 de movimiento, hasta un minimo de 0.',
    destructionReward: 'Al disiparla, recupera 1 punto de mana gastado.',
  },
  'obstaculo-lava': {
    name: 'Sello de brasa',
    description: 'Un sello ardiente que impide el paso hasta destruirlo.',
    terrainLabel: 'Sello destructible',
    tacticalEffect: 'Bloquea movimiento y linea de vision.',
  },
};

export function isObstacleCardId(cardId: string): boolean {
  return cardId.startsWith('obstaculo-');
}

export function getObstacleDefinition(cardId: string): ObstacleDefinition {
  return OBSTACLE_DEFINITIONS[cardId] ?? {
    name: 'Obstaculo del santuario',
    description: 'Bloquea la casilla hasta que sea destruido.',
    terrainLabel: 'Terreno destructible',
    tacticalEffect: 'Bloquea movimiento y linea de vision.',
  };
}
