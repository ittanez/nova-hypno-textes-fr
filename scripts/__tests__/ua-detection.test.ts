/**
 * Détection des clients automatisés (audit T-02) : multi-UA + Vary.
 */
import { describe, it, expect } from 'vitest';
import { looksAutomated, withVaryUA } from '../../netlify/edge-functions/lib/ua';

const UAS = {
  chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  safariIos: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  lighthouse: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse',
  playwright: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/126.0.0.0 Safari/537.36',
  gptbot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
  claudebot: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  perplexity: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  unknownCrawler: 'AcmeResearchFetcher/2.1',
};

describe('looksAutomated', () => {
  it('laisse passer les navigateurs réels, Lighthouse et Playwright', () => {
    for (const k of ['chrome', 'safariIos', 'lighthouse', 'playwright'] as const) {
      expect(looksAutomated(UAS[k]), k).toBe(false);
    }
  });
  it('détecte robots IA, moteurs et clients inconnus', () => {
    for (const k of ['gptbot', 'claudebot', 'perplexity', 'bingbot', 'unknownCrawler'] as const) {
      expect(looksAutomated(UAS[k]), k).toBe(true);
    }
    expect(looksAutomated('')).toBe(true);
    expect(looksAutomated(null)).toBe(true);
  });
});

describe('withVaryUA', () => {
  it('ajoute Vary: User-Agent sans dupliquer', () => {
    expect(withVaryUA(new Response('x')).headers.get('vary')).toBe('User-Agent');
    expect(withVaryUA(new Response('x', { headers: { vary: 'Accept-Encoding' } })).headers.get('vary')).toBe('Accept-Encoding, User-Agent');
    expect(withVaryUA(new Response('x', { headers: { vary: 'user-agent' } })).headers.get('vary')).toBe('user-agent');
  });
});
