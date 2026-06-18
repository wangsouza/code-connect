import { describe, it, expect } from 'vitest'
import { LoginPage } from './LoginPage.ts'

describe('LoginPage', () => {
  it('renders the login form inside the auth layout', () => {
    const page = LoginPage()
    expect(page.querySelector('form')).toBeTruthy()
  })

  it('renders the banner image', () => {
    const page = LoginPage()
    const img = page.querySelector('img')
    expect(img?.src).toContain('banner-login.png')
  })

  it('renders the Login heading', () => {
    const page = LoginPage()
    expect(page.querySelector('h1')?.textContent).toBe('Login')
  })
})
