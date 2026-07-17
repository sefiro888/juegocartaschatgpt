import{_ as e,b as t,f as n,n as r}from"./index-CjIaINg5.js";import{t as i}from"./loreDb-Bm_kqNLc.js";import{t as a}from"./CardDOM-BCerIYnC.js";var o=t(e(),1),s=r(),c=({onBack:e})=>{let[t,r]=(0,o.useState)(`ALL`),[c,l]=(0,o.useState)(null),u=[{id:`ALL`,name:`Todas`},{id:`FURIA`,name:`Furia (Fuego)`},{id:`ARCANO`,name:`Arcano (Hielo)`},{id:`NATURALEZA`,name:`Naturaleza`,locked:!0},{id:`ORDEN`,name:`Orden`,locked:!0},{id:`SOMBRA`,name:`Sombra`,locked:!0},{id:`VACIO`,name:`Vacío`,locked:!0}],d=Object.values(n).sort((e,t)=>e.cardNumber-t.cardNumber).filter(e=>t===`ALL`||e.faction===t);return(0,s.jsxs)(`div`,{className:`gallery-view`,children:[(0,s.jsxs)(`div`,{className:`gallery-header`,children:[e&&(0,s.jsx)(`button`,{className:`back-button`,onClick:e,children:`← Volver al Menú`}),(0,s.jsx)(`h1`,{children:`Colección de Cartas`}),(0,s.jsx)(`p`,{className:`gallery-subtitle`,children:`Muestra de las 400 cartas que habitan el Nexo`})]}),(0,s.jsx)(`div`,{className:`faction-tabs`,children:u.map(e=>(0,s.jsxs)(`button`,{disabled:e.locked,className:`tab-button ${t===e.id?`active`:``} ${e.locked?`locked`:``}`,onClick:()=>!e.locked&&r(e.id),children:[e.name,` `,e.locked&&`🔒`]},e.id))}),(0,s.jsx)(`div`,{className:`gallery-grid-wrapper`,children:(0,s.jsx)(`div`,{className:`gallery-grid`,children:d.map(e=>(0,s.jsx)(`div`,{className:`grid-card-item`,children:(0,s.jsx)(a,{card:e,mode:`gallery`,onClick:()=>l(e)})},e.id))})}),c&&(()=>{let e=i[c.id]||{title:c.name,history:[c.flavorText],quote:c.flavorText,artistNote:`Ilustración del nexo.`};return(0,s.jsx)(`div`,{className:`lore-vault-overlay`,onClick:()=>l(null),children:(0,s.jsxs)(`div`,{className:`lore-vault-content glass-panel-heavy`,onClick:e=>e.stopPropagation(),children:[(0,s.jsx)(`button`,{className:`close-vault-button`,onClick:()=>l(null),children:`✕`}),(0,s.jsx)(`div`,{className:`vault-left-col`,children:(0,s.jsx)(`div`,{className:`vault-card-wrapper`,children:(0,s.jsx)(a,{card:c,mode:`inspected`})})}),(0,s.jsxs)(`div`,{className:`vault-right-col`,children:[(0,s.jsxs)(`div`,{className:`vault-header`,children:[(0,s.jsxs)(`span`,{className:`vault-rarity-badge`,style:{borderColor:`var(--rarity-${c.rarity.toLowerCase()})`,color:`var(--rarity-${c.rarity.toLowerCase()})`},children:[`🛡️ `,c.rarity]}),(0,s.jsx)(`span`,{className:`vault-faction-badge`,children:c.faction}),c.subtype&&(0,s.jsx)(`span`,{className:`vault-subtype-badge`,children:c.subtype})]}),(0,s.jsx)(`h1`,{className:`vault-title`,children:e.title}),(0,s.jsx)(`div`,{className:`vault-divider`}),(c.attack!==void 0||c.maxHealth!==void 0||c.range!==void 0)&&(0,s.jsxs)(`div`,{className:`vault-stats-bar`,children:[c.attack!==void 0&&(0,s.jsxs)(`div`,{className:`vault-stat-item`,children:[(0,s.jsx)(`span`,{className:`vault-stat-icon red-text`,children:`⚔️`}),(0,s.jsxs)(`span`,{className:`vault-stat-val`,children:[c.attack,` Atk`]})]}),c.maxHealth!==void 0&&(0,s.jsxs)(`div`,{className:`vault-stat-item`,children:[(0,s.jsx)(`span`,{className:`vault-stat-icon green-text`,children:`❤️`}),(0,s.jsxs)(`span`,{className:`vault-stat-val`,children:[c.maxHealth,` HP`]})]}),c.range!==void 0&&(0,s.jsxs)(`div`,{className:`vault-stat-item`,children:[(0,s.jsx)(`span`,{className:`vault-stat-icon blue-text`,children:`🎯`}),(0,s.jsxs)(`span`,{className:`vault-stat-val`,children:[`Rango `,c.range]})]}),c.movement!==void 0&&(0,s.jsxs)(`div`,{className:`vault-stat-item`,children:[(0,s.jsx)(`span`,{className:`vault-stat-icon yellow-text`,children:`👣`}),(0,s.jsxs)(`span`,{className:`vault-stat-val`,children:[`Mov `,c.movement]})]})]}),(0,s.jsx)(`div`,{className:`vault-history-scroll`,children:e.history.map((e,t)=>(0,s.jsx)(`p`,{className:`vault-paragraph`,children:e},t))}),(0,s.jsx)(`div`,{className:`vault-quote-block`,children:(0,s.jsx)(`p`,{className:`vault-quote-text`,children:e.quote})}),(0,s.jsxs)(`div`,{className:`vault-artist-footer`,children:[(0,s.jsxs)(`div`,{className:`vault-artist-info`,children:[(0,s.jsx)(`span`,{className:`artist-label`,children:`ARTISTA`}),(0,s.jsx)(`span`,{className:`artist-name`,children:c.artist||`Desconocido`})]}),(0,s.jsxs)(`div`,{className:`vault-artist-info`,children:[(0,s.jsx)(`span`,{className:`artist-label`,children:`ESTILO`}),(0,s.jsx)(`span`,{className:`artist-name style-tag`,children:c.artistStyle||`Tradicional`})]})]})]})]})})})(),(0,s.jsx)(`style`,{children:`
        .gallery-view {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          background: radial-gradient(circle at center, #111520 0%, #050609 100%);
          padding: 24px 40px;
          overflow: hidden;
        }

        .gallery-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
          position: relative;
        }

        .back-button {
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          transition: background 0.2s;
        }
        .back-button:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .gallery-header h1 {
          font-size: 2.2rem;
          text-align: center;
          background: linear-gradient(90deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gallery-subtitle {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.95rem;
          margin-top: 4px;
        }

        /* Tabs */
        .faction-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .tab-button {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-text-muted);
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .tab-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .tab-button.active {
          background: #4f46e5;
          color: #fff;
          border-color: #6366f1;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
        }

        .tab-button.locked {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Grid */
        .gallery-grid-wrapper {
          flex: 1;
          overflow-y: auto;
          padding-right: 8px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 24px;
          justify-items: center;
          padding-bottom: 40px;
        }

        .grid-card-item {
          transition: transform 0.2s;
        }
        .grid-card-item:hover {
          transform: translateY(-5px);
        }

        /* Lore Vault Premium Modal Styles */
        .lore-vault-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(16px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 200;
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lore-vault-content {
          position: relative;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 40px;
          padding: 40px;
          max-width: 950px;
          width: 92%;
          max-height: 90vh;
          overflow: hidden;
          animation: cinematic-entrance 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .close-vault-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          font-size: 1.2rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s;
          z-index: 10;
        }
        .close-vault-button:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.3);
          transform: rotate(90deg);
        }

        .vault-left-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .vault-card-wrapper {
          transform: scale(1.05);
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6));
        }

        .vault-right-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: calc(90vh - 80px);
          overflow-y: auto;
          padding-right: 12px;
        }

        .vault-header {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .vault-rarity-badge, .vault-faction-badge, .vault-subtype-badge {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .vault-rarity-badge {
          background: rgba(0,0,0,0.4);
        }
        .vault-faction-badge {
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          border-color: rgba(99, 102, 241, 0.25);
        }
        .vault-subtype-badge {
          background: rgba(255, 255, 255, 0.03);
          color: var(--color-text-muted);
        }

        .vault-title {
          font-family: var(--font-display);
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .vault-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent);
          width: 100%;
        }

        .vault-stats-bar {
          display: flex;
          gap: 16px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 8px 16px;
          border-radius: 8px;
          width: fit-content;
        }
        .vault-stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .vault-stat-icon {
          font-size: 0.95rem;
        }
        .vault-stat-val {
          font-size: 0.8rem;
          font-weight: 700;
          font-family: var(--font-display);
          color: #e5e7eb;
        }
        .red-text { color: #f87171; }
        .green-text { color: #34d399; }
        .blue-text { color: #60a5fa; }
        .yellow-text { color: #fbbf24; }

        .vault-history-scroll {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .vault-paragraph {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #d1d5db;
        }

        .vault-quote-block {
          background: rgba(251, 191, 36, 0.03);
          border-left: 3px solid #fbbf24;
          padding: 14px 18px;
          border-radius: 4px;
          margin-top: 10px;
          box-shadow: inset 0 0 10px rgba(251, 191, 36, 0.02);
        }
        .vault-quote-text {
          font-size: 1rem;
          font-style: italic;
          color: #fbbf24;
          line-height: 1.5;
          font-family: Georgia, serif;
        }

        .vault-artist-footer {
          display: flex;
          gap: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 16px;
          margin-top: auto;
        }
        .vault-artist-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .artist-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
        }
        .artist-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #f3f4f6;
        }
        .artist-name.style-tag {
          color: var(--color-arcano);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `})]})};export{c as Gallery};