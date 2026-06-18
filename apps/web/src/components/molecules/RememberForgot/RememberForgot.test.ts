import { describe, it, expect } from 'vitest'
import { RememberForgot } from './RememberForgot.ts'

describe('RememberForgot', () => {
  it('renders the Lembrar-me checkbox', () => {
    const el = RememberForgot()
    expect(el.textContent).toContain('Lembrar-me')
    expect(el.querySelector('input[type="checkbox"]')).toBeTruthy()
  })

  it('renders the Esqueci a senha link', () => {
    const el = RememberForgot()
    expect(el.textContent).toContain('Esqueci a senha')
    expect(el.querySelector('a')).toBeTruthy()
  })
})
