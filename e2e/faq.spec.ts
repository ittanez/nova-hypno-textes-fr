import { test, expect } from '@playwright/test';

test.describe('FAQ (Foire Aux Questions)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Naviguer vers la FAQ
    await page.getByRole('link', { name: /questions/i }).first().click();
    await expect(page.locator('#faq')).toBeVisible();
  });

  test('affiche le titre de la FAQ', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /questions fréquentes/i })).toBeVisible();
  });

  test('affiche au moins 5 questions', async ({ page }) => {
    const questions = await page.locator('#faq button[aria-expanded]').count();
    expect(questions).toBeGreaterThanOrEqual(5);
  });

  test('ouvre et ferme une question au clic', async ({ page }) => {
    // Trouver la première question
    const firstQuestion = page.locator('#faq button[aria-expanded]').first();

    // Vérifier qu'elle est fermée initialement
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');

    // Cliquer pour ouvrir
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // La réponse devrait être visible
    const answerId = await firstQuestion.getAttribute('aria-controls');
    const answer = page.locator(`#${answerId}`);
    await expect(answer).toBeVisible();

    // Cliquer à nouveau pour fermer
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });

  test('navigation au clavier dans la FAQ', async ({ page }) => {
    const firstQuestion = page.locator('#faq button[aria-expanded]').first();

    // Focus avec Tab
    await page.keyboard.press('Tab');

    // Ouvrir avec Enter
    await firstQuestion.focus();
    await page.keyboard.press('Enter');

    // Vérifier que la réponse s'ouvre
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  });
});
