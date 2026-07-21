import React, { useEffect, useMemo, useState } from 'react';
import { Check, Gem, LockKeyhole, Shield, Sword } from 'lucide-react';
import type { Card } from '../types/card';
import { getCardArtCandidates } from '../core/publicAssets';
import { getFactionVisual } from '../core/factionVisuals';
import { getCardFactionCosts, manaTypeToFaction } from '../core/factionRules';
import { CardKeywordBadges } from './CardKeywordBadges';

interface CardDOMProps {
  card: Card;
  mode?: 'thumbnail' | 'hand' | 'board' | 'gallery' | 'inspected' | 'deck-preview';
  isSelected?: boolean;
  isPlayable?: boolean;
  availability?: 'neutral' | 'ready' | 'blocked' | 'waiting';
  availabilityLabel?: string;
  onClick?: () => void;
}

export const CardDOM: React.FC<CardDOMProps> = ({
  card,
  mode = 'gallery',
  isSelected = false,
  isPlayable = false,
  availability = 'neutral',
  availabilityLabel,
  onClick,
}) => {
  const artCandidates = useMemo(
    () => getCardArtCandidates(card),
    [card],
  );
  const [artCandidateIndex, setArtCandidateIndex] = useState(0);
  const imgSrc = artCandidates[Math.min(artCandidateIndex, artCandidates.length - 1)];

  useEffect(() => {
    setArtCandidateIndex(0);
  }, [artCandidates]);

  const handleImageError = () => {
    setArtCandidateIndex((current) => Math.min(current + 1, artCandidates.length - 1));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'RARA': return 'var(--rarity-rara)';
      case 'EPICA': return 'var(--rarity-epica)';
      case 'LEGENDARIA': return 'var(--rarity-legendaria)';
      default: return 'var(--rarity-comun)';
    }
  };

  const isMana = card.type === 'MANA';
  const factionVisual = getFactionVisual(card.faction);
  const factionClass = `${factionVisual.className}-card`;
  const isLarge = mode === 'gallery' || mode === 'inspected';
  const isBoard = mode === 'board';
  const isLegendaria = card.rarity === 'LEGENDARIA';
  const isEpica = card.rarity === 'EPICA';
  const hasStats = (card.type === 'UNIDAD' || card.type === 'COMANDANTE' || card.type === 'ESTRUCTURA') && mode !== 'thumbnail' && mode !== 'board';
  const factionCosts = getCardFactionCosts(card);

  return (
    <div
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Ver detalles de ${card.name}` : undefined}
      className={[
        'card-container',
        factionClass,
        `mode-${mode}`,
        isSelected ? 'selected' : '',
        isPlayable ? 'playable' : '',
        availability !== 'neutral' ? `availability-${availability}` : '',
        isLegendaria ? 'rarity-legendaria' : '',
        isEpica ? 'rarity-epica' : '',
      ].filter(Boolean).join(' ')}
      style={{
        borderColor: getRarityColor(card.rarity),
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* MAGICAL BORDER INLAY */}
      <div className="card-border-inlay" />

      {/* HOLOGRAPHIC SHIMMER OVERLAY for LEGENDARIA */}
      {isLegendaria && <div className="holo-shimmer-overlay" />}

      {/* COST CONTAINER (only for non-mana cards) */}
      {!isMana && mode !== 'thumbnail' && mode !== 'board' && (
        <div
          className="card-cost-badge"
          aria-label="Coste de maná"
          style={{
            '--mana-accent': factionVisual.accent,
            '--mana-soft': factionVisual.softAccent,
          } as React.CSSProperties}
        >
          {card.cost.generic > 0 && (
            <span className="generic-cost" title="Coste genérico">
              <Gem aria-hidden="true" />
              <strong>{card.cost.generic}</strong>
            </span>
          )}
          {factionCosts.map(({ manaType, amount }) => {
            const visual = getFactionVisual(manaTypeToFaction(manaType));
            return (
              <span
                key={manaType}
                className={`faction-cost ${visual.className}-icon`}
                style={{
                  color: visual.softAccent,
                  '--segment-accent': visual.accent,
                } as React.CSSProperties}
                title={`Mana de ${manaType}`}
              >
                <span className="faction-rune">{visual.icon}</span>
                <strong>{amount}</strong>
              </span>
            );
          })}
        </div>
      )}

      {mode === 'hand' && availability !== 'neutral' && availabilityLabel && (
        <div className={`card-availability ${availability}`} title={availabilityLabel}>
          {availability === 'ready' ? <Check aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
          <span>{availabilityLabel}</span>
        </div>
      )}

      {/* CARD HEADER */}
      {mode !== 'board' && (
        <div className="card-header">
          <div className="card-title">{card.name}</div>
          {mode !== 'thumbnail' && <div className="card-type-label">{card.subtype || card.type}</div>}
        </div>
      )}

      {/* ILLUSTRATION (Framed like a TCG card) */}
      {mode !== 'thumbnail' && (
        <div className="card-illustration-container">
          <img
            src={imgSrc}
            alt={card.name}
            onError={handleImageError}
            className="card-illustration"
            draggable={false}
          />
        </div>
      )}

      {/* CARD BODY (Framed Text Box) */}
      {!isBoard && mode !== 'thumbnail' && (
        <div className={['card-body', hasStats ? 'has-stats' : ''].filter(Boolean).join(' ')}>
          {/* Watermark in background */}
          <div className={`card-watermark ${factionVisual.className + '-watermark'}`}>
            {factionVisual.icon}
          </div>

          <CardKeywordBadges rulesText={card.rulesText} compact={mode === 'hand'} />
          <div className="card-rules">{card.rulesText}</div>
          {isLarge && (card.range !== undefined || card.movement !== undefined) && (
            <div className="card-attributes-row">
              {card.range !== undefined && <span className="attr-pill">🎯 Rango: {card.range}</span>}
              {card.movement !== undefined && <span className="attr-pill">👣 Mov: {card.movement}</span>}
            </div>
          )}
          {isLarge && <div className="card-flavor">"{card.flavorText}"</div>}
          {isLarge && card.artist && (
            <div className="card-artist-line">
              <span>🎨 {card.artist}</span>
              <span className="artist-style-tag">{card.artistStyle}</span>
            </div>
          )}
        </div>
      )}

      {/* STATS (ATTACK / HEALTH) — runic circular medals */}
      {(card.type === 'UNIDAD' || card.type === 'COMANDANTE' || card.type === 'ESTRUCTURA') && mode !== 'thumbnail' && (
        <div className="card-stats">
          {card.attack !== undefined && (
            <div className="stat-badge stat-attack-badge" title={`Ataque: ${card.attack}`}>
              <span className="badge-ring" />
              <Sword className="stat-icon" aria-hidden="true" />
              <span className="stat-val">{card.attack}</span>
              <span className="stat-caption">ATQ</span>
            </div>
          )}
          {card.maxHealth !== undefined && (
            <div className="stat-badge stat-health-badge" title={`Vida: ${mode === 'board' && card.health !== undefined ? card.health : card.maxHealth}`}>
              <span className="badge-ring" />
              <Shield className="stat-icon" aria-hidden="true" />
              <span className="stat-val">{mode === 'board' && card.health !== undefined ? card.health : card.maxHealth}</span>
              <span className="stat-caption">VIDA</span>
            </div>
          )}
        </div>
      )}

      {/* COMPACT BOARD INFO */}
      {isBoard && (
        <div className="card-board-content">
          <div className="board-card-name">{card.name}</div>
          <div className="board-card-type">{card.subtype || card.type}</div>
        </div>
      )}

      {/* CARD COLLECTION NUMBER — updated to /400 */}
      {isLarge && (
        <div className="card-footer-number">
          #{card.cardNumber}/400 • {card.rarity}
        </div>
      )}

      <style>{`
        .card-container {
          position: relative;
          display: flex;
          flex-direction: column;
          border: 2px solid #555;
          border-radius: 12px;
          background: #151821;
          user-select: none;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.35s,
                      border-color 0.35s;
          overflow: hidden;
          width: 100%;
          height: 100%;
          perspective: 800px;
        }

        /* 3D tilt on hover */
        .card-container:hover {
          transform: perspective(600px) rotateY(4deg) rotateX(-3deg) translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8);
        }

        /* Runic card border inlay (inner frame decoration) */
        .card-border-inlay {
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9px;
          pointer-events: none;
          z-index: 10;
        }
        
        .rarity-legendaria .card-border-inlay {
          border-color: rgba(251, 191, 36, 0.35);
          box-shadow: inset 0 0 4px rgba(251, 191, 36, 0.15);
        }
        .rarity-epica .card-border-inlay {
          border-color: rgba(168, 85, 247, 0.35);
          box-shadow: inset 0 0 4px rgba(168, 85, 247, 0.15);
        }
        .rarity-rara .card-border-inlay {
          border-color: rgba(59, 130, 246, 0.3);
        }

        /* Faction backgrounds - magical textures */
        .furia-card {
          background: linear-gradient(135deg, #180909 0%, #0c0404 100%);
          box-shadow: inset 0 0 15px rgba(239, 68, 68, 0.15), 0 8px 20px rgba(0,0,0,0.6);
        }
        
        .arcano-card {
          background: linear-gradient(135deg, #09131e 0%, #03070b 100%);
          box-shadow: inset 0 0 15px rgba(0, 217, 255, 0.15), 0 8px 20px rgba(0,0,0,0.6);
        }

        .naturaleza-card {
          background: linear-gradient(135deg, #0b1d13 0%, #041008 100%);
          box-shadow: inset 0 0 15px rgba(100, 227, 154, 0.14), 0 8px 20px rgba(0,0,0,0.6);
        }

        .orden-card {
          background: linear-gradient(135deg, #211b0d 0%, #0d0c08 100%);
          box-shadow: inset 0 0 15px rgba(232, 196, 108, 0.14), 0 8px 20px rgba(0,0,0,0.6);
        }

        .sombra-card {
          background: linear-gradient(135deg, #170d22 0%, #09050f 100%);
          box-shadow: inset 0 0 15px rgba(185, 156, 255, 0.14), 0 8px 20px rgba(0,0,0,0.6);
        }

        .vacio-card {
          background: linear-gradient(135deg, #150b24 0%, #06030c 100%);
          box-shadow: inset 0 0 15px rgba(213, 160, 255, 0.14), 0 8px 20px rgba(0,0,0,0.6);
        }

        .selected {
          transform: translateY(-8px) scale(1.03) !important;
          box-shadow: 0 0 25px var(--rarity-legendaria) !important;
          border-color: var(--rarity-legendaria) !important;
        }

        .mode-hand.selected {
          transform: none !important;
        }

        .playable {
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.7);
          border-color: var(--color-success) !important;
        }

        /* Pulsing border animations */
        .rarity-epica {
          border: 2.2px solid #a855f7 !important;
          box-shadow: 0 0 16px rgba(168, 85, 247, 0.35), inset 0 0 10px rgba(168, 85, 247, 0.15) !important;
          animation: epic-border-pulse 2.5s ease-in-out infinite;
        }

        .rarity-legendaria {
          border: 2.5px solid #fbbf24 !important;
          box-shadow: 0 0 22px rgba(251, 191, 36, 0.45), inset 0 0 12px rgba(251, 191, 36, 0.2) !important;
        }
        
        .rarity-rara {
          border: 2px solid #3b82f6 !important;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.25), inset 0 0 8px rgba(59, 130, 246, 0.1) !important;
        }

        .rarity-comun {
          border: 2px solid #6b7280 !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        .holo-shimmer-overlay {
          position: absolute;
          inset: 0;
          z-index: 15;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(251, 191, 36, 0.1) 30%,
            rgba(168, 85, 247, 0.12) 40%,
            rgba(59, 130, 246, 0.1) 50%,
            rgba(16, 185, 129, 0.1) 60%,
            rgba(251, 191, 36, 0.08) 70%,
            transparent 80%
          );
          background-size: 200% 100%;
          animation: shimmer 4.5s linear infinite;
          border-radius: 11px;
          mix-blend-mode: screen;
        }

        /* Cost Badge - Runic Stone design */
        .card-cost-badge {
          position: absolute;
          top: 8px;
          right: 10px;
          display: flex;
          gap: 2px;
          z-index: 20;
          min-height: 34px;
          background:
            linear-gradient(145deg, rgba(255,255,255,0.16), transparent 38%),
            radial-gradient(circle at 50% 115%, color-mix(in srgb, var(--mana-accent) 48%, transparent), transparent 64%),
            #10141d;
          padding: 3px;
          border-radius: 11px 11px 14px 14px;
          font-size: 0.8rem;
          font-weight: 800;
          font-family: var(--font-display);
          box-shadow:
            0 5px 10px rgba(0,0,0,0.72),
            0 0 10px color-mix(in srgb, var(--mana-accent) 30%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.2);
          border: 1px solid color-mix(in srgb, var(--mana-accent) 58%, #ffffff 10%);
          max-width: 76px;
          white-space: nowrap;
          overflow: hidden;
        }

        .generic-cost {
          display: flex;
          min-width: 25px;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 2px 4px;
          color: #f7fbff;
          border-radius: 7px 4px 4px 9px;
          background: linear-gradient(145deg, #354052, #171d29);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
        }

        .generic-cost svg {
          width: 10px;
          height: 10px;
          color: #dce9f4;
        }

        .faction-cost {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          min-width: 25px;
          padding: 2px 4px;
          border-radius: 4px 7px 9px 4px;
          background: color-mix(in srgb, var(--segment-accent) 23%, #10141d);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
        }

        .faction-rune {
          display: grid;
          width: 13px;
          height: 13px;
          place-items: center;
          border: 1px solid color-mix(in srgb, var(--segment-accent) 72%, white);
          border-radius: 50%;
          font-size: 0.48rem;
          line-height: 1;
          text-shadow: 0 0 5px currentColor;
        }

        .card-availability {
          position: absolute;
          top: 53px;
          right: 8px;
          z-index: 22;
          display: flex;
          max-width: calc(100% - 16px);
          height: 20px;
          align-items: center;
          gap: 4px;
          padding: 0 6px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 5px;
          color: #eef8fb;
          background: rgba(8,14,20,0.9);
          box-shadow: 0 3px 8px rgba(0,0,0,0.55);
          font: 800 0.48rem/1 var(--font-sans);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          pointer-events: none;
        }

        .card-availability svg {
          width: 10px;
          height: 10px;
          flex: 0 0 auto;
        }

        .card-availability span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .card-availability.ready {
          border-color: rgba(80, 235, 173, 0.5);
          color: #caffea;
          background: rgba(5, 72, 51, 0.92);
          box-shadow: 0 0 10px rgba(46,218,157,0.26), 0 3px 8px rgba(0,0,0,0.55);
        }

        .card-availability.blocked {
          border-color: rgba(255, 112, 91, 0.42);
          color: #ffd6cf;
          background: rgba(83, 22, 19, 0.92);
        }

        .card-availability.waiting {
          color: #b8c6cf;
          background: rgba(25, 33, 42, 0.92);
        }

        .mode-hand.availability-blocked .card-cost-badge {
          filter: saturate(0.58) brightness(0.76);
          border-color: rgba(255, 112, 91, 0.4);
          box-shadow: 0 0 9px rgba(255, 84, 61, 0.22), 0 5px 10px rgba(0,0,0,0.72);
        }

        .mode-hand.availability-ready .card-cost-badge {
          box-shadow: 0 0 13px color-mix(in srgb, var(--mana-accent) 52%, transparent), 0 5px 10px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.22);
        }

        /* Card Header - Metallic Nameplate */
        .card-header {
          min-height: 42px;
          padding: 7px 78px 7px 12px;
          margin: 6px 8px 0 8px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.01) 100%);
          border-bottom: 1.2px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          border-radius: 4px;
          z-index: 5;
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 800;
          display: -webkit-box;
          line-height: 1.08;
          white-space: normal;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.9);
        }

        .card-type-label {
          font-size: 0.62rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 1px;
        }

        /* Card Illustration Window */
        .card-illustration-container {
          position: relative;
          margin: 6px 8px 0 8px;
          height: 48%;
          background: #000;
          overflow: hidden;
          border-radius: 6px;
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.85), 0 3px 6px rgba(0,0,0,0.4);
          z-index: 5;
        }

        .card-illustration {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-container:hover .card-illustration {
          transform: scale(1.06);
        }

        /* Card Body - Obsidian Scroll plate */
        .card-body {
          flex: 1;
          margin: 6px 8px 8px 8px;
          padding: 8px 10px;
          border-radius: 6px;
          background: rgba(8, 10, 15, 0.85);
          border: 1.2px solid rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-size: 0.72rem;
          line-height: 1.25;
          overflow: hidden;
          position: relative;
          z-index: 5;
          gap: 6px;
        }

        .card-body.has-stats {
          padding-bottom: 37px;
        }

        /* Subtle Watermark */
        .card-watermark {
          position: absolute;
          bottom: -15px;
          right: -10px;
          font-size: 4.5rem;
          opacity: 0.035;
          pointer-events: none;
          z-index: 0;
          user-select: none;
          transform: rotate(-15deg);
        }

        .card-rules {
          color: #e2e8f0;
          overflow-y: auto;
          margin-bottom: 2px;
          z-index: 1;
          font-weight: 500;
        }

        .card-flavor {
          font-style: italic;
          color: #a0aec0;
          font-size: 0.65rem;
          opacity: 0.85;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 4px;
          margin-top: auto;
          z-index: 1;
        }

        .card-attributes-row {
          display: flex;
          gap: 6px;
          margin-bottom: 4px;
          z-index: 1;
        }

        .attr-pill {
          font-size: 0.6rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1px 5px;
          border-radius: 4px;
          color: var(--color-text-muted);
        }

        .card-artist-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.35);
          margin-top: 2px;
          border-top: 1px dashed rgba(255, 255, 255, 0.05);
          padding-top: 3px;
          z-index: 1;
        }

        .artist-style-tag {
          font-size: 0.52rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 0 4px;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          color: var(--color-text-muted);
        }

        /* ═══ COMBAT STAT MEDALS (MTG Style Corner overlap) ═══ */
        .card-stats {
          position: absolute;
          bottom: 5px;
          left: 5px;
          right: 5px;
          display: flex;
          justify-content: space-between;
          z-index: 20;
          pointer-events: none;
        }

        .stat-badge {
          width: 44px;
          height: 40px;
          border-radius: 12px 12px 15px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding-bottom: 7px;
          font-size: 1rem;
          font-weight: 900;
          font-family: var(--font-display);
          border: 1.5px solid;
          position: relative;
          box-shadow: 0 5px 12px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .badge-ring {
          position: absolute;
          inset: 2px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 9px 9px 12px 12px;
          pointer-events: none;
        }

        .stat-icon {
          width: 13px;
          height: 13px;
          flex: 0 0 auto;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.75));
        }

        .stat-val {
          z-index: 1;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        .stat-caption {
          position: absolute;
          right: 0;
          bottom: 2px;
          left: 0;
          color: rgba(255,255,255,0.64);
          font: 800 0.4rem/1 var(--font-sans);
          text-align: center;
          letter-spacing: 0.06em;
        }

        .stat-attack-badge {
          background: linear-gradient(145deg, #b52b2b 0%, #651515 48%, #260707 100%);
          color: #fff2ed;
          border-color: #ff6b4a;
          box-shadow: 0 0 12px rgba(255, 74, 50, 0.46), 0 5px 12px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,226,214,0.24);
        }

        .stat-health-badge {
          margin-left: auto;
          background: linear-gradient(145deg, #16865f 0%, #07523e 48%, #02251d 100%);
          color: #eafff6;
          border-color: #42e2aa;
          box-shadow: 0 0 12px rgba(46, 218, 157, 0.42), 0 5px 12px rgba(0,0,0,0.75), inset 0 1px 0 rgba(215,255,239,0.24);
        }

        .card-footer-number {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.52rem;
          color: rgba(255,255,255,0.25);
          z-index: 15;
          pointer-events: none;
          font-weight: 500;
        }

        /* ═══ MODES ═══ */
        .mode-hand {
          width: 140px;
          height: 200px;
          font-size: 0.7rem;
        }
        
        .mode-hand .card-title {
          font-size: 0.8rem;
        }

        .mode-hand .card-header {
          min-height: 40px;
          padding: 7px 72px 6px 10px;
          margin-left: 7px;
          margin-right: 7px;
        }

        .mode-hand .card-cost-badge {
          top: 8px;
          right: 8px;
          max-width: 70px;
          padding: 3px;
          font-size: 0.76rem;
        }

        .mode-hand .stat-badge {
          width: 42px;
          height: 38px;
        }

        .mode-hand .card-rules {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          color: #dce9ef;
          line-height: 1.3;
        }

        .mode-hand:hover {
          transform: none;
        }

        .mode-gallery {
          width: 200px;
          height: 290px;
        }

        .mode-inspected {
          width: 320px;
          height: 460px;
          font-size: 0.85rem;
        }
        
        .mode-inspected .card-title {
          font-size: 1.2rem;
        }
        
        .mode-inspected .card-rules {
          font-size: 0.85rem;
        }
        
        .mode-inspected .card-flavor {
          font-size: 0.78rem;
        }

        .mode-thumbnail {
          width: 120px;
          height: 40px;
          flex-direction: row;
          align-items: center;
          padding: 0 8px;
          border-radius: 6px;
        }
        .mode-thumbnail:hover {
          transform: none;
        }
        
        .mode-thumbnail .card-header {
          min-height: 0;
          border: none;
          padding: 0;
          flex: 1;
          margin: 0;
        }
        
        .mode-thumbnail .card-title {
          display: block;
          font-size: 0.75rem;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .mode-thumbnail .card-border-inlay {
          display: none;
        }

        /* Board representation compact mode */
        .mode-board {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          padding: 6px;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .mode-board:hover {
          transform: none;
        }
        
        .mode-board .card-border-inlay {
          display: none;
        }

        .card-board-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          width: 100%;
        }

        .board-card-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .board-card-type {
          font-size: 0.6rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .mode-deck-preview {
          width: 100%;
          height: 50px;
          flex-direction: row;
          align-items: center;
          padding: 0 10px;
          border-radius: 6px;
          border-width: 1px;
          background: rgba(20, 24, 33, 0.9);
        }
        .mode-deck-preview:hover {
          background: rgba(30, 36, 48, 0.95);
          transform: none;
        }
        .mode-deck-preview .card-title {
          display: block;
          font-size: 0.8rem;
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .mode-deck-preview .card-cost-badge {
          position: static;
          background: none;
          padding: 0;
          box-shadow: none;
          border: none;
        }

        @media (max-width: 700px) {
          .mode-hand .card-header {
            padding-right: 50px;
          }

          .mode-hand .card-title {
            min-height: 28px;
            max-height: 28px;
            font-size: 0.72rem;
          }

          .mode-hand .card-type-label {
            display: none;
          }

          .mode-hand .card-cost-badge {
            min-height: 30px;
            max-width: 48px;
            font-size: 0.68rem;
          }

          .mode-hand .generic-cost,
          .mode-hand .faction-cost {
            min-width: 19px;
            padding-right: 2px;
            padding-left: 2px;
          }

          .mode-hand .generic-cost svg {
            display: none;
          }

          .mode-hand .faction-rune {
            width: 10px;
            height: 10px;
            font-size: 0.4rem;
          }

          .mode-hand .stat-badge {
            width: 36px;
            height: 34px;
            padding-bottom: 0;
          }

          .mode-hand .stat-caption {
            display: none;
          }

          .mode-hand .stat-icon {
            width: 11px;
            height: 11px;
          }

          .mode-hand .card-availability {
            top: 49px;
            right: 7px;
            height: 18px;
            padding: 0 4px;
            font-size: 0.42rem;
          }
        }
        .mode-deck-preview .card-border-inlay {
          display: none;
        }
      `}</style>
    </div>
  );
};
