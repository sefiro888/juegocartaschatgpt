import{_ as e,b as t,n}from"./index-BK_reZ3u.js";var r=t(e(),1),i=/^(?:data:|blob:|https?:\/\/)/i;function a(e,t=`/juegocartaschatgpt/`){return i.test(e)?e:`${t.endsWith(`/`)?t:`${t}/`}${e.replace(/^\/+/,``)}`}function o(e,t=`/juegocartaschatgpt/`){let n=[];if(e.artPath&&n.push(e.artPath),n.push(`/assets/cards/art/${e.id}.webp`,`/assets/cards/art/${e.id}.png`,`/assets/cards/art/${e.id}.svg`),e.artPath&&!e.artPath.startsWith(`data:`)){let t=e.artPath.replace(/\.(png|webp|jpg|jpeg)$/i,`.svg`);t!==e.artPath&&n.push(t)}let r=n.map(e=>a(e,t));return[...new Set(r)]}var s=n(),c=({card:e,mode:t=`gallery`,isSelected:n=!1,isPlayable:i=!1,onClick:a})=>{let c=(0,r.useMemo)(()=>o(e),[e]),[l,u]=(0,r.useState)(0),d=c[Math.min(l,c.length-1)];(0,r.useEffect)(()=>{u(0)},[c]);let f=()=>{u(e=>Math.min(e+1,c.length-1))},p=e=>{switch(e){case`RARA`:return`var(--rarity-rara)`;case`EPICA`:return`var(--rarity-epica)`;case`LEGENDARIA`:return`var(--rarity-legendaria)`;default:return`var(--rarity-comun)`}},m=e.type===`MANA`,h=e.faction===`FURIA`?`furia-card`:`arcano-card`,g=t===`gallery`||t===`inspected`,_=t===`board`,v=e.rarity===`LEGENDARIA`,y=e.rarity===`EPICA`,b=(e.type===`UNIDAD`||e.type===`COMANDANTE`||e.type===`ESTRUCTURA`)&&t!==`thumbnail`&&t!==`board`;return(0,s.jsxs)(`div`,{onClick:a,className:[`card-container`,h,`mode-${t}`,n?`selected`:``,i?`playable`:``,v?`rarity-legendaria`:``,y?`rarity-epica`:``].filter(Boolean).join(` `),style:{borderColor:p(e.rarity),cursor:a?`pointer`:`default`},children:[(0,s.jsx)(`div`,{className:`card-border-inlay`}),v&&(0,s.jsx)(`div`,{className:`holo-shimmer-overlay`}),!m&&t!==`thumbnail`&&t!==`board`&&(0,s.jsxs)(`div`,{className:`card-cost-badge`,children:[e.cost.generic>0&&(0,s.jsx)(`span`,{className:`generic-cost`,children:e.cost.generic}),e.faction===`FURIA`&&e.cost.furia?(0,s.jsxs)(`span`,{className:`faction-cost furia-icon`,children:[`🔥`,e.cost.furia]}):e.faction===`ARCANO`&&e.cost.arcano?(0,s.jsxs)(`span`,{className:`faction-cost arcano-icon`,children:[`❄️`,e.cost.arcano]}):null]}),t!==`board`&&(0,s.jsxs)(`div`,{className:`card-header`,children:[(0,s.jsx)(`div`,{className:`card-title`,children:e.name}),t!==`thumbnail`&&(0,s.jsx)(`div`,{className:`card-type-label`,children:e.subtype||e.type})]}),t!==`thumbnail`&&(0,s.jsx)(`div`,{className:`card-illustration-container`,children:(0,s.jsx)(`img`,{src:d,alt:e.name,onError:f,className:`card-illustration`,draggable:!1})}),!_&&t!==`thumbnail`&&(0,s.jsxs)(`div`,{className:[`card-body`,b?`has-stats`:``].filter(Boolean).join(` `),children:[(0,s.jsx)(`div`,{className:`card-watermark ${e.faction===`FURIA`?`furia-watermark`:`arcano-watermark`}`,children:e.faction===`FURIA`?`🔥`:`❄️`}),(0,s.jsx)(`div`,{className:`card-rules`,children:e.rulesText}),g&&(e.range!==void 0||e.movement!==void 0)&&(0,s.jsxs)(`div`,{className:`card-attributes-row`,children:[e.range!==void 0&&(0,s.jsxs)(`span`,{className:`attr-pill`,children:[`🎯 Rango: `,e.range]}),e.movement!==void 0&&(0,s.jsxs)(`span`,{className:`attr-pill`,children:[`👣 Mov: `,e.movement]})]}),g&&(0,s.jsxs)(`div`,{className:`card-flavor`,children:[`"`,e.flavorText,`"`]}),g&&e.artist&&(0,s.jsxs)(`div`,{className:`card-artist-line`,children:[(0,s.jsxs)(`span`,{children:[`🎨 `,e.artist]}),(0,s.jsx)(`span`,{className:`artist-style-tag`,children:e.artistStyle})]})]}),(e.type===`UNIDAD`||e.type===`COMANDANTE`||e.type===`ESTRUCTURA`)&&t!==`thumbnail`&&(0,s.jsxs)(`div`,{className:`card-stats`,children:[e.attack!==void 0&&(0,s.jsxs)(`div`,{className:`stat-badge stat-attack-badge`,children:[(0,s.jsx)(`span`,{className:`badge-ring`}),(0,s.jsx)(`span`,{className:`stat-val`,children:e.attack})]}),e.maxHealth!==void 0&&(0,s.jsxs)(`div`,{className:`stat-badge stat-health-badge`,children:[(0,s.jsx)(`span`,{className:`badge-ring`}),(0,s.jsx)(`span`,{className:`stat-val`,children:t===`board`&&e.health!==void 0?e.health:e.maxHealth})]})]}),_&&(0,s.jsxs)(`div`,{className:`card-board-content`,children:[(0,s.jsx)(`div`,{className:`board-card-name`,children:e.name}),(0,s.jsx)(`div`,{className:`board-card-type`,children:e.subtype||e.type})]}),g&&(0,s.jsxs)(`div`,{className:`card-footer-number`,children:[`#`,e.cardNumber,`/400 • `,e.rarity]}),(0,s.jsx)(`style`,{children:`
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

        .selected {
          transform: translateY(-8px) scale(1.03) !important;
          box-shadow: 0 0 25px var(--rarity-legendaria) !important;
          border-color: var(--rarity-legendaria) !important;
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
          gap: 3px;
          z-index: 20;
          background: radial-gradient(circle at 35% 35%, #2a2e3d, #12141a);
          padding: 4px 9px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 800;
          font-family: var(--font-display);
          box-shadow: 0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .generic-cost {
          color: #fff;
        }

        .faction-cost {
          display: flex;
          align-items: center;
        }

        /* Card Header - Metallic Nameplate */
        .card-header {
          padding: 7px 12px;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          padding-bottom: 28px; /* Safe space to prevent overlapping statistics circles! */
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
          bottom: 3px;
          left: 3px;
          right: 3px;
          display: flex;
          justify-content: space-between;
          z-index: 20;
          pointer-events: none;
        }

        .stat-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.92rem;
          font-weight: 900;
          font-family: var(--font-display);
          border: 2px solid;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.7);
        }

        .badge-ring {
          position: absolute;
          inset: 1px;
          border: 1px dashed rgba(255,255,255,0.25);
          border-radius: 50%;
          pointer-events: none;
        }

        .stat-val {
          z-index: 1;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        .stat-attack-badge {
          background: radial-gradient(circle at 35% 30%, #991b1b, #450a0a);
          color: #fecaca;
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.35), 0 4px 10px rgba(0,0,0,0.7);
        }

        .stat-health-badge {
          background: radial-gradient(circle at 35% 30%, #065f46, #022c22);
          color: #a7f3d0;
          border-color: #10b981;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.35), 0 4px 10px rgba(0,0,0,0.7);
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
          border: none;
          padding: 0;
          flex: 1;
          margin: 0;
        }
        
        .mode-thumbnail .card-title {
          font-size: 0.75rem;
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
          font-size: 0.8rem;
          flex: 1;
        }
        .mode-deck-preview .card-cost-badge {
          position: static;
          background: none;
          padding: 0;
          box-shadow: none;
          border: none;
        }
        .mode-deck-preview .card-border-inlay {
          display: none;
        }
      `})]})};export{a as n,c as t};