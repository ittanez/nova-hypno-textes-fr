import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from '../Contact';

// Mock du composant LazyCommuteMap qui charge Google Maps
vi.mock('../LazyCommuteMap', () => ({
  default: () => <div data-testid="mock-map">Map</div>
}));

describe('Contact Component', () => {
  it('affiche le titre de la section contact', () => {
    render(<Contact />);
    expect(screen.getByText(/Informations de contact/i)).toBeInTheDocument();
  });

  it('affiche le numéro de téléphone', () => {
    render(<Contact />);
    expect(screen.getByText(/06 49 35 80 89/i)).toBeInTheDocument();
  });

  it('affiche l\'email de contact', () => {
    render(<Contact />);
    expect(screen.getByText(/contact@novahypnose\.fr/i)).toBeInTheDocument();
  });

  it('affiche l\'adresse du cabinet', () => {
    render(<Contact />);
    // Vérifie que l'adresse complète est affichée (peut apparaître plusieurs fois)
    const rueElements = screen.getAllByText(/16 rue Saint-Antoine/i);
    const parisElements = screen.getAllByText(/75004 Paris/i);

    expect(rueElements.length).toBeGreaterThan(0);
    expect(parisElements.length).toBeGreaterThan(0);
  });

  it('a des liens cliquables pour téléphone et email', () => {
    render(<Contact />);

    // Lien téléphone
    const phoneLink = screen.getByRole('link', { name: /06 49 35 80 89/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:0649358089');

    // Lien email
    const emailLink = screen.getByRole('link', { name: /contact@novahypnose\.fr/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@novahypnose.fr');
  });

  it('affiche les icônes de contact', () => {
    render(<Contact />);

    // Vérifie que les éléments de contact sont présents (peuvent apparaître plusieurs fois)
    const telElements = screen.getAllByText(/Téléphone/i);
    const emailElements = screen.getAllByText(/Email/i);
    const adresseElements = screen.getAllByText(/Adresse/i);

    expect(telElements.length).toBeGreaterThan(0);
    expect(emailElements.length).toBeGreaterThan(0);
    expect(adresseElements.length).toBeGreaterThan(0);
  });

  it('a un bouton pour réserver une séance', () => {
    render(<Contact />);

    // Cherche un bouton ou lien "Réserver ma séance en ligne"
    const ctaElements = screen.getAllByText(/Réserver ma séance en ligne/i);
    expect(ctaElements.length).toBeGreaterThan(0);
  });

  it('affiche une image du cabinet', () => {
    render(<Contact />);

    // Vérifie qu'il y a une image avec un alt approprié
    const images = screen.getAllByRole('img');
    const cabinetImage = images.find(img =>
      img.getAttribute('alt')?.toLowerCase().includes('cabinet')
    );
    expect(cabinetImage).toBeInTheDocument();
  });
});
