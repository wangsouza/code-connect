import { describe, it, expect } from 'vitest'
import { Label } from './Label.ts'

describe('Label', () => {
  it('renders with the correct text', () => {
    const label = Label({ text: 'Email ou usuário' })
    expect(label.tagName).toBe('LABEL')
    expect(label.textContent).toBe('Email ou usuário')
  })

  it('sets htmlFor when provided', () => {
    const label = Label({ text: 'Email', htmlFor: 'email' })
    expect(label.htmlFor).toBe('email')
  })

  it('renders without htmlFor when not provided', () => {
    const label = Label({ text: 'Email' })
    expect(label.htmlFor).toBe('')
  })
})
