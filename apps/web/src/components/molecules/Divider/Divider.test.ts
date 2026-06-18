import { describe, it, expect } from 'vitest'
import { Divider } from './Divider.ts'

describe('Divider', () => {
  it('renders the divider text', () => {
    const el = Divider()
    expect(el.textContent).toContain('ou entre com outras contas')
  })

  it('renders two line separators', () => {
    const el = Divider()
    const lines = el.querySelectorAll('.flex-1')
    expect(lines.length).toBe(2)
  })
})
