import { describe, expect, it } from 'vitest';
import {
  QUESTIONS,
  buildDecryptage,
  computeRepere,
  computeSignaux,
  isValidAnswers,
  labelFor,
  type DecryptageAnswers,
} from '@/data/decryptage';

const base: DecryptageAnswers = { q1: 'anxiete', q2: 'leger', q3: 'vivre_avec', q4: 'peur_echec', q5: 'vite' };

describe('décryptage : contenu', () => {
  it('a un texte pour chaque combinaison de réponses', () => {
    for (const q1 of QUESTIONS[0].options)
      for (const q2 of QUESTIONS[1].options)
        for (const q3 of QUESTIONS[2].options)
          for (const q4 of QUESTIONS[3].options) {
            const d = buildDecryptage(
              { q1: q1.value, q2: q2.value, q3: q3.value, q4: q4.value, q5: 'vite' } as DecryptageAnswers,
              'Claire',
              'mes migraines',
            );
            expect(d.blocA.length).toBeGreaterThan(80);
            expect(d.blocB.length).toBeGreaterThan(40);
            expect(d.blocC.length).toBeGreaterThan(40);
          }
  });

  it('personnalise le titre avec le prénom', () => {
    expect(buildDecryptage(base, '  Claire ').titre).toBe('Ce qui ressort de vos réponses, Claire');
    expect(buildDecryptage(base, '').titre).toBe('Ce qui ressort de vos réponses');
  });

  it('cite le texte libre pour « Autre chose », tronqué à 120 caractères', () => {
    const a = { ...base, q1: 'autre' as const };
    expect(buildDecryptage(a, 'Claire', 'mes migraines').blocA).toContain('« mes migraines »');
    expect(buildDecryptage(a, 'Claire', 'x'.repeat(300)).blocA).toContain('x'.repeat(120) + ' »');
    expect(buildDecryptage(a, 'Claire', '').blocA).toContain("quelque chose d'autre");
  });

  it('encadre le bloc C seulement pour « j’attends une solution »', () => {
    expect(buildDecryptage(base, 'C').blocCEncadre).toBe(false);
    expect(buildDecryptage({ ...base, q4: 'solution' }, 'C').blocCEncadre).toBe(true);
  });

  it('ne contient ni score ni promesse de résultat', () => {
    const d = buildDecryptage(base, 'C');
    const tout = [d.blocA, d.blocB, d.blocC].join(' ');
    expect(tout).not.toMatch(/\d+\s*%|score|garanti|guéri/i);
  });
});

describe('décryptage : repère interne et validation', () => {
  it('calcule le repère', () => {
    expect(computeRepere({ ...base, q4: 'pret', q5: 'vite' })).toBe('pret');
    expect(computeRepere({ ...base, q4: 'pret', q5: 'renseigne' })).toBe('hesitant');
    expect(computeRepere({ ...base, q4: 'solution' })).toBe('attente_passive');
    expect(computeRepere(base)).toBe('hesitant');
  });

  it('remonte les signaux faibles', () => {
    expect(computeSignaux(base, '')).toHaveLength(1);
    expect(computeSignaux({ ...base, q1: 'autre', q4: 'solution' }, 'bonjour')).toHaveLength(4);
  });

  it('refuse les réponses inconnues ou incomplètes', () => {
    expect(isValidAnswers(base)).toBe(true);
    expect(isValidAnswers({ ...base, q2: 'inconnu' })).toBe(false);
    expect(isValidAnswers({ q1: 'anxiete' })).toBe(false);
    expect(isValidAnswers(null)).toBe(false);
  });

  it('retrouve le libellé d’une réponse', () => {
    expect(labelFor('q5', 'vite')).toBe('Dès que possible');
  });
});
