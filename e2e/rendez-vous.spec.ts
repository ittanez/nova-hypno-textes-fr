import { test, expect } from '@playwright/test';

test.describe('Parcours prise de rendez-vous', () => {
  test('accès à Resalib depuis le header', async ({ page, context }) => {
    await page.goto('/');

    // Attendre le chargement complet
    await page.waitForLoadState('networkidle');

    // Cliquer sur le bouton Rendez-vous dans le header
    const ctaButton = page.getByRole('link', { name: /rendez-vous/i }).first();
    await expect(ctaButton).toBeVisible();

    // Vérifier que le lien pointe vers Resalib
    const href = await ctaButton.getAttribute('href');
    expect(href).toContain('resalib.fr');
  });

  test('accès à Resalib depuis la section contact', async ({ page }) => {
    await page.goto('/');

    // Aller à la section contact
    await page.getByRole('link', { name: /contact/i }).first().click();

    // Attendre que la section soit visible
    await expect(page.locator('#contact')).toBeInViewport();

    // Trouver le bouton "Prendre rendez-vous" dans la section
    const ctaContactButton = page.locator('#contact').getByRole('link', { name: /prendre rendez-vous/i });
    await expect(ctaContactButton).toBeVisible();

    // Vérifier le lien Resalib
    const href = await ctaContactButton.getAttribute('href');
    expect(href).toContain('resalib.fr');
  });

  test('les liens téléphone et email sont fonctionnels', async ({ page }) => {
    await page.goto('/');

    // Naviguer vers contact
    await page.getByRole('link', { name: /contact/i }).first().click();

    // Vérifier le lien téléphone
    const phoneLink = page.getByRole('link', { name: /06 49 35 80 89/i });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', /^tel:/);

    // Vérifier le lien email
    const emailLink = page.getByRole('link', { name: /contact@novahypnose\.fr/i });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', /^mailto:/);
  });
});
