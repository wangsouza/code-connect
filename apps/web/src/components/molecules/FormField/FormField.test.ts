import { describe, it, expect } from 'vitest'
import { FormField } from './FormField.ts'

describe('FormField', () => {
  it('renders a label and input', () => {
    const field = FormField({ label: 'Email', inputProps: { name: 'email' } })
    expect(field.querySelector('label')?.textContent).toBe('Email')
    expect(field.querySelector('input')).toBeTruthy()
  })

  it('links the label to the input via htmlFor / id', () => {
    const field = FormField({ label: 'Email', inputProps: { name: 'email' } })
    const labelEl = field.querySelector('label')
    const inputEl = field.querySelector('input')
    expect(labelEl?.htmlFor).toBe(inputEl?.id)
  })

  it('uses inputProps.id when explicitly provided', () => {
    const field = FormField({ label: 'Email', inputProps: { name: 'email', id: 'custom-id' } })
    expect(field.querySelector('input')?.id).toBe('custom-id')
  })

  it('falls back to name as id', () => {
    const field = FormField({ label: 'Senha', inputProps: { name: 'password', type: 'password' } })
    expect(field.querySelector('input')?.id).toBe('password')
  })
})
