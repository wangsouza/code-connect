import { describe, it, expect } from 'vitest'
import { Input } from './Input.ts'

describe('Input', () => {
  it('renders an input element with the correct name', () => {
    const input = Input({ name: 'email' })
    expect(input.tagName).toBe('INPUT')
    expect(input.name).toBe('email')
  })

  it('defaults to text type', () => {
    const input = Input({ name: 'email' })
    expect(input.type).toBe('text')
  })

  it('accepts password type', () => {
    const input = Input({ name: 'password', type: 'password' })
    expect(input.type).toBe('password')
  })

  it('sets placeholder', () => {
    const input = Input({ name: 'email', placeholder: 'usuario123' })
    expect(input.placeholder).toBe('usuario123')
  })

  it('sets id when provided', () => {
    const input = Input({ name: 'email', id: 'email-field' })
    expect(input.id).toBe('email-field')
  })
})
