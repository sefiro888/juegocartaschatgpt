import type { Faction } from '../types/card';

export interface FactionVisual {
  className: string;
  icon: string;
  accent: string;
  softAccent: string;
  cardGradient: string;
}

export const FACTION_VISUALS: Record<Faction, FactionVisual> = {
  FURIA: {
    className: 'furia',
    icon: 'F',
    accent: '#ff8a65',
    softAccent: '#ffb36b',
    cardGradient: 'linear-gradient(135deg, #180909 0%, #0c0404 100%)',
  },
  ARCANO: {
    className: 'arcano',
    icon: 'A',
    accent: '#8bddff',
    softAccent: '#8bddff',
    cardGradient: 'linear-gradient(135deg, #09131e 0%, #03070b 100%)',
  },
  NATURALEZA: {
    className: 'naturaleza',
    icon: 'N',
    accent: '#64e39a',
    softAccent: '#8df0b6',
    cardGradient: 'linear-gradient(135deg, #0b1d13 0%, #041008 100%)',
  },
  ORDEN: {
    className: 'orden',
    icon: 'O',
    accent: '#e8c46c',
    softAccent: '#f2d991',
    cardGradient: 'linear-gradient(135deg, #211b0d 0%, #0d0c08 100%)',
  },
  SOMBRA: {
    className: 'sombra',
    icon: 'S',
    accent: '#b99cff',
    softAccent: '#cbb7ff',
    cardGradient: 'linear-gradient(135deg, #170d22 0%, #09050f 100%)',
  },
  VACIO: {
    className: 'vacio',
    icon: 'V',
    accent: '#d5a0ff',
    softAccent: '#ddb7ff',
    cardGradient: 'linear-gradient(135deg, #150b24 0%, #06030c 100%)',
  },
};

export function getFactionVisual(faction: Faction): FactionVisual {
  return FACTION_VISUALS[faction] ?? FACTION_VISUALS.FURIA;
}
