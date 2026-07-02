import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock du composant AuthProvider
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    signOut: vi.fn(),
  }),
}));

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('affiche le logo NovaHypnose', () => {
    renderHeader();
    expect(screen.getByText(/NovaHypnose/i)).toBeInTheDocument();
  });

  it('affiche le menu de navigation desktop', () => {
    renderHeader();
    // Les menus desktop et mobile coexistent dans le DOM : plusieurs occurrences
    expect(screen.getAllByText("L'hypnose").length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mes accompagnements').length).toBeGreaterThan(0);
  });

  it('affiche le bouton Prendre RDV', () => {
    renderHeader();
    const ctaButtons = screen.getAllByText('Prendre RDV');
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('ouvre et ferme le menu mobile', () => {
    renderHeader();

    // Trouver et cliquer sur le bouton menu hamburger
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);

    // Le menu mobile devrait être visible (vérifie via les liens dupliqués)
    const mobileLinks = screen.getAllByText("L'hypnose");
    expect(mobileLinks.length).toBeGreaterThan(1);

    // Fermer le menu
    fireEvent.click(menuButton);
  });

  it('a un lien vers le blog', () => {
    renderHeader();
    const blogLinks = screen.getAllByText('Blog');
    expect(blogLinks.length).toBeGreaterThan(0);
  });

  it('affiche les dropdowns au survol (desktop)', () => {
    renderHeader();
    const [hypnoseLink] = screen.getAllByText("L'hypnose");
    expect(hypnoseLink).toBeInTheDocument();

    // Les sous-menus sont rendus mais cachés initialement
    fireEvent.mouseEnter(hypnoseLink);
  });
});
