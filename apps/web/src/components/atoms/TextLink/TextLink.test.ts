import { describe, it, expect } from 'vitest'
import { TextLink } from './TextLink.ts'

describe('TextLink', () => {
  it('renders an anchor with the correct text', () => {
    const a = TextLink({ text: 'Esqueci a senha' })
    expect(a.tagName).toBe('A')
    expect(a.textContent).toBe('Esqueci a senha')
  })

  it('defaults href to #', () => {
    const a = TextLink({ text: 'Link' })
    expect(a.getAttribute('href')).toBe('#')
  })

  it('sets custom href', () => {
    const a = TextLink({ text: 'Link', href: '/register' })
    expect(a.getAttribute('href')).toBe('/register')
  })

  it('calls onClick when clicked', () => {
    let clicked = false
    const a = TextLink({ text: 'Click', onClick: () => { clicked = true } })
    a.click()
    expect(clicked).toBe(true)
  })
})
