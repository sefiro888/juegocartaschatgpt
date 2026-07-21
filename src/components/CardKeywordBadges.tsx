import React from 'react';
import {
  Ban,
  Bird,
  Footprints,
  Mountain,
  Shield,
  Skull,
  Snowflake,
  Sparkles,
  Swords,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { getCardKeywords, type CardKeywordId } from '../core/cardKeywords';

const KEYWORD_ICONS: Record<CardKeywordId, LucideIcon> = {
  charge: Zap,
  flying: Bird,
  resistance: Shield,
  freeze: Snowflake,
  battlecry: Swords,
  'last-breath': Skull,
  obstruction: Ban,
  diagonal: Footprints,
  'spell-immunity': Sparkles,
  cover: Mountain,
};

interface CardKeywordBadgesProps {
  rulesText: string;
  compact?: boolean;
}

export const CardKeywordBadges: React.FC<CardKeywordBadgesProps> = ({ rulesText, compact = false }) => {
  const keywords = getCardKeywords(rulesText);
  if (keywords.length === 0) return null;

  return (
    <div className={`keyword-badges ${compact ? 'keyword-badges-compact' : ''}`} aria-label="Palabras clave">
      {keywords.map((keyword) => {
        const Icon = KEYWORD_ICONS[keyword.id];
        return (
          <span
            key={keyword.id}
            className="keyword-badge"
            tabIndex={0}
            title={`${keyword.label}: ${keyword.description}`}
            aria-label={`${keyword.label}: ${keyword.description}`}
          >
            <Icon size={compact ? 11 : 12} strokeWidth={2.2} aria-hidden="true" />
            {!compact && <span>{keyword.label}</span>}
          </span>
        );
      })}
      <style>{`
        .keyword-badges {
          position: relative;
          z-index: 4;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 5px;
        }
        .keyword-badge {
          display: inline-flex;
          min-width: 0;
          min-height: 20px;
          align-items: center;
          gap: 4px;
          padding: 2px 6px;
          border: 1px solid rgba(157, 218, 242, 0.28);
          border-radius: 5px;
          color: #d9f5ff;
          background: rgba(21, 47, 61, 0.72);
          font-size: 0.57rem;
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
          cursor: help;
        }
        .keyword-badge:focus-visible {
          outline: 1px solid #83dcff;
          outline-offset: 1px;
        }
        .keyword-badges-compact {
          gap: 3px;
          margin-bottom: 3px;
        }
        .keyword-badges-compact .keyword-badge {
          width: 19px;
          min-height: 18px;
          padding: 0;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
