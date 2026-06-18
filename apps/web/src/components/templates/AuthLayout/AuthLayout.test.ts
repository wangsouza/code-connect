import { describe, it, expect } from 'vitest'
import { AuthLayout } from './AuthLayout.ts'

describe('AuthLayout', () => {
  it('renders the banner image', () => {
    const formEl = document.createElement('form')
    const el = AuthLayout({ banner: '/banner-login.png', formEl })
    const img = el.querySelector('img')
    expect(img?.src).toContain('banner-login.png')
  })

  it('renders the provided form element', () => {
    const formEl = document.createElement('form')
    formEl.id = 'test-form'
    const el = AuthLayout({ banner: '/banner-login.png', formEl })
    expect(el.querySelector('#test-form')).toBeTruthy()
  })

  it('accepts any form element for reuse with other pages', () => {
    const registerForm = document.createElement('form')
    registerForm.id = 'register-form'
    const el = AuthLayout({ banner: '/banner-register.png', formEl: registerForm })
    expect(el.querySelector('#register-form')).toBeTruthy()
    const img = el.querySelector('img')
    expect(img?.src).toContain('banner-register.png')
  })
})
