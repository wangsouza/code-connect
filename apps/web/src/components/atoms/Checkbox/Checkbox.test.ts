import { describe, it, expect } from 'vitest'
import { Checkbox } from './Checkbox.ts'

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    const el = Checkbox({ id: 'remember', name: 'remember', label: 'Lembrar-me' })
    const input = el.querySelector('input')
    expect(input?.type).toBe('checkbox')
    expect(input?.id).toBe('remember')
    expect(input?.name).toBe('remember')
  })

  it('renders the label text', () => {
    const el = Checkbox({ id: 'remember', name: 'remember', label: 'Lembrar-me' })
    expect(el.textContent).toContain('Lembrar-me')
  })

  it('links label to checkbox via htmlFor', () => {
    const el = Checkbox({ id: 'remember', name: 'remember', label: 'Lembrar-me' })
    const label = el.querySelector('label')
    expect(label?.htmlFor).toBe('remember')
  })

  it('defaults to unchecked', () => {
    const el = Checkbox({ id: 'remember', name: 'remember', label: 'Lembrar-me' })
    const input = el.querySelector('input')
    expect(input?.checked).toBe(false)
  })
})
