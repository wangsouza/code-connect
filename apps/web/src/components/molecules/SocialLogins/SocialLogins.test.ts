import { describe, it, expect } from 'vitest'
import { SocialLogins } from './SocialLogins.ts'

describe('SocialLogins', () => {
  it('renders Github and Gmail buttons', () => {
    const el = SocialLogins()
    expect(el.textContent).toContain('Github')
    expect(el.textContent).toContain('Gmail')
  })

  it('renders two social buttons', () => {
    const el = SocialLogins()
    const buttons = el.querySelectorAll('button')
    expect(buttons.length).toBe(2)
  })

  it('renders images for each social', () => {
    const el = SocialLogins()
    const imgs = el.querySelectorAll('img')
    expect(imgs.length).toBe(2)
  })
})
