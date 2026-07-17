const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Board3D-A1XFExFe.js","assets/index-BRunYVRp.js","assets/index-BkbYYJ8_.css","assets/CardDOM-_MNbKXmh.js"])))=>i.map(i=>d[i]);
import{d as e,l as t,n,p as r,r as i,t as a,v as o,x as s}from"./index-BRunYVRp.js";import{t as c}from"./CardDOM-_MNbKXmh.js";import{t as l}from"./createLucideIcon-C-wg8Kob.js";var u=l(`volume-2`,[[`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`,key:`uqj9uw`}],[`path`,{d:`M16 9a5 5 0 0 1 0 6`,key:`1q6k2b`}],[`path`,{d:`M19.364 18.364a9 9 0 0 0 0-12.728`,key:`ijwkga`}]]),d=l(`volume-x`,[[`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`,key:`uqj9uw`}],[`line`,{x1:`22`,x2:`16`,y1:`9`,y2:`15`,key:`1ewh16`}],[`line`,{x1:`16`,x2:`22`,y1:`9`,y2:`15`,key:`5ykzw1`}]]),f=s(o(),1),p=a(),m=(0,f.lazy)(async()=>({default:(await i(()=>import(`./Board3D-A1XFExFe.js`),__vite__mapDeps([0,1,2,3]))).Board3D})),h=class extends f.Component{state={hasError:!1};static getDerivedStateFromError(){return{hasError:!0}}render(){return this.state.hasError?(0,p.jsxs)(`div`,{className:`board-error-state`,role:`alert`,children:[(0,p.jsx)(`strong`,{children:`El santuario no ha podido cargarse.`}),(0,p.jsx)(`span`,{children:`La partida se conserva. Puedes reiniciar solo el escenario 3D.`}),(0,p.jsx)(`button`,{type:`button`,onClick:this.props.onRecover,children:`Recuperar escenario`})]}):this.props.children}},g=({entity:t})=>{let n=e(t.cardId),r=Math.max(0,Math.min(100,t.health/t.maxHealth*100));return(0,p.jsxs)(`div`,{className:`terrain-inspector animated-fade`,children:[(0,p.jsx)(`div`,{className:`terrain-inspector-crest`,"aria-hidden":`true`,children:`+`}),(0,p.jsxs)(`div`,{className:`terrain-inspector-heading`,children:[(0,p.jsx)(`span`,{children:n.terrainLabel}),(0,p.jsx)(`h4`,{children:n.name})]}),(0,p.jsxs)(`div`,{className:`terrain-integrity`,children:[(0,p.jsxs)(`div`,{className:`terrain-integrity-label`,children:[(0,p.jsx)(`span`,{children:`Integridad`}),(0,p.jsxs)(`strong`,{children:[t.health,`/`,t.maxHealth]})]}),(0,p.jsx)(`div`,{className:`terrain-integrity-track`,"aria-label":`Integridad ${t.health} de ${t.maxHealth}`,children:(0,p.jsx)(`span`,{style:{width:`${r}%`}})})]}),(0,p.jsxs)(`div`,{className:`terrain-rule-list`,children:[(0,p.jsx)(`span`,{children:`Bloquea movimiento y rutas a traves de esta casilla.`}),(0,p.jsx)(`span`,{children:`Los ataques y hechizos de dano pueden derribarlo.`})]}),(0,p.jsx)(`p`,{className:`terrain-description`,children:n.description})]})},_=({onQuit:e})=>{let[i,a]=(0,f.useState)(0),{gameState:o,selectedCardInHand:s,selectedEntity:l,hoveredEntity:_,inspectedCard:v,gameEvents:y,selectCardInHand:b,selectEntity:x,setInspectedCard:S,playMana:C,endActiveTurn:w,startNewGame:T,leaveOnlineGame:E,isAIThinking:D,soundEnabled:O,toggleSound:k,localController:A,onlineSession:j}=n(),M=e=>{if(!o||e.controller===A||e.cardId.startsWith(`obstaculo-`))return!0;let t=Object.values(o.board).filter(e=>e.controller===A);return e.position.y<=2||t.some(t=>Math.abs(t.position.x-e.position.x)+Math.abs(t.position.y-e.position.y)<=2)},N=o?.turn||0,P=(o?.activePlayer||`PLAYER`)===A;if((0,f.useEffect)(()=>{let e=e=>{e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||(e.key===`Escape`&&(v?S(null):(b(null),x(null))),e.key===`Enter`&&!e.repeat&&P&&!D&&!v&&(e.preventDefault(),w()))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[w,v,D,P,b,x,S]),!o)return null;let{player:F,opponent:I,winner:L}=o,R=A===`PLAYER`?F:I,z=A===`PLAYER`?I:F,B=r[R.commander.id],V=Object.values(o.board).find(e=>e.id===(A===`PLAYER`?`commander-player`:`commander-opponent`)),H=Object.values(o.board).find(e=>e.id===(A===`PLAYER`?`commander-opponent`:`commander-player`)),U=V?V.health:0,W=H?H.health:0,G=e=>{P&&!R.manaPlayedThisTurn&&C(e)},K=()=>{let e=B.faction===`FURIA`?`FURIA`:`ARCANO`;T(e)},q=()=>{w()},J=()=>{j&&E(),e?.()},Y=(e,t,n)=>{let r=[];for(let i=0;i<t;i++)r.push((0,p.jsx)(`div`,{className:`mana-orb ${n} ${i<e?`active`:`spent`}`},i));return(0,p.jsx)(`div`,{className:`mana-orbs-row`,children:r})},X=R.manaSources.furia.total-R.manaSources.furia.spent,Z=R.manaSources.arcano.total-R.manaSources.arcano.spent,Q=z.manaSources.furia.total-z.manaSources.furia.spent,$=z.manaSources.arcano.total-z.manaSources.arcano.spent;return(0,p.jsxs)(`div`,{className:`game-hud`,children:[(0,p.jsxs)(`div`,{className:`hud-top-bar glass-panel`,children:[(0,p.jsxs)(`div`,{className:`top-section opponent-info-compact`,children:[(0,p.jsx)(`span`,{className:`commander-tag opponent`,children:j?`RIVAL (ONLINE)`:`🤖 RIVAL (IA)`}),(0,p.jsxs)(`div`,{className:`nexo-health-bar-mini`,children:[(0,p.jsx)(`div`,{className:`nexo-bar-fill opponent`,style:{width:`${Math.max(0,W/25*100)}%`}}),(0,p.jsxs)(`span`,{className:`nexo-bar-text`,children:[`❤️ `,W,`/25`]})]}),(0,p.jsxs)(`span`,{className:`resource-badge`,children:[`🎴 `,z.deck.length]}),(0,p.jsxs)(`span`,{className:`resource-badge`,children:[`🪦 `,z.graveyard.length]})]}),(0,p.jsxs)(`div`,{className:`top-section game-status-center`,children:[(0,p.jsxs)(`div`,{className:`turn-indicator`,children:[(0,p.jsx)(`div`,{className:`turn-dot ${P?`player-dot`:`opponent-dot`}`}),(0,p.jsxs)(`span`,{className:`turn-label`,children:[`TURNO `,N]})]}),(0,p.jsx)(`span`,{className:`phase-tag ${P?`player`:`opponent`}`,children:P?`⚔️ Tu Turno`:j?`Esperando al rival...`:`🤖 IA Pensando...`})]}),(0,p.jsxs)(`div`,{className:`top-section opponent-mana-compact`,children:[(0,p.jsxs)(`div`,{className:`mana-compact-group`,children:[(0,p.jsx)(`span`,{className:`mana-compact-label arcano-text`,children:`❄️`}),Y($,z.manaSources.arcano.total,`arcano`),(0,p.jsxs)(`span`,{className:`mana-compact-num`,children:[$,`/`,z.manaSources.arcano.total]})]}),(0,p.jsxs)(`div`,{className:`mana-compact-group`,children:[(0,p.jsx)(`span`,{className:`mana-compact-label furia-text`,children:`🔥`}),Y(Q,z.manaSources.furia.total,`furia`),(0,p.jsxs)(`span`,{className:`mana-compact-num`,children:[Q,`/`,z.manaSources.furia.total]})]}),(0,p.jsx)(`button`,{type:`button`,className:`sound-toggle ${O?`is-active`:``}`,onClick:k,title:O?`Desactivar sonido`:`Activar sonido`,"aria-label":O?`Desactivar sonido`:`Activar sonido`,children:O?(0,p.jsx)(u,{size:16}):(0,p.jsx)(d,{size:16})})]})]}),(0,p.jsxs)(`div`,{className:`game-center-board`,children:[(0,p.jsx)(`div`,{className:`board-canvas-area`,children:(0,p.jsx)(h,{onRecover:()=>a(e=>e+1),children:(0,p.jsx)(f.Suspense,{fallback:(0,p.jsx)(`div`,{className:`board-loading`,"aria-label":`Cargando el escenario`,children:(0,p.jsx)(`span`,{})}),children:(0,p.jsx)(m,{})})},i)}),(0,p.jsxs)(`div`,{className:`hud-sidebar glass-panel ${_||l||s?`has-inspection`:``}`,children:[(0,p.jsxs)(`h3`,{className:`sidebar-title`,children:[(0,p.jsx)(`span`,{className:`sidebar-title-icon`,children:`🔍`}),`Inspector`]}),(0,p.jsx)(`div`,{className:`inspector-content`,children:_?t(_)?(0,p.jsx)(g,{entity:_}):M(_)?(0,p.jsxs)(`div`,{className:`sidebar-entity-info animated-fade`,children:[(0,p.jsx)(`div`,{className:`inspected-card-preview`,children:(0,p.jsx)(c,{card:r[_.cardId],mode:`hand`})}),(0,p.jsxs)(`div`,{className:`stats-grid`,children:[(0,p.jsxs)(`div`,{className:`stat-box attack`,children:[(0,p.jsx)(`div`,{className:`stat-circle attack-circle`,children:(0,p.jsx)(`span`,{className:`stat-circle-val`,children:_.attack})}),(0,p.jsx)(`span`,{className:`stat-label`,children:`ATK`})]}),(0,p.jsxs)(`div`,{className:`stat-box health`,children:[(0,p.jsx)(`div`,{className:`stat-circle health-circle`,children:(0,p.jsx)(`span`,{className:`stat-circle-val`,children:_.health})}),(0,p.jsxs)(`span`,{className:`stat-label`,children:[`HP `,_.health,`/`,_.maxHealth]})]})]}),(0,p.jsxs)(`div`,{className:`card-specs-mini`,children:[r[_.cardId]?.range!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`🎯 Rango: `,r[_.cardId].range]}),r[_.cardId]?.movement!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`👣 Mov: `,r[_.cardId].movement]}),(0,p.jsx)(`span`,{className:`spec-pill style-tag-pill`,children:r[_.cardId]?.subtype})]}),(0,p.jsxs)(`div`,{className:`rules-box`,children:[(0,p.jsx)(`p`,{className:`rules-title`,children:`Reglas Especiales`}),(0,p.jsx)(`p`,{className:`rules-desc`,children:r[_.cardId]?.rulesText})]}),(0,p.jsxs)(`div`,{className:`lore-box-sidebar`,children:[(0,p.jsxs)(`p`,{className:`lore-desc`,children:[`"`,r[_.cardId]?.flavorText,`"`]}),r[_.cardId]?.artist&&(0,p.jsxs)(`p`,{className:`artist-credit-sidebar`,children:[`🎨 Art: `,r[_.cardId].artist,` (`,r[_.cardId].artistStyle,`)`]})]}),_.frozenTurns>0&&(0,p.jsxs)(`div`,{className:`frozen-banner-sidebar`,children:[`❄️ CONGELADO (`,_.frozenTurns,` T)`]})]}):(0,p.jsxs)(`div`,{className:`inspector-card-hidden`,children:[(0,p.jsx)(`div`,{className:`inspected-card-preview-hidden`,children:(0,p.jsxs)(`div`,{className:`hidden-card-placeholder`,children:[(0,p.jsx)(`span`,{className:`eye-icon`,children:`👁️`}),(0,p.jsx)(`span`,{className:`question`,children:`?`})]})}),(0,p.jsx)(`h3`,{style:{fontSize:`1rem`,marginTop:`10px`,color:`#818cf8`},children:`Criatura Oculta`}),(0,p.jsx)(`p`,{className:`rules-desc`,style:{fontStyle:`italic`,opacity:.6},children:`Esta unidad enemiga está oculta por la niebla de guerra. Acércate para revelarla.`})]}):l?t(l)?(0,p.jsx)(g,{entity:l}):M(l)?(0,p.jsxs)(`div`,{className:`sidebar-entity-info animated-fade`,children:[(0,p.jsx)(`div`,{className:`inspected-card-preview`,children:(0,p.jsx)(c,{card:r[l.cardId],mode:`hand`})}),(0,p.jsxs)(`div`,{className:`stats-grid`,children:[(0,p.jsxs)(`div`,{className:`stat-box attack`,children:[(0,p.jsx)(`div`,{className:`stat-circle attack-circle`,children:(0,p.jsx)(`span`,{className:`stat-circle-val`,children:l.attack})}),(0,p.jsx)(`span`,{className:`stat-label`,children:`ATK`})]}),(0,p.jsxs)(`div`,{className:`stat-box health`,children:[(0,p.jsx)(`div`,{className:`stat-circle health-circle`,children:(0,p.jsx)(`span`,{className:`stat-circle-val`,children:l.health})}),(0,p.jsxs)(`span`,{className:`stat-label`,children:[`HP `,l.health,`/`,l.maxHealth]})]})]}),(0,p.jsxs)(`div`,{className:`card-specs-mini`,children:[r[l.cardId]?.range!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`🎯 Rango: `,r[l.cardId].range]}),r[l.cardId]?.movement!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`👣 Mov: `,r[l.cardId].movement]}),(0,p.jsx)(`span`,{className:`spec-pill style-tag-pill`,children:r[l.cardId]?.subtype})]}),(0,p.jsxs)(`div`,{className:`rules-box`,children:[(0,p.jsx)(`p`,{className:`rules-title`,children:`Reglas Especiales`}),(0,p.jsx)(`p`,{className:`rules-desc`,children:r[l.cardId]?.rulesText})]}),(0,p.jsxs)(`div`,{className:`lore-box-sidebar`,children:[(0,p.jsxs)(`p`,{className:`lore-desc`,children:[`"`,r[l.cardId]?.flavorText,`"`]}),r[l.cardId]?.artist&&(0,p.jsxs)(`p`,{className:`artist-credit-sidebar`,children:[`🎨 Art: `,r[l.cardId].artist,` (`,r[l.cardId].artistStyle,`)`]})]}),(0,p.jsxs)(`div`,{className:`actions-hint`,children:[(0,p.jsx)(`span`,{className:`hint-pill ${l.hasMovedThisTurn?`spent`:`ready`}`,children:l.hasMovedThisTurn?`✗ Movido`:`✓ Mover`}),(0,p.jsx)(`span`,{className:`hint-pill ${l.hasAttackedThisTurn?`spent`:`ready`}`,children:l.hasAttackedThisTurn?`✗ Atacado`:`✓ Atacar`})]})]}):(0,p.jsxs)(`div`,{className:`inspector-card-hidden`,children:[(0,p.jsx)(`div`,{className:`inspected-card-preview-hidden`,children:(0,p.jsxs)(`div`,{className:`hidden-card-placeholder`,children:[(0,p.jsx)(`span`,{className:`eye-icon`,children:`👁️`}),(0,p.jsx)(`span`,{className:`question`,children:`?`})]})}),(0,p.jsx)(`h3`,{style:{fontSize:`1rem`,marginTop:`10px`,color:`#818cf8`},children:`Criatura Oculta`}),(0,p.jsx)(`p`,{className:`rules-desc`,style:{fontStyle:`italic`,opacity:.6},children:`Esta unidad enemiga está oculta por la niebla de guerra. Acércate para revelarla.`})]}):s?(0,p.jsxs)(`div`,{className:`sidebar-card-info animated-fade`,children:[(0,p.jsx)(`div`,{className:`inspected-card-preview hand-card-preview`,children:(0,p.jsx)(c,{card:s,mode:`hand`,isSelected:!0,isPlayable:P})}),(0,p.jsx)(`h4`,{children:s.name}),(0,p.jsxs)(`div`,{className:`badge-row-sidebar`,children:[(0,p.jsx)(`span`,{className:`badge-type`,children:s.subtype||s.type}),(0,p.jsx)(`span`,{className:`badge-rarity-sidebar`,style:{color:`var(--rarity-${s.rarity.toLowerCase()})`},children:s.rarity})]}),(0,p.jsxs)(`div`,{className:`card-specs-mini hand-specs`,children:[s.range!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`🎯 Rango: `,s.range]}),s.movement!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`👣 Mov: `,s.movement]}),s.attack!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`⚔️ ATK: `,s.attack]}),s.maxHealth!==void 0&&(0,p.jsxs)(`span`,{className:`spec-pill`,children:[`❤️ HP: `,s.maxHealth]})]}),(0,p.jsx)(`p`,{className:`rules-desc-sidebar`,children:s.rulesText}),(0,p.jsxs)(`div`,{className:`lore-box-sidebar hand-lore`,children:[(0,p.jsxs)(`p`,{className:`lore-desc`,children:[`"`,s.flavorText,`"`]}),s.artist&&(0,p.jsxs)(`p`,{className:`artist-credit-sidebar`,children:[`🎨 Art: `,s.artist,` (`,s.artistStyle,`)`]})]}),s.type===`MANA`&&(0,p.jsx)(`button`,{className:`action-btn-sidebar play-mana`,disabled:!P||R.manaPlayedThisTurn,onClick:()=>G(s.id),children:`⬆ Jugar Fuente de Maná`})]}):(0,p.jsxs)(`div`,{className:`sidebar-placeholder`,children:[(0,p.jsx)(`div`,{className:`placeholder-icon`,children:`👁️`}),(0,p.jsx)(`p`,{children:`Selecciona o inspecciona una carta del tablero o tu mano para ver sus atributos.`})]})}),(0,p.jsxs)(`div`,{className:`action-log`,children:[(0,p.jsx)(`div`,{className:`action-log-title`,children:`📜 Registro`}),y.length===0?(0,p.jsx)(`div`,{className:`action-log-empty`,children:`Sin acciones aún`}):y.map(e=>(0,p.jsx)(`div`,{className:`action-log-entry tone-${e.tone}`,children:e.text},e.id))]}),(0,p.jsxs)(`div`,{className:`sidebar-footer-controls`,children:[(0,p.jsx)(`button`,{className:`action-btn end-turn ${P?`active`:``}`,disabled:!P,onClick:q,children:P?`⚡ Finalizar Turno`:`⏳ Esperando...`}),(0,p.jsx)(`button`,{className:`action-btn surrender`,onClick:J,children:`🏳️ Rendirse`})]})]})]}),(0,p.jsxs)(`div`,{className:`hud-bottom-bar glass-panel ${D?`ai-thinking-dim`:``}`,children:[D&&(0,p.jsxs)(`div`,{className:`ai-thinking-overlay`,children:[(0,p.jsx)(`div`,{className:`ai-spinner`}),(0,p.jsx)(`span`,{children:`IA PENSANDO...`})]}),(0,p.jsxs)(`div`,{className:`player-stats-panel`,children:[(0,p.jsx)(`div`,{className:`commander-tag player`,children:`👤 TU NEXO`}),(0,p.jsxs)(`div`,{className:`hp-bar-container`,children:[(0,p.jsx)(`div`,{className:`hp-bar-fill`,style:{width:`${Math.max(0,U/25*100)}%`},children:(0,p.jsx)(`div`,{className:`hp-bar-shimmer`})}),(0,p.jsxs)(`span`,{className:`hp-bar-label`,children:[U,` / 25`]})]}),(0,p.jsxs)(`div`,{className:`deck-graveyard-stats`,children:[(0,p.jsxs)(`span`,{children:[`🎴 `,R.deck.length]}),(0,p.jsxs)(`span`,{children:[`🪦 `,R.graveyard.length]})]})]}),(0,p.jsxs)(`div`,{className:`player-hand-container`,children:[(0,p.jsxs)(`div`,{className:`hand-stage-meta`,"aria-hidden":`true`,children:[(0,p.jsx)(`span`,{className:`hand-stage-title`,children:`MANO`}),(0,p.jsxs)(`span`,{className:`hand-stage-count`,children:[R.hand.length,` CARTAS`]})]}),(0,p.jsx)(`div`,{className:`player-hand-scroll`,children:R.hand.map((e,t)=>{let n=s?.id===e.id,r=P&&(e.type===`MANA`?!R.manaPlayedThisTurn:(e.cost.furia||0)<=R.manaSources.furia.total-R.manaSources.furia.spent&&(e.cost.arcano||0)<=R.manaSources.arcano.total-R.manaSources.arcano.spent&&e.cost.generic<=R.manaSources.furia.total-R.manaSources.furia.spent+(R.manaSources.arcano.total-R.manaSources.arcano.spent)-(e.cost.furia||0)-(e.cost.arcano||0));return(0,p.jsx)(`div`,{className:`hand-card-wrapper ${n?`is-selected`:``} ${r?`is-playable`:``}`,style:{"--hand-rotation":`${(t-(R.hand.length-1)/2)*1.1}deg`,"--hand-offset":`${Math.abs(t-(R.hand.length-1)/2)*2}px`},onClick:()=>b(n?null:e),onDoubleClick:()=>S(e),title:`Doble clic para ver la carta completa`,children:(0,p.jsx)(c,{card:e,mode:`hand`,isSelected:n,isPlayable:r})},`${e.id}-${t}`)})})]}),(0,p.jsxs)(`div`,{className:`player-mana-panel`,children:[(0,p.jsxs)(`div`,{className:`mana-orb-group`,children:[(0,p.jsxs)(`div`,{className:`mana-orb-header`,children:[(0,p.jsx)(`span`,{className:`mana-orb-icon arcano-text`,children:`❄️ Arcano`}),(0,p.jsxs)(`span`,{className:`mana-orb-count`,children:[Z,`/`,R.manaSources.arcano.total]})]}),Y(Z,R.manaSources.arcano.total,`arcano`)]}),(0,p.jsxs)(`div`,{className:`mana-orb-group`,children:[(0,p.jsxs)(`div`,{className:`mana-orb-header`,children:[(0,p.jsx)(`span`,{className:`mana-orb-icon furia-text`,children:`🔥 Furia`}),(0,p.jsxs)(`span`,{className:`mana-orb-count`,children:[X,`/`,R.manaSources.furia.total]})]}),Y(X,R.manaSources.furia.total,`furia`)]})]})]}),L&&(0,p.jsx)(`div`,{className:`game-over-overlay`,children:(0,p.jsxs)(`div`,{className:`game-over-box glass-panel ${L===A?`victory`:`defeat`}`,children:[(0,p.jsx)(`div`,{className:`game-over-icon`,children:L===A?`🏆`:`💀`}),(0,p.jsx)(`h2`,{className:L===A?`victory-title`:`defeat-title`,children:L===A?`¡VICTORIA!`:`DERROTA`}),(0,p.jsx)(`p`,{className:`game-over-desc`,children:L===A?j?`Has defendido con exito tu Nexo y derrotado a tu rival.`:`Has defendido con exito tu Nexo y derrotado a la Inteligencia Artificial.`:j?`Tu rival ha derribado tu Nexo.`:`Tu Comandante ha caido en combate. El Nexo ha sido destruido.`}),(0,p.jsxs)(`div`,{className:`game-over-buttons`,children:[!j&&(0,p.jsx)(`button`,{className:`game-over-btn primary`,onClick:K,children:`⚔️ Jugar de Nuevo`}),(0,p.jsx)(`button`,{className:`game-over-btn secondary`,onClick:J,children:`🏠 Volver al Menú`})]})]})}),v&&(0,p.jsx)(`div`,{className:`card-inspection-overlay`,role:`dialog`,"aria-modal":`true`,"aria-label":`Información de ${v.name}`,onClick:()=>S(null),children:(0,p.jsxs)(`div`,{className:`card-inspection-modal`,onClick:e=>e.stopPropagation(),children:[(0,p.jsx)(`button`,{type:`button`,className:`card-inspection-close`,"aria-label":`Cerrar información de la carta`,onClick:()=>S(null),children:`X`}),(0,p.jsx)(`div`,{className:`card-inspection-art`,children:(0,p.jsx)(c,{card:v,mode:`inspected`})}),(0,p.jsxs)(`div`,{className:`card-inspection-details`,children:[(0,p.jsxs)(`div`,{className:`card-inspection-kicker`,children:[v.faction,` / `,v.rarity]}),(0,p.jsx)(`h2`,{children:v.name}),(0,p.jsx)(`p`,{className:`card-inspection-type`,children:v.subtype||v.type}),(0,p.jsxs)(`div`,{className:`card-inspection-stats`,children:[(0,p.jsxs)(`span`,{children:[`Coste `,v.cost.generic+(v.cost.furia||0)+(v.cost.arcano||0)]}),v.attack!==void 0&&(0,p.jsxs)(`span`,{children:[`ATK `,v.attack]}),v.maxHealth!==void 0&&(0,p.jsxs)(`span`,{children:[`HP `,v.maxHealth]}),v.range!==void 0&&(0,p.jsxs)(`span`,{children:[`Rango `,v.range]}),v.movement!==void 0&&(0,p.jsxs)(`span`,{children:[`Movimiento `,v.movement]})]}),(0,p.jsxs)(`section`,{className:`card-inspection-section`,children:[(0,p.jsx)(`h3`,{children:`Reglas`}),(0,p.jsx)(`p`,{children:v.rulesText})]}),(0,p.jsxs)(`section`,{className:`card-inspection-section card-inspection-flavor`,children:[(0,p.jsx)(`h3`,{children:`Historia`}),(0,p.jsxs)(`p`,{children:[`"`,v.flavorText,`"`]})]}),(0,p.jsxs)(`div`,{className:`card-inspection-footer`,children:[(0,p.jsxs)(`span`,{children:[`Colección #`,v.cardNumber,`/400`]}),(0,p.jsx)(`span`,{children:v.artist?`Arte: ${v.artist}`:`Arte del Nexo`})]})]})]})}),(0,p.jsx)(`style`,{children:`
        /* ═══════════════════════════════════════════════════
           GAME HUD — Premium Layout System
           ═══════════════════════════════════════════════════ */
        .game-hud {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          position: relative;
          background: #0a1119;
          overflow: hidden;
          padding: 0;
          gap: 0;
          font-family: var(--font-sans);
        }

        /* ═══ TOP BAR ═══ */
        .hud-top-bar {
          position: absolute;
          z-index: 30;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 20px 15px;
          height: 56px;
          min-height: 56px;
          border: 0;
          border-radius: 0;
          background: linear-gradient(180deg, rgba(5, 9, 15, 0.92) 0%, rgba(5, 9, 15, 0.58) 58%, transparent 100%);
          box-shadow: none;
        }

        .top-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .opponent-info-compact {
          font-size: 0.82rem;
        }

        .commander-tag {
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 0.03em;
          font-size: 0.82rem;
        }
        .commander-tag.opponent { color: var(--color-furia); }
        .commander-tag.player { color: var(--color-arcano); }

        /* Mini health bar in top bar */
        .nexo-health-bar-mini {
          position: relative;
          width: 100px;
          height: 18px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 9px;
          overflow: hidden;
        }
        .nexo-bar-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          border-radius: 9px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nexo-bar-fill.opponent {
          background: linear-gradient(90deg, #b91c1c, #ef4444, #f87171);
        }
        .nexo-bar-text {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 0.68rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .resource-badge {
          color: var(--color-text-muted);
          font-size: 0.78rem;
        }

        /* Turn indicator with pulsing dot */
        .game-status-center {
          flex-direction: column;
          gap: 2px;
        }
        .turn-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .turn-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse-dot 1.5s infinite;
        }
        .turn-dot.player-dot { background: var(--color-success); box-shadow: 0 0 6px var(--color-success); }
        .turn-dot.opponent-dot { background: var(--color-danger); box-shadow: 0 0 6px var(--color-danger); }

        .turn-label {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #fff;
          font-family: var(--font-display);
        }

        .phase-tag {
          font-size: 0.68rem;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .phase-tag.player {
          background: rgba(16, 185, 129, 0.15);
          color: var(--color-success);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .phase-tag.opponent {
          background: rgba(239, 68, 68, 0.12);
          color: var(--color-danger);
          border: 1px solid rgba(239, 68, 68, 0.25);
          animation: glow-pulse 2s infinite;
        }

        /* Opponent mana compact orbs */
        .opponent-mana-compact {
          flex-direction: column;
          gap: 3px;
          position: relative;
          padding-right: 34px;
        }
        .sound-toggle {
          position: absolute;
          right: 0;
          top: 50%;
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(188, 219, 235, 0.18);
          border-radius: 50%;
          color: #8aa5b5;
          background: rgba(7, 17, 26, 0.72);
          transform: translateY(-50%);
          cursor: pointer;
          transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
        }
        .sound-toggle:hover,
        .sound-toggle.is-active {
          color: #dff7ff;
          border-color: rgba(116, 215, 255, 0.5);
          background: rgba(27, 83, 108, 0.52);
        }
        .mana-compact-group {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .mana-compact-label {
          font-size: 0.78rem;
        }
        .mana-compact-num {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-text-muted);
          min-width: 28px;
          text-align: right;
        }

        /* ═══ MANA ORBS ═══ */
        .mana-orbs-row {
          display: flex;
          gap: 3px;
          align-items: center;
        }
        .mana-orb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .mana-orb.furia.active {
          background: radial-gradient(circle at 35% 35%, #ff6b6b, var(--color-furia));
          box-shadow: 0 0 5px var(--color-furia-glow);
        }
        .mana-orb.arcano.active {
          background: radial-gradient(circle at 35% 35%, #66efff, var(--color-arcano));
          box-shadow: 0 0 5px var(--color-arcano-glow);
        }
        .mana-orb.spent {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 3px rgba(0,0,0,0.4);
        }

        /* ═══ CENTER LAYOUT ═══ */
        .game-center-board {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
        }
        .board-canvas-area {
          width: 100%;
          height: 100%;
          border-radius: 0;
          overflow: hidden;
          position: relative;
          border: 0;
          display: flex;
          flex-direction: column;
        }
        .board-loading {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 50% 42%, rgba(174, 219, 250, 0.88), rgba(97, 145, 186, 0.9) 38%, rgba(26, 48, 78, 0.96));
        }
        .board-loading span {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(232, 248, 255, 0.38);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: board-loading-spin 720ms linear infinite;
        }
        @keyframes board-loading-spin {
          to { transform: rotate(360deg); }
        }
        .board-error-state {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          align-content: center;
          gap: 12px;
          color: #eff8ff;
          background: #17263a;
          text-align: center;
        }
        .board-error-state button {
          min-width: 112px;
          border: 1px solid rgba(214, 239, 255, 0.68);
          border-radius: 5px;
          padding: 8px 12px;
          color: #ffffff;
          background: rgba(79, 145, 198, 0.58);
          cursor: pointer;
        }

        /* ═══ SIDEBAR INSPECTOR ═══ */
        .hud-sidebar {
          position: absolute;
          z-index: 32;
          top: 66px;
          right: 18px;
          bottom: 298px;
          width: 248px;
          min-width: 248px;
          display: flex;
          flex-direction: column;
          padding: 12px;
          gap: 10px;
          border: 1px solid rgba(200, 220, 238, 0.14);
          border-radius: 8px;
          background: rgba(6, 12, 20, 0.76);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(12px);
          pointer-events: auto;
        }

        .hud-sidebar .action-log {
          display: block;
          flex: 0 0 74px;
          min-height: 74px;
        }

        .inspector-card-hidden {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          margin-top: 15px;
          animation: slide-up 0.3s ease-out;
        }
        .inspected-card-preview-hidden {
          width: 140px;
          height: 190px;
          border: 2px dashed rgba(255, 255, 255, 0.15);
          border-radius: 9px;
          background: radial-gradient(circle at center, #111827 0%, #030712 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .hidden-card-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .hidden-card-placeholder .eye-icon {
          font-size: 2.2rem;
          opacity: 0.15;
        }
        .hidden-card-placeholder .question {
          font-size: 3rem;
          font-weight: bold;
          color: #818cf8;
          text-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
        }

        .sidebar-title {
          font-size: 0.95rem;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 6px;
        }
        .sidebar-title-icon {
          font-size: 1rem;
        }

        .inspector-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: 0;
          overflow-y: auto;
        }

        .sidebar-entity-info, .sidebar-card-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: slide-up 0.25s ease-out;
        }

        .terrain-inspector {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 6px 2px;
        }
        .terrain-inspector-crest {
          width: 76px;
          height: 76px;
          display: grid;
          place-items: center;
          align-self: center;
          border: 1px solid rgba(119, 213, 255, 0.48);
          border-radius: 50%;
          color: #d7f6ff;
          font-size: 2rem;
          font-weight: 300;
          background: radial-gradient(circle at 35% 28%, rgba(149, 235, 255, 0.34), rgba(32, 75, 101, 0.42) 58%, rgba(5, 18, 29, 0.9));
          box-shadow: 0 0 20px rgba(74, 193, 255, 0.22), inset 0 0 18px rgba(123, 220, 255, 0.12);
        }
        .terrain-inspector-heading {
          text-align: center;
        }
        .terrain-inspector-heading span {
          display: block;
          color: #77cce7;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .terrain-inspector-heading h4 {
          margin: 3px 0 0;
          color: #f0fbff;
          font-size: 1.05rem;
        }
        .terrain-integrity {
          padding: 9px;
          border: 1px solid rgba(158, 216, 235, 0.14);
          border-radius: 6px;
          background: rgba(130, 204, 232, 0.06);
        }
        .terrain-integrity-label {
          display: flex;
          justify-content: space-between;
          color: #b9d6df;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .terrain-integrity-label strong { color: #eafaff; }
        .terrain-integrity-track {
          height: 7px;
          margin-top: 7px;
          overflow: hidden;
          border-radius: 4px;
          background: rgba(3, 10, 16, 0.72);
        }
        .terrain-integrity-track span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #65d6ad, #baf1c9);
          box-shadow: 0 0 9px rgba(122, 232, 183, 0.6);
          transition: width 260ms ease;
        }
        .terrain-rule-list {
          display: grid;
          gap: 6px;
          color: #c7d7df;
          font-size: 0.72rem;
          line-height: 1.35;
        }
        .terrain-rule-list span {
          padding: 7px 8px 7px 23px;
          position: relative;
          border-left: 2px solid rgba(108, 209, 241, 0.58);
          background: rgba(255, 255, 255, 0.035);
        }
        .terrain-rule-list span::before {
          content: '•';
          position: absolute;
          left: 9px;
          color: #7cdbf7;
        }
        .terrain-description {
          margin: 0;
          color: #91aab5;
          font-size: 0.74rem;
          font-style: italic;
          line-height: 1.45;
        }

        .inspected-card-preview {
          height: 220px;
          display: flex;
          justify-content: center;
        }

        .inspected-card-preview .mode-hand {
          width: 154px;
          height: 220px;
        }
        .hand-card-preview {
          height: 202px;
        }
        .hand-card-preview .mode-hand {
          width: 140px;
          height: 200px;
        }

        /* Circular stat badges */
        .stats-grid {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .stat-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
          border: 2px solid;
          position: relative;
        }
        .stat-circle-val {
          font-family: var(--font-display);
        }
        .attack-circle {
          background: rgba(239, 68, 68, 0.12);
          border-color: #f87171;
          color: #f87171;
          box-shadow: 0 0 10px rgba(248, 113, 113, 0.2);
        }
        .health-circle {
          background: rgba(52, 211, 153, 0.12);
          border-color: #34d399;
          color: #34d399;
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.2);
        }
        .stat-label {
          font-size: 0.6rem;
          color: var(--color-text-muted);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rules-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 8px 10px;
        }
        .rules-title {
          font-size: 0.62rem;
          color: var(--color-text-muted);
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 3px;
          letter-spacing: 0.04em;
        }
        .rules-desc {
          font-size: 0.78rem;
          line-height: 1.35;
          color: #d1d5db;
        }

        .frozen-banner-sidebar {
          background: rgba(0, 217, 255, 0.12);
          color: var(--color-arcano);
          border: 1px solid rgba(0, 217, 255, 0.25);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px;
          text-align: center;
          border-radius: 6px;
          animation: glow-pulse 2s infinite;
        }

        .actions-hint {
          display: flex;
          gap: 6px;
          margin-top: auto;
        }
        .hint-pill {
          flex: 1;
          font-size: 0.65rem;
          text-align: center;
          padding: 4px;
          border-radius: 4px;
          font-weight: 700;
        }
        .hint-pill.ready {
          background: rgba(16, 185, 129, 0.1);
          color: var(--color-success);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .hint-pill.spent {
          background: rgba(255, 255, 255, 0.04);
          color: var(--color-text-muted);
        }

        .badge-type {
          font-size: 0.62rem;
          text-transform: uppercase;
          background: rgba(255,255,255,0.06);
          padding: 3px 8px;
          border-radius: 4px;
          width: fit-content;
          color: var(--color-text-muted);
          letter-spacing: 0.04em;
          font-weight: 600;
        }

        .card-specs-mini {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .spec-pill {
          font-size: 0.68rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 6px;
          color: #d1d5db;
        }

        .style-tag-pill {
          background: rgba(99, 102, 241, 0.12);
          border-color: rgba(99, 102, 241, 0.25);
          color: #a5b4fc;
        }

        .lore-box-sidebar {
          background: rgba(0, 0, 0, 0.18);
          border-left: 2px solid rgba(255, 255, 255, 0.1);
          padding: 8px 10px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lore-desc {
          font-size: 0.72rem;
          font-style: italic;
          color: #9ca3af;
          line-height: 1.4;
        }

        .artist-credit-sidebar {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.3);
          font-weight: 600;
        }

        .badge-row-sidebar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .badge-rarity-sidebar {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rules-desc-sidebar {
          font-size: 0.82rem;
          line-height: 1.5;
          color: #e5e7eb;
        }

        .action-btn-sidebar {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: all 0.25s;
          margin-top: auto;
          font-size: 0.85rem;
        }
        .action-btn-sidebar.play-mana {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          box-shadow: 0 2px 10px rgba(79, 70, 229, 0.3);
        }
        .action-btn-sidebar.play-mana:hover:not(:disabled) {
          background: linear-gradient(135deg, #4338ca, #4f46e5);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(79, 70, 229, 0.5);
        }
        .action-btn-sidebar.play-mana:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .sidebar-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
          padding: 20px 10px;
        }
        .placeholder-icon {
          font-size: 2rem;
          opacity: 0.3;
        }
        .sidebar-placeholder p {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          font-style: italic;
          line-height: 1.5;
        }

        /* Action log */
        .action-log {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 6px 8px;
          max-height: 74px;
          overflow-y: auto;
        }
        .action-log-title {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 4px;
          letter-spacing: 0.04em;
        }
        .action-log-empty {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.2);
          font-style: italic;
        }
        .action-log-entry {
          font-size: 0.68rem;
          color: #d1d5db;
          padding: 2px 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          animation: slide-up 0.2s ease-out;
        }
        .action-log-entry.tone-move { color: #91d7ff; }
        .action-log-entry.tone-attack { color: #ffb08a; }
        .action-log-entry.tone-summon { color: #f7d783; }
        .action-log-entry.tone-spell { color: #cbb7ff; }
        .action-log-entry.tone-mana { color: #78e6ba; }
        .action-log-entry.tone-system { color: #c3ced8; }

        .sidebar-footer-controls {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          padding: 8px;
          border: 1px solid rgba(200, 220, 238, 0.13);
          border-radius: 8px;
          background: rgba(6, 12, 20, 0.78);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.26);
          backdrop-filter: blur(10px);
          pointer-events: auto;
        }

        .action-btn {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s;
          font-size: 0.85rem;
          font-family: var(--font-sans);
        }
        .action-btn.end-turn {
          background: rgba(255, 255, 255, 0.04);
          color: var(--color-text-muted);
          border-color: rgba(255,255,255,0.08);
          cursor: not-allowed;
        }
        .action-btn.end-turn.active {
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
          border-color: #059669;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
        }
        .action-btn.end-turn.active:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.5);
        }

        .action-btn.surrender {
          background: rgba(239, 68, 68, 0.06);
          color: rgba(239, 68, 68, 0.7);
          border-color: rgba(239, 68, 68, 0.12);
          font-size: 0.78rem;
        }
        .action-btn.surrender:hover {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
        }

        /* ═══ BOTTOM BAR ═══ */
        .hud-bottom-bar {
          position: absolute;
          z-index: 31;
          left: 0;
          right: 0;
          bottom: 0;
          display: grid;
          grid-template-columns: 182px minmax(0, 1fr) 182px;
          gap: 24px;
          height: 298px;
          min-height: 298px;
          padding: 14px 26px 16px;
          border: 1px solid rgba(181, 219, 238, 0.12);
          border-radius: 14px 14px 0 0;
          align-items: end;
          background: linear-gradient(0deg, rgba(3, 9, 16, 0.98) 0%, rgba(5, 15, 24, 0.93) 56%, rgba(8, 20, 31, 0.42) 100%);
          box-shadow: 0 -12px 34px rgba(1, 7, 13, 0.28), inset 0 1px 0 rgba(223, 245, 255, 0.05);
          transition: filter 0.4s;
          isolation: isolate;
        }

        .hud-bottom-bar.ai-thinking-dim {
          filter: brightness(0.5) saturate(0.6);
          pointer-events: none;
        }

        /* AI Thinking overlay on hand */
        .ai-thinking-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          z-index: 50;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 10px;
          backdrop-filter: blur(4px);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-text-muted);
          letter-spacing: 0.1em;
        }
        .ai-spinner {
          width: 22px;
          height: 22px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: var(--color-arcano);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Player stats */
        .player-stats-panel {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-self: end;
          margin-bottom: 12px;
          padding: 13px;
          border: 1px solid rgba(104, 212, 255, 0.22);
          border-radius: 9px;
          background: linear-gradient(145deg, rgba(10, 28, 39, 0.92), rgba(5, 13, 22, 0.9));
          box-shadow: inset 0 1px 0 rgba(203, 243, 255, 0.06), 0 8px 18px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(12px);
        }
        .hp-bar-container {
          position: relative;
          width: 100%;
          height: 22px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 11px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hp-bar-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          background: linear-gradient(90deg, #047857, #059669, #10b981);
          border-radius: 11px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .hp-bar-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .hp-bar-label {
          position: relative;
          z-index: 5;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
        }
        .deck-graveyard-stats {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        /* ═══ HAND SCROLL ═══ */
        .player-hand-container {
          width: 100%;
          height: 100%;
          min-width: 0;
          overflow: visible;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          padding: 9px 14px 8px;
          border: 1px solid rgba(171, 217, 238, 0.16);
          border-radius: 12px 12px 8px 8px;
          background: linear-gradient(180deg, rgba(17, 39, 52, 0.78), rgba(5, 14, 23, 0.9));
          box-shadow: inset 0 1px 0 rgba(231, 250, 255, 0.05), 0 14px 28px rgba(0, 0, 0, 0.22);
          position: relative;
        }
        .player-hand-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 1px;
          background: rgba(139, 221, 255, 0.32);
          box-shadow: 0 0 13px rgba(139, 221, 255, 0.24);
        }
        .hand-stage-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 22px;
          padding: 0 6px 4px;
        }
        .hand-stage-title {
          color: #dff6ff;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }
        .hand-stage-count {
          padding: 3px 7px;
          border: 1px solid rgba(139, 221, 255, 0.18);
          border-radius: 5px;
          color: #89afc1;
          background: rgba(139, 221, 255, 0.06);
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .player-hand-scroll {
          display: flex;
          flex: 1;
          gap: 18px;
          overflow-x: auto;
          padding: 2px 14px 8px;
          align-items: flex-end;
          box-sizing: border-box;
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 221, 255, 0.35) transparent;
        }

        .player-hand-scroll .mode-hand {
          width: 172px;
          height: 246px;
        }

        .hand-card-wrapper {
          flex-shrink: 0;
          transform: translateY(var(--hand-offset)) rotate(var(--hand-rotation));
          transform-origin: center bottom;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      filter 0.3s;
          cursor: pointer;
          position: relative;
        }
        .hand-card-wrapper:hover {
          transform: translateY(-18px) rotate(0deg) scale(1.06);
          z-index: 100;
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
        }
        .hand-card-wrapper.is-playable:hover {
          filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.5))
                  drop-shadow(0 8px 20px rgba(0, 0, 0, 0.6));
        }
        .hand-card-wrapper.is-selected {
          transform: translateY(-22px) rotate(0deg) scale(1.06);
          z-index: 99;
        }

        .hand-card-wrapper:focus-visible {
          outline: 2px solid #8bddff;
          outline-offset: 5px;
          border-radius: 12px;
        }

        /* Full card inspection: keeps the playable board visible behind a calm reading surface. */
        .card-inspection-overlay {
          position: fixed;
          inset: 0;
          z-index: 220;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(3, 8, 14, 0.72);
          backdrop-filter: blur(14px) saturate(0.9);
          animation: fadeIn 0.18s ease-out;
        }

        .card-inspection-modal {
          position: relative;
          display: grid;
          grid-template-columns: minmax(260px, 340px) minmax(320px, 1fr);
          gap: 34px;
          width: min(820px, 92vw);
          max-height: min(690px, 88vh);
          padding: 34px;
          overflow: auto;
          border: 1px solid rgba(183, 224, 245, 0.28);
          border-radius: 16px;
          background: linear-gradient(145deg, rgba(16, 29, 42, 0.98), rgba(7, 14, 23, 0.98));
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.72), 0 0 34px rgba(97, 190, 232, 0.12);
          animation: cinematic-entrance 0.28s ease-out both;
        }

        .card-inspection-art {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }

        .card-inspection-art .mode-inspected {
          width: min(320px, 30vw);
          height: min(460px, 66vh);
        }

        .card-inspection-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 8px 10px 4px 0;
        }

        .card-inspection-kicker {
          color: #8bddff;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .card-inspection-details h2 {
          margin-top: 8px;
          color: #f8fbff;
          font-size: clamp(1.55rem, 3vw, 2.3rem);
          line-height: 1.05;
        }

        .card-inspection-type {
          margin-top: 8px;
          color: #9fb5c5;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .card-inspection-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 24px 0 22px;
        }

        .card-inspection-stats span {
          padding: 7px 10px;
          border: 1px solid rgba(139, 221, 255, 0.2);
          border-radius: 7px;
          background: rgba(139, 221, 255, 0.08);
          color: #d9f5ff;
          font-size: 0.74rem;
          font-weight: 700;
        }

        .card-inspection-section {
          padding: 16px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-inspection-section h3 {
          margin-bottom: 7px;
          color: #c5d7e4;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .card-inspection-section p {
          color: #eef6fb;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .card-inspection-flavor p {
          color: #aebfca;
          font-style: italic;
        }

        .card-inspection-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 8px 18px;
          margin-top: auto;
          padding-top: 18px;
          color: #718896;
          font-size: 0.68rem;
        }

        .card-inspection-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #e6f4fb;
          cursor: pointer;
          font-weight: 800;
        }

        .card-inspection-close:hover {
          background: rgba(255, 255, 255, 0.18);
        }

        /* ═══ PLAYER MANA PANEL (RIGHT) ═══ */
        .player-mana-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-self: end;
          margin-bottom: 12px;
          padding: 13px;
          border: 1px solid rgba(200, 220, 238, 0.18);
          border-radius: 9px;
          background: linear-gradient(145deg, rgba(16, 25, 40, 0.92), rgba(6, 12, 22, 0.9));
          box-shadow: inset 0 1px 0 rgba(236, 246, 255, 0.05), 0 8px 18px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(12px);
        }
        .mana-orb-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mana-orb-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mana-orb-icon {
          font-size: 0.72rem;
          font-weight: 700;
        }
        .arcano-text { color: var(--color-arcano); }
        .furia-text { color: var(--color-furia); }
        .mana-orb-count {
          font-size: 0.78rem;
          font-weight: 800;
          color: #fff;
          font-family: var(--font-display);
        }

        /* ═══ GAME OVER CINEMATIC ═══ */
        .game-over-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          animation: fadeIn 0.5s ease-out;
        }
        .game-over-box {
          width: 440px;
          padding: 50px 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          animation: cinematic-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .game-over-box.victory {
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 40px rgba(16, 185, 129, 0.15);
        }
        .game-over-box.defeat {
          border-color: rgba(239, 68, 68, 0.3);
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.15);
        }
        .game-over-icon {
          font-size: 4rem;
          animation: pulse-dot 2s infinite;
        }
        .victory-title {
          font-size: 2.5rem;
          color: var(--color-success);
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
          font-family: var(--font-display);
        }
        .defeat-title {
          font-size: 2.5rem;
          color: var(--color-danger);
          text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
          font-family: var(--font-display);
        }
        .game-over-desc {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .game-over-buttons {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }
        .game-over-btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s;
          font-family: var(--font-sans);
          font-size: 0.9rem;
        }
        .game-over-btn.primary {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          box-shadow: 0 4px 16px rgba(79, 70, 229, 0.4);
        }
        .game-over-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(79, 70, 229, 0.6);
        }
        .game-over-btn.secondary {
          background: rgba(255,255,255,0.05);
          color: white;
          border-color: rgba(255,255,255,0.12);
        }
        .game-over-btn.secondary:hover {
          background: rgba(255,255,255,0.12);
        }

        .animated-fade {
          animation: fadeIn 0.2s ease-out;
        }

        @media (max-width: 900px) {
          .game-hud {
            padding: 4px;
            gap: 4px;
          }

          .hud-top-bar {
            height: 46px;
            min-height: 46px;
            padding: 5px 9px;
          }

          .opponent-info-compact .resource-badge,
          .opponent-mana-compact {
            display: none;
          }

          .game-center-board {
            position: relative;
            gap: 0;
          }

          .board-canvas-area {
            width: 100%;
          }

          .hud-sidebar {
            position: absolute;
            top: 8px;
            right: 8px;
            bottom: auto;
            z-index: 20;
            width: 142px;
            min-width: 0;
            padding: 0;
            border: 0;
            background: transparent;
            box-shadow: none;
          }

          .hud-sidebar .sidebar-title,
          .hud-sidebar .inspector-content,
          .hud-sidebar .action-log {
            display: none;
          }

          .sidebar-footer-controls {
            width: 142px;
            margin: 0;
            padding: 5px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 7px;
            background: rgba(5, 9, 16, 0.76);
            backdrop-filter: blur(8px);
          }

          .sidebar-footer-controls .action-btn {
            padding: 7px 5px;
            font-size: 0.68rem;
          }

          .hud-bottom-bar {
            grid-template-columns: 108px minmax(0, 1fr) 86px;
            height: 188px;
            min-height: 188px;
            gap: 6px;
            padding: 7px;
          }

          .player-hand-scroll {
            justify-content: flex-start;
            padding-inline: 4px;
          }

          .player-hand-scroll .mode-hand {
            width: 116px;
            height: 166px;
          }

          .card-inspection-overlay {
            padding: 16px;
          }

          .card-inspection-modal {
            grid-template-columns: minmax(180px, 230px) minmax(0, 1fr);
            gap: 20px;
            padding: 24px;
          }

          .card-inspection-art .mode-inspected {
            width: 220px;
            height: 316px;
          }

          .card-inspection-section p {
            font-size: 0.84rem;
          }
        }

        @media (max-width: 540px) {
          .commander-tag {
            font-size: 0.66rem;
          }

          .nexo-health-bar-mini {
            width: 82px;
          }

          .phase-tag {
            font-size: 0.57rem;
            padding-inline: 5px;
          }

          .hud-bottom-bar {
            grid-template-columns: 74px minmax(0, 1fr) 64px;
            height: 176px;
            min-height: 176px;
            gap: 4px;
            padding: 5px;
          }

          .player-stats-panel,
          .player-mana-panel {
            gap: 5px;
          }

          .player-stats-panel .commander-tag {
            font-size: 0.58rem;
          }

          .deck-graveyard-stats,
          .mana-orb-icon,
          .mana-orb-count {
            font-size: 0.6rem;
          }

          .mana-orb {
            width: 7px;
            height: 7px;
          }

          .action-btn.surrender {
            display: none;
          }

          .card-inspection-modal {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 22px 18px 18px;
          }

          .card-inspection-art .mode-inspected {
            width: 190px;
            height: 274px;
          }

          .card-inspection-details {
            padding: 0;
          }

          .card-inspection-stats {
            margin: 14px 0 8px;
          }
        }
      `})]})};export{_ as GameHUD};