import { describe, it, expect } from 'vitest'
import { Button } from './Button.ts'

describe('Button', () => {
  it('renders with the correct label', () => {
    const btn = Button({ label: 'Click me' })
    expect(btn.tagName).toBe('BUTTON')
    expect(btn.textContent).toBe('Click me')
  })

  it('defaults to button type', () => {
    const btn = Button({ label: 'Test' })
    expect(btn.type).toBe('button')
  })

  it('sets custom type', () => {
    const btn = Button({ label: 'Submit', type: 'submit' })
    expect(btn.type).toBe('submit')
  })

  it('shows arrow when showArrow is true', () => {
    const btn = Button({ label: 'Login', showArrow: true })
    expect(btn.textContent).toContain('Login')
    expect(btn.textContent).toContain('→')
  })

  it('calls onClick when clicked', () => {
    let clicked = false
    const btn = Button({ label: 'Click', onClick: () => { clicked = true } })
    btn.click()
    expect(clicked).toBe(true)
  })
})
