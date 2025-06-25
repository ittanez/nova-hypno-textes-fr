import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Hero from '../Hero'

// Mock react-helmet
vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
}))

const HeroWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('Hero Component', () => {
  test('renders main heading', () => {
    render(
      <HeroWrapper>
        <Hero />
      </HeroWrapper>
    )
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/Hypnothérapie Ericksonienne/i)
  })

  test('renders call-to-action buttons', () => {
    render(
      <HeroWrapper>
        <Hero />
      </HeroWrapper>
    )
    
    const primaryButton = screen.getByRole('link', { name: /prendre rendez-vous/i })
    const secondaryButton = screen.getByRole('link', { name: /découvrir les applications/i })
    
    expect(primaryButton).toBeInTheDocument()
    expect(secondaryButton).toBeInTheDocument()
    expect(primaryButton).toHaveAttribute('href', 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris')
  })

  test('renders hero image with proper attributes', () => {
    render(
      <HeroWrapper>
        <Hero />
      </HeroWrapper>
    )
    
    const image = screen.getByAltText(/Séance d'hypnothérapie à Paris/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })

  test('has proper semantic structure', () => {
    render(
      <HeroWrapper>
        <Hero />
      </HeroWrapper>
    )
    
    const section = document.getElementById('intro')
    expect(section).toBeInTheDocument()
  })
})