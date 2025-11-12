import { test, expect } from '@playwright/test';

test.describe('Navigation principale', () => {
  test('la page d\'accueil charge correctement', async ({ page }) => {
    await page.goto('/');

    // Vérifie que le titre contient NovaHypnose
    await expect(page).toHaveTitle(/NovaHypnose/i);

    // Vérifie que le header est visible
    await expect(page.locator('header')).toBeVisible();

    // Vérifie la présence du CTA principal
    await expect(page.getByRole('link', { name: /rendez-vous/i }).first()).toBeVisible();
  });

  test('navigation vers la FAQ', async ({ page }) => {
    await page.goto('/');

    // Cliquer sur le lien FAQ dans le menu (peut être dans un dropdown)
    await page.getByRole('link', { name: /questions/i }).first().click();

    // Vérifie que la section FAQ est visible
    await expect(page.locator('#faq')).toBeVisible();

    // Vérifie que des questions sont affichées
    await expect(page.getByRole('button').filter({ hasText: /hypnotisé/i })).toBeVisible();
  });

  test('ouverture et fermeture du menu mobile', async ({ page, viewport }) => {
    // Redimensionner pour mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Trouver et cliquer sur le bouton hamburger
    const menuButton = page.getByRole('button', { name: /toggle menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Vérifie que le menu mobile est ouvert
    // (les liens de navigation devraient être visibles)
    await expect(page.getByText(/L'hypnose/i).nth(1)).toBeVisible();

    // Fermer le menu
    await menuButton.click();
  });

  test('scroll vers la section contact', async ({ page }) => {
    await page.goto('/');

    // Cliquer sur le lien Contact
    await page.getByRole('link', { name: /contact/i }).first().click();

    // Vérifie que la section contact est visible
    await expect(page.locator('#contact')).toBeInViewport();

    // Vérifie les informations de contact
    await expect(page.getByText(/06 49 35 80 89/)).toBeVisible();
    await expect(page.getByText(/contact@novahypnose\.fr/)).toBeVisible();
  });
});
