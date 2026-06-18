import { describe, it, expect, vi } from 'vitest'
import { LoginForm } from './LoginForm.ts'

describe('LoginForm', () => {
  it('renders the Login heading', () => {
    const form = LoginForm()
    expect(form.querySelector('h1')?.textContent).toBe('Login')
  })

  it('renders email and password fields', () => {
    const form = LoginForm()
    expect(form.querySelector('input[name="emailOrUser"]')).toBeTruthy()
    expect(form.querySelector('input[name="password"]')).toBeTruthy()
  })

  it('renders a submit button', () => {
    const form = LoginForm()
    expect(form.querySelector('button[type="submit"]')).toBeTruthy()
  })

  it('renders remember-me checkbox', () => {
    const form = LoginForm()
    expect(form.querySelector('input[name="remember"]')).toBeTruthy()
  })

  it('renders social login buttons', () => {
    const form = LoginForm()
    expect(form.textContent).toContain('Github')
    expect(form.textContent).toContain('Gmail')
  })

  it('logs payload on valid submit', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const form = LoginForm()
    document.body.appendChild(form)

    const emailInput = form.querySelector<HTMLInputElement>('input[name="emailOrUser"]')!
    const passwordInput = form.querySelector<HTMLInputElement>('input[name="password"]')!
    emailInput.value = 'usuario123'
    passwordInput.value = 'secret'

    form.dispatchEvent(new Event('submit'))
    expect(spy).toHaveBeenCalledWith({ emailOrUser: 'usuario123', password: 'secret', remember: false })

    spy.mockRestore()
    document.body.removeChild(form)
  })

  it('does not log on empty submit', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const form = LoginForm()

    form.dispatchEvent(new Event('submit'))
    expect(spy).not.toHaveBeenCalled()

    spy.mockRestore()
  })
})
