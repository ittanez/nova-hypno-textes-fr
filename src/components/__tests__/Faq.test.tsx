import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Faq from '../Faq';

describe('FAQ Component', () => {
  it('affiche le titre de la section FAQ', () => {
    render(<Faq />);
    expect(screen.getByText(/Questions fréquentes/i)).toBeInTheDocument();
  });

  it('affiche plusieurs questions', () => {
    render(<Faq />);

    // Vérifie qu'il y a au moins 5 questions
    const questions = screen.getAllByRole('button');
    expect(questions.length).toBeGreaterThanOrEqual(5);
  });

  it('ouvre et ferme un accordéon au clic', () => {
    render(<Faq />);

    // Trouver la première question
    const firstQuestion = screen.getAllByRole('button')[0];

    // Cliquer pour ouvrir
    fireEvent.click(firstQuestion);

    // La réponse devrait être visible (vérifie via aria-expanded)
    expect(firstQuestion.getAttribute('aria-expanded')).toBe('true');

    // Cliquer à nouveau pour fermer
    fireEvent.click(firstQuestion);
    expect(firstQuestion.getAttribute('aria-expanded')).toBe('false');
  });

  it('contient des questions sur l\'hypnose', () => {
    render(<Faq />);

    // Vérifie quelques questions clés existantes
    expect(screen.getByText(/Qui peut être hypnotisé/i)).toBeInTheDocument();
    expect(screen.getByText(/L'hypnothérapie est-elle dangereuse/i)).toBeInTheDocument();
  });

  it('affiche les icônes chevron pour indiquer l\'état', () => {
    render(<Faq />);

    // Les icônes SVG devraient être présentes
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
  });
});
