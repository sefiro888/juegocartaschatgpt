import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const startNewGame = vi.fn();
let galleryShouldFail = false;

vi.mock('./store/gameStore', () => ({
  useGameStore: {
    getState: () => ({
      onlineSession: null,
      resumeOnlineGame: vi.fn().mockResolvedValue(false),
      startNewGame,
    }),
  },
}));

vi.mock('./components/GameHUD', () => ({
  GameHUD: () => <div data-testid="game-view">Partida preparada</div>,
}));

vi.mock('./components/Gallery', () => ({
  Gallery: ({ onBack }: { onBack: () => void }) => {
    if (galleryShouldFail) throw new Error('Gallery smoke failure');
    return <button onClick={onBack}>Galeria preparada</button>;
  },
}));

vi.mock('./components/DeckViewer', () => ({
  DeckViewer: ({ onBack }: { onBack: () => void }) => (
    <button onClick={onBack}>Visor preparado</button>
  ),
}));

vi.mock('./components/OnlineLobby', () => ({
  OnlineLobby: () => <div data-testid="online-lobby">Sala online preparada</div>,
}));

describe('main application smoke flows', () => {
  beforeEach(() => {
    galleryShouldFail = false;
    startNewGame.mockClear();
    window.history.replaceState({}, '', '/');
  });

  it('opens the collection and returns to the menu', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /colecci/i }));
    const backButton = await screen.findByRole('button', { name: 'Galeria preparada' });
    await user.click(backButton);

    expect(screen.getByText('Ideado y creado por Bernardo Losada')).toBeInTheDocument();
  });

  it('opens the deck viewer without loading the 3D board', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /visor de mazos/i }));

    expect(await screen.findByRole('button', { name: 'Visor preparado' })).toBeInTheDocument();
    expect(screen.queryByTestId('game-view')).not.toBeInTheDocument();
  });

  it('selects a deck and enters the game view', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /jugar contra la ia/i }));
    const deckButtons = await screen.findAllByRole('button', { name: /brasas|caldera/i });
    await user.click(deckButtons[0]);

    expect(startNewGame).toHaveBeenCalledOnce();
    expect(await screen.findByTestId('game-view')).toBeInTheDocument();
  });

  it('contains a failed lazy view and lets the player recover to the menu', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    galleryShouldFail = true;
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /colecci/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('No se ha podido abrir esta vista');

    await user.click(screen.getByRole('button', { name: /volver al menu/i }));
    expect(screen.getByText('Ideado y creado por Bernardo Losada')).toBeInTheDocument();
    consoleError.mockRestore();
  });
});
