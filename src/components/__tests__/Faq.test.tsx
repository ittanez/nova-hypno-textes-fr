import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Faq from '../Faq'

describe('FAQ Component', () => {
  test('renders FAQ heading', () => {
    render(<Faq />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/Questions fréquentes sur l'hypnothérapie/i)
  })

  test('renders all FAQ items', () => {
    render(<Faq />)
    
    // Should have multiple FAQ buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(5) // We have multiple FAQ items
  })

  test('FAQ items are collapsed by default', () => {
    render(<Faq />)
    
    const firstButton = screen.getAllByRole('button')[0]
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('clicking FAQ item expands it', async () => {
    const user = userEvent.setup()
    render(<Faq />)
    
    const firstButton = screen.getAllByRole('button')[0]
    
    await user.click(firstButton)
    
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('clicking expanded FAQ item collapses it', async () => {
    const user = userEvent.setup()
    render(<Faq />)
    
    const firstButton = screen.getAllByRole('button')[0]
    
    // Expand
    await user.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')
    
    // Collapse
    await user.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('has proper ARIA attributes', () => {
    render(<Faq />)
    
    const sections = screen.getAllByRole('region')
    const mainSection = sections.find(section => 
      section.getAttribute('aria-labelledby') === 'faq-heading'
    )
    expect(mainSection).toBeInTheDocument()
    expect(mainSection).toHaveAttribute('aria-labelledby', 'faq-heading')
    
    const buttons = screen.getAllByRole('button')
    const firstButton = buttons[0]
    
    expect(firstButton).toHaveAttribute('aria-controls')
    expect(firstButton).toHaveAttribute('id')
  })

  test('answers are properly linked to questions', () => {
    render(<Faq />)
    
    const buttons = screen.getAllByRole('button')
    const firstButton = buttons[0]
    const answerId = firstButton.getAttribute('aria-controls')
    
    expect(answerId).toBeTruthy()
    
    const answerElement = document.getElementById(answerId!)
    expect(answerElement).toBeInTheDocument()
    expect(answerElement).toHaveAttribute('aria-labelledby', firstButton.id)
  })
})