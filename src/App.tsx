import { Component, lazy, Suspense, useEffect, useState, type ErrorInfo, type ReactNode } from 'react';
import { BookOpenCheck } from 'lucide-react';
import { DECK_CATALOG, type DeckDefinition } from './core/deckCatalog';

const Gallery = lazy(async () => {
  const module = await import('./components/Gallery');
  return { default: module.Gallery };
});

const DeckViewer = lazy(async () => {
  const module = await import('./components/DeckViewer');
  return { default: module.DeckViewer };
});

const OnlineLobby = lazy(async () => {
  const module = await import('./components/OnlineLobby');
  return { default: module.OnlineLobby };
});

const loadGameHUD = () => import('./components/GameHUD');
const loadGameStore = () => import('./store/gameStore');

const GameHUD = lazy(async () => {
  const module = await loadGameHUD();
  return { default: module.GameHUD };
});

type ViewMode = 'menu' | 'faction-select' | 'online-lobby' | 'game' | 'gallery' | 'deck-viewer';

const FACTION_COPY: Record<DeckDefinition['faction'], {
  title: string;
  icon: string;
  lore: string;
  traits: string[];
}> = {
  Furia: {
    title: 'FURIA',
    icon: 'F',
    lore: 'Presion, fuego y criaturas que obligan al rival a responder desde el primer turno.',
    traits: ['Agresivo', 'Dano directo'],
  },
  Arcano: {
    title: 'ARCANO',
    icon: 'A',
    lore: 'Hielo, robo de cartas y control del ritmo para convertir cada turno en una ventaja.',
    traits: ['Control', 'Hechizos'],
  },
  Naturaleza: {
    title: 'NATURALEZA',
    icon: 'N',
    lore: 'Bestias, curacion y crecimiento constante para dominar el tablero con presencia viva.',
    traits: ['Bestias', 'Curacion'],
  },
  Orden: {
    title: 'ORDEN',
    icon: 'O',
    lore: 'Defensa, vuelo y luz sagrada para jugar limpio, resistente y muy tactico.',
    traits: ['Defensa', 'Vuelo'],
  },
  Sombra: {
    title: 'SOMBRA',
    icon: 'S',
    lore: 'No-muertos, vampiros y desgaste para ganar a traves de presion silenciosa.',
    traits: ['Desgaste', 'Siniestro'],
  },
  Vacio: {
    title: 'VACIO',
    icon: 'V',
    lore: 'Horrores cosmicos, aniquilacion y amenazas lentas que cambian la partida.',
    traits: ['Cosmico', 'Late game'],
  },
};

const FACTIONS = ['Furia', 'Arcano', 'Naturaleza', 'Orden', 'Sombra', 'Vacio'] as const;

class ViewErrorBoundary extends Component<
  { children: ReactNode; onExit: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ViewErrorBoundary captured an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="view-error-state" role="alert">
          <strong>No se ha podido abrir esta vista.</strong>
          <span>La partida no se ha modificado. Puedes volver al menu o recargar la aplicacion.</span>
          <div className="view-error-actions">
            <button type="button" onClick={this.props.onExit}>Volver al menu</button>
            <button type="button" onClick={() => window.location.reload()}>Recargar</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/** Generates floating particle elements for the menu background */
const MenuParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 14,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [view, setView] = useState<ViewMode>('menu');
  const [tutorialMode, setTutorialMode] = useState(false);
  const [viewRecoveryVersion, setViewRecoveryVersion] = useState(0);
  const navigateTo = (target: ViewMode) => {
    setView(target);
  };

  useEffect(() => {
    const invitedRoomCode = new URLSearchParams(window.location.search).get('sala');
    if (invitedRoomCode) {
      void loadGameHUD();
      setView('online-lobby');
      return;
    }

    let cancelled = false;
    void loadGameStore().then(async ({ useGameStore }) => {
      const resumed = await useGameStore.getState().resumeOnlineGame();
      if (!resumed || cancelled) return;
      void loadGameHUD();
      const status = useGameStore.getState().onlineSession?.status;
      setView(status === 'waiting' ? 'online-lobby' : 'game');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectDeck = async (deck: DeckDefinition) => {
    const [, { useGameStore }] = await Promise.all([loadGameHUD(), loadGameStore()]);
    useGameStore.getState().startNewGame(deck.commanderFaction, deck.id);
    setTutorialMode(false);
    navigateTo('game');
  };

  const handleStartTutorial = async () => {
    const [, { useGameStore }] = await Promise.all([loadGameHUD(), loadGameStore()]);
    useGameStore.getState().startNewGame('FURIA', 'FURIA_EMBESTIDA');
    setTutorialMode(true);
    navigateTo('game');
  };

  const handleStartGameFlow = () => {
    void Promise.all([loadGameHUD(), loadGameStore()]);
    navigateTo('faction-select');
  };

  const handleOnlineGameFlow = () => {
    void Promise.all([loadGameHUD(), loadGameStore()]);
    setTutorialMode(false);
    navigateTo('online-lobby');
  };

  const handleViewRecovery = () => {
    setView('menu');
    setViewRecoveryVersion((current) => current + 1);
  };

  return (
    <div className="app-container fade-in">
      {view === 'menu' && (
        <div className="main-menu-container">
          <MenuParticles />

          <div className="menu-header">
            <h1 className="game-title-logo">CRÓNICAS DEL NEXO</h1>
            <div className="title-underline" />
            <p className="game-tagline">Vertical Slice • Combate Táctico de Cartas en 3D</p>
          </div>

          <div className="menu-actions glass-panel">
            <button className="menu-btn online" onClick={handleOnlineGameFlow}>
              Jugar con un amigo
            </button>
            <button className="menu-btn primary" onClick={handleStartGameFlow}>
              ⚔️ Jugar contra la IA
            </button>
            <button className="menu-btn tutorial" onClick={handleStartTutorial}>
              <BookOpenCheck size={18} aria-hidden="true" /> Tutorial jugable
            </button>
            <button className="menu-btn secondary" onClick={() => navigateTo('gallery')}>
              🎴 Colección de Cartas
            </button>
            <button className="menu-btn secondary" onClick={() => navigateTo('deck-viewer')}>
              📁 Visor de Mazos
            </button>
          </div>

          <div className="menu-credits">
            Ideado y creado por Bernardo Losada
          </div>
        </div>
      )}

      {view === 'faction-select' && (
        <div className="faction-select-container">
          <MenuParticles />

          <h2 className="faction-heading">Elige tu Facción y Mazo</h2>
          <p className="select-desc">Selecciona uno de los mazos temáticos de 50 cartas para iniciar la batalla</p>

          <div className="factions-grid">
            {FACTIONS.map((faction) => {
              const copy = FACTION_COPY[faction];
              const decks = DECK_CATALOG.filter((deck) => deck.faction === faction);

              return (
                <div key={faction} className={`faction-card ${decks[0]?.tone ?? 'arcano'} glass-panel`}>
                  <div className={`faction-art-preview ${decks[0]?.tone ?? 'arcano'}-art`}>
                    <div className="faction-art-icon">{copy.icon}</div>
                  </div>
                  <h3>{copy.title}</h3>
                  <p className="faction-commander-title">2 mazos disponibles</p>
                  <div className="faction-lore">{copy.lore}</div>
                  <div className="faction-traits">
                    {copy.traits.map((trait) => <span key={trait} className="trait">{trait}</span>)}
                  </div>

                  <div className="deck-choices-list">
                    {decks.map((deck) => (
                      <button type="button" key={deck.id} className="deck-choice-item" onClick={() => handleSelectDeck(deck)}>
                        <h4>{deck.name}</h4>
                        <p>{deck.archetype} / {deck.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button className="back-menu-btn" onClick={() => navigateTo('menu')}>
            ← Volver al Menú
          </button>
        </div>
      )}

      <ViewErrorBoundary key={viewRecoveryVersion} onExit={handleViewRecovery}>
        <Suspense fallback={<div className="view-loading-indicator" aria-label="Cargando vista" />}>
          {view === 'game' && (
            <GameHUD
              tutorialMode={tutorialMode}
              onQuit={() => {
                setTutorialMode(false);
                navigateTo('menu');
              }}
            />
          )}
          {view === 'online-lobby' && (
            <OnlineLobby
              initialRoomCode={new URLSearchParams(window.location.search).get('sala') ?? ''}
              onEnterGame={() => navigateTo('game')}
              onBack={() => navigateTo('menu')}
            />
          )}
          {view === 'gallery' && <Gallery onBack={() => navigateTo('menu')} />}
          {view === 'deck-viewer' && <DeckViewer onBack={() => navigateTo('menu')} />}
        </Suspense>
      </ViewErrorBoundary>

      <style>{`
        .app-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #030407;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .view-loading-indicator {
          width: 34px;
          height: 34px;
          border: 3px solid rgba(151, 183, 214, 0.18);
          border-top-color: #78cfff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .view-error-state {
          width: min(440px, calc(100vw - 40px));
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: #eef6ff;
          background: rgba(10, 17, 26, 0.94);
          border: 1px solid rgba(137, 205, 238, 0.35);
          border-radius: 8px;
          box-shadow: 0 22px 64px rgba(0, 0, 0, 0.48);
          text-align: center;
        }
        .view-error-state span { color: #b9c9d5; font-size: 0.85rem; line-height: 1.45; }
        .view-error-actions { display: flex; justify-content: center; gap: 9px; margin-top: 5px; }
        .view-error-actions button {
          padding: 8px 12px;
          border: 1px solid rgba(126, 211, 255, 0.45);
          border-radius: 6px;
          color: #effaff;
          background: #176887;
          cursor: pointer;
        }

        /* Page transitions */
        .fade-in {
          animation: pageIn 0.4s ease-out;
        }
        .fade-out {
          animation: pageOut 0.3s ease-in forwards;
        }
        @keyframes pageIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pageOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        /* Floating particles */
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .floating-particle {
          position: absolute;
          bottom: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.6), rgba(99, 102, 241, 0.1));
          animation: float linear infinite;
          pointer-events: none;
        }

        /* Main Menu style */
        .main-menu-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, #151a2d 0%, #0a0d17 40%, #030407 100%);
          z-index: 10;
          position: relative;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
          animation: slide-up 0.6s ease-out;
        }

        .game-title-logo {
          font-size: 4rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 40%, #6366f1 70%, #4f46e5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: var(--font-display);
          animation: title-glow 3s ease-in-out infinite;
          position: relative;
        }

        .title-underline {
          width: 120px;
          height: 2px;
          margin: 12px auto 0;
          background: linear-gradient(90deg, transparent, #6366f1, transparent);
          border-radius: 1px;
        }

        .game-tagline {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          margin-top: 14px;
          letter-spacing: 0.05em;
        }

        .menu-actions {
          width: 340px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
          position: relative;
          z-index: 1;
          animation: slide-up 0.8s ease-out;
        }

        .menu-btn {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .menu-btn.tutorial {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #e8f8ff;
          border-color: rgba(116, 210, 235, 0.34);
          background: rgba(20, 58, 76, 0.64);
        }
        .menu-btn.tutorial:hover {
          border-color: rgba(139, 226, 248, 0.72);
          background: rgba(25, 78, 98, 0.78);
          transform: translateY(-2px);
        }

        .menu-btn.primary {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          border-color: #6366f1;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
        }
        .menu-btn.primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(79, 70, 229, 0.6);
        }

        .menu-btn.online {
          color: #e4fbff;
          border-color: rgba(103, 216, 255, 0.52);
          background: linear-gradient(135deg, rgba(17, 127, 162, 0.94), rgba(25, 72, 139, 0.94));
          box-shadow: 0 4px 15px rgba(45, 174, 224, 0.22);
        }
        .menu-btn.online:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(157, 237, 255, 0.9);
          box-shadow: 0 8px 28px rgba(45, 174, 224, 0.38);
        }

        .menu-btn.secondary {
          background: rgba(255, 255, 255, 0.03);
          color: white;
          border-color: rgba(255, 255, 255, 0.08);
        }
        .menu-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
        }

        .menu-credits {
          position: absolute;
          bottom: 24px;
          font-size: 0.78rem;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
          z-index: 1;
        }

        /* Faction Selector */
        .faction-select-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, #0f121d 0%, #080a12 40%, #030407 100%);
          padding: 40px;
          position: relative;
        }

        .faction-heading {
          font-size: 2.5rem;
          color: white;
          margin-bottom: 8px;
          animation: slide-up 0.5s ease-out;
        }

        .select-desc {
          color: var(--color-text-muted);
          margin-bottom: 40px;
          text-align: center;
          max-width: 600px;
          animation: slide-up 0.6s ease-out;
        }

         .factions-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          max-width: 1360px;
          width: 100%;
          margin-bottom: 40px;
          z-index: 1;
          animation: slide-up 0.7s ease-out;
        }

        .faction-card {
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        
        .faction-card.furia:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 15px 40px rgba(255, 62, 62, 0.25);
          border-color: var(--color-furia);
        }

        .faction-card.arcano:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0, 217, 255, 0.25);
          border-color: var(--color-arcano);
        }

        .faction-card.naturaleza:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 15px 40px rgba(76, 211, 139, 0.22);
          border-color: #56d68f;
        }

        .faction-card.orden:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 15px 40px rgba(232, 196, 108, 0.22);
          border-color: #e8c46c;
        }

        .faction-card.sombra:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 15px 40px rgba(139, 92, 246, 0.25);
          border-color: #8b5cf6;
        }

        .faction-card.vacio:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 15px 40px rgba(196, 125, 255, 0.25);
          border-color: #c47dff;
        }

        .trait.hybrid-tag {
          background: rgba(139, 92, 246, 0.1);
          color: #a78bfa;
          border-color: rgba(139, 92, 246, 0.25);
        }

        .faction-art-preview.hybrid-art {
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
        }

        /* Faction art preview area */
        .faction-art-preview {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          position: relative;
        }
        .furia-art {
          background: radial-gradient(circle, rgba(255, 62, 62, 0.2), rgba(255, 62, 62, 0.05));
          border: 2px solid rgba(255, 62, 62, 0.3);
          box-shadow: 0 0 20px rgba(255, 62, 62, 0.15);
        }
        .arcano-art {
          background: radial-gradient(circle, rgba(0, 217, 255, 0.2), rgba(0, 217, 255, 0.05));
          border: 2px solid rgba(0, 217, 255, 0.3);
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.15);
        }
        .naturaleza-art {
          background: radial-gradient(circle, rgba(86, 214, 143, 0.22), rgba(86, 214, 143, 0.05));
          border: 2px solid rgba(86, 214, 143, 0.32);
          box-shadow: 0 0 20px rgba(86, 214, 143, 0.14);
        }
        .orden-art {
          background: radial-gradient(circle, rgba(232, 196, 108, 0.22), rgba(232, 196, 108, 0.05));
          border: 2px solid rgba(232, 196, 108, 0.32);
          box-shadow: 0 0 20px rgba(232, 196, 108, 0.14);
        }
        .sombra-art {
          background: radial-gradient(circle, rgba(139, 92, 246, 0.22), rgba(139, 92, 246, 0.05));
          border: 2px solid rgba(139, 92, 246, 0.32);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.14);
        }
        .vacio-art {
          background: radial-gradient(circle, rgba(196, 125, 255, 0.24), rgba(196, 125, 255, 0.05));
          border: 2px solid rgba(196, 125, 255, 0.34);
          box-shadow: 0 0 20px rgba(196, 125, 255, 0.15);
        }
        .faction-art-icon {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 0;
        }

        .faction-card h3 {
          font-size: 2rem;
          margin-bottom: 6px;
        }

        .faction-card.furia h3 { color: var(--color-furia); }
        .faction-card.arcano h3 { color: var(--color-arcano); }
        .faction-card.naturaleza h3 { color: #64e39a; }
        .faction-card.orden h3 { color: #e8c46c; }
        .faction-card.sombra h3 { color: #b99cff; }
        .faction-card.vacio h3 { color: #d5a0ff; }

        .faction-commander-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }

        .faction-lore {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #d1d5db;
          margin-bottom: 16px;
          flex: 1;
        }

        .faction-traits {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .trait {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-muted);
        }

        .play-select-btn {
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: bold;
          font-family: var(--font-sans);
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.25s;
          font-size: 0.95rem;
        }

        .play-select-btn.furia {
          background: var(--color-furia-bg);
          color: white;
          border-color: var(--color-furia);
        }
        .play-select-btn.furia:hover {
          background: var(--color-furia);
          box-shadow: 0 0 15px var(--color-furia-glow);
        }

        .play-select-btn.arcano {
          background: var(--color-arcano-bg);
          color: white;
          border-color: var(--color-arcano);
        }
        .play-select-btn.arcano:hover {
          background: var(--color-arcano);
          box-shadow: 0 0 15px var(--color-arcano-glow);
        }

        .deck-choices-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          margin-top: 10px;
          z-index: 5;
          max-height: 240px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .deck-choice-item {
          width: 100%;
          font: inherit;
          color: inherit;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 10px 14px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .furia .deck-choice-item:hover {
          background: rgba(255, 62, 62, 0.08);
          border-color: rgba(255, 62, 62, 0.3);
          transform: scale(1.02);
        }

        .arcano .deck-choice-item:hover {
          background: rgba(0, 217, 255, 0.08);
          border-color: rgba(0, 217, 255, 0.3);
          transform: scale(1.02);
        }

        .deck-choice-item h4 {
          font-size: 0.88rem;
          margin: 0;
          color: #fff;
        }

        .deck-choice-item p {
          font-size: 0.7rem;
          margin: 0;
          color: var(--color-text-muted);
          line-height: 1.35;
        }

        .back-menu-btn {
          background: transparent;
          border: none;
          color: var(--color-text-muted);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 1;
        }
        .back-menu-btn:hover {
          color: white;
          transform: translateX(-4px);
        }

        @media (max-width: 1100px) {
          .app-container,
          .main-menu-container,
          .faction-select-container {
            min-height: 100dvh;
            height: 100dvh;
          }

          .main-menu-container {
            justify-content: center;
            overflow-y: auto;
            padding:
              calc(24px + env(safe-area-inset-top))
              max(20px, env(safe-area-inset-right))
              calc(54px + env(safe-area-inset-bottom))
              max(20px, env(safe-area-inset-left));
          }

          .menu-header {
            margin-bottom: 28px;
          }

          .game-title-logo {
            font-size: 3rem;
            letter-spacing: 0;
            line-height: 1.02;
          }

          .menu-actions {
            width: min(360px, 100%);
            padding: 22px;
          }

          .menu-btn {
            min-height: 48px;
          }

          .menu-credits {
            bottom: calc(16px + env(safe-area-inset-bottom));
            padding-inline: 16px;
            text-align: center;
          }

          .faction-select-container {
            justify-content: flex-start;
            overflow-y: auto;
            padding:
              calc(28px + env(safe-area-inset-top))
              max(22px, env(safe-area-inset-right))
              calc(84px + env(safe-area-inset-bottom))
              max(22px, env(safe-area-inset-left));
          }

          .faction-heading {
            font-size: 2rem;
            text-align: center;
          }

          .select-desc {
            margin-bottom: 24px;
          }

          .factions-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: start;
            gap: 18px;
            max-width: 900px;
            margin-bottom: 0;
          }

          .faction-card {
            min-width: 0;
            padding: 22px 18px;
            cursor: default;
          }

          .faction-card.hybrid {
            grid-column: 1 / -1;
          }

          .faction-card:hover,
          .faction-card.furia:hover,
          .faction-card.arcano:hover,
          .faction-card.hybrid:hover {
            transform: none;
          }

          .deck-choices-list {
            max-height: none;
            overflow: visible;
          }

          .deck-choice-item {
            min-height: 58px;
            padding: 12px 14px;
          }

          .back-menu-btn {
            position: fixed;
            z-index: 20;
            left: max(16px, env(safe-area-inset-left));
            bottom: calc(14px + env(safe-area-inset-bottom));
            min-height: 44px;
            padding: 0 14px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 8px;
            color: #d7e4ec;
            background: rgba(5, 10, 18, 0.9);
            backdrop-filter: blur(12px);
          }
        }

        @media (max-width: 680px) {
          .main-menu-container {
            justify-content: flex-start;
          }

          .menu-header {
            width: 100%;
            margin-top: auto;
            margin-bottom: 24px;
          }

          .game-title-logo {
            max-width: 100%;
            font-size: 2.55rem;
            line-height: 1.03;
            overflow-wrap: anywhere;
          }

          .game-tagline {
            font-size: 0.88rem;
            line-height: 1.45;
            letter-spacing: 0;
          }

          .menu-actions {
            margin-bottom: auto;
            padding: 18px;
            gap: 12px;
          }

          .faction-select-container {
            padding-inline: max(14px, env(safe-area-inset-left));
          }

          .faction-heading {
            font-size: 1.65rem;
          }

          .select-desc {
            font-size: 0.84rem;
            line-height: 1.45;
          }

          .factions-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 14px;
          }

          .faction-card.hybrid {
            grid-column: auto;
          }

          .faction-card {
            width: 100%;
            padding: 18px 16px;
          }

          .faction-art-preview {
            width: 64px;
            height: 64px;
            margin-bottom: 10px;
          }

          .faction-art-icon {
            font-size: 2rem;
          }

          .faction-card h3 {
            font-size: 1.55rem;
          }

          .faction-lore {
            flex: none;
            font-size: 0.84rem;
          }

          .faction-traits {
            margin-bottom: 10px;
          }
        }

        @media (max-height: 620px) and (orientation: landscape) {
          .main-menu-container {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 340px;
            gap: 28px;
            padding-block: 18px;
          }

          .menu-header {
            margin: 0;
          }

          .game-title-logo {
            font-size: 2.4rem;
          }

          .menu-actions {
            margin: 0;
            padding: 16px;
          }

          .menu-credits {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
