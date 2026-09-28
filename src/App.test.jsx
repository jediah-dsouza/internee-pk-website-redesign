import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App, { Header, Newsletter } from './App'
import { Carousel } from './components/Carousel'
import { InternshipExplorer } from './components/InternshipExplorer'

afterEach(() => cleanup())

const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('navigation', () => {
  it('opens and closes the mobile menu with accessible state', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /open navigation menu/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeVisible()
    await user.click(screen.getByRole('button', { name: /close navigation menu/i }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('navigation')).not.toHaveClass('mobile-nav-open')
  })

  it('opens and closes the resources menu', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const trigger = screen.getByRole('button', { name: /resources/i })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})

describe('internship content', () => {
  it('renders internship cards from loaded data', async () => {
    const loader = vi.fn().mockResolvedValue([{ title: 'Test track', icon: '⌘', meta: 'Test', tone: 'green', duration: '1 month', level: 'Beginner', description: 'A test opportunity.' }])
    render(<InternshipExplorer loader={loader} />)
    expect(screen.getByRole('status', { name: /loading internships/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /test track/i })).toBeInTheDocument()
    expect(loader).toHaveBeenCalledOnce()
  })

  it('shows empty and error states with retry', async () => {
    const emptyLoader = vi.fn().mockResolvedValue([])
    render(<InternshipExplorer loader={emptyLoader} />)
    expect(await screen.findByText(/no internship paths are open/i)).toBeInTheDocument()
    cleanup()

    const errorLoader = vi.fn().mockRejectedValueOnce(new Error('Network unavailable')).mockResolvedValueOnce([])
    render(<InternshipExplorer loader={errorLoader} />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Network unavailable')
    await userEvent.setup().click(screen.getByRole('button', { name: /try again/i }))
    expect(await screen.findByText(/no internship paths are open/i)).toBeInTheDocument()
  })
})

describe('carousel', () => {
  const items = [{ id: 'one', text: 'First slide' }, { id: 'two', text: 'Second slide' }]
  const renderSlide = (item) => <p>{item.text}</p>

  it('moves with next, previous, indicators, and keyboard controls', async () => {
    const user = userEvent.setup()
    render(<Carousel items={items} renderItem={renderSlide} label="Test stories" />)
    expect(screen.getByText('First slide')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /next testimonial/i }))
    expect(screen.getByText('Second slide')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /previous testimonial/i }))
    expect(screen.getByText('First slide')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /show testimonial 2/i }))
    expect(screen.getByText('Second slide')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /next testimonial/i }))
    expect(screen.getByText('First slide')).toBeInTheDocument()
    const viewport = screen.getByRole('region', { name: 'Test stories' }).querySelector('.carousel-viewport')
    viewport.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('Second slide')).toBeInTheDocument()
  })
})

describe('newsletter', () => {
  it('validates empty and invalid email submissions', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)
    const input = screen.getByRole('textbox', { name: /get practical career notes/i })
    await user.click(screen.getByRole('button', { name: /join the list/i }))
    expect(screen.getByText('Email address is required.')).toBeInTheDocument()
    await user.type(input, 'not-an-email')
    await user.click(screen.getByRole('button', { name: /join the list/i }))
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows loading and success for a valid email', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)
    await user.type(screen.getByRole('textbox', { name: /get practical career notes/i }), 'learner@example.com')
    await user.click(screen.getByRole('button', { name: /join the list/i }))
    expect(screen.getByRole('button', { name: /joining/i })).toBeDisabled()
    await waitFor(() => expect(screen.getByText(/you’re on the list/i)).toBeInTheDocument(), { timeout: 1500 })
  })
})

describe('app smoke render', () => {
  it('renders the main homepage sections', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /build skills/i })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('link', { name: /web development/i })).toBeInTheDocument())
    expect(screen.getByRole('region', { name: /learner testimonials/i })).toBeInTheDocument()
    await flush()
  })
})
