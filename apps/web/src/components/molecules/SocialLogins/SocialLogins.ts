const SOCIALS = [
  { src: '/github.png', label: 'Github' },
  { src: '/gmail.png', label: 'Gmail' },
] as const

export function SocialLogins(): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex justify-center gap-8'

  for (const { src, label } of SOCIALS) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity'
    btn.setAttribute('aria-label', `Entrar com ${label}`)

    const img = document.createElement('img')
    img.src = src
    img.alt = label
    img.className = 'w-8 h-8 object-contain'

    const labelEl = document.createElement('span')
    labelEl.textContent = label
    labelEl.className = 'text-xs text-text-muted'

    btn.appendChild(img)
    btn.appendChild(labelEl)
    wrapper.appendChild(btn)
  }

  return wrapper
}
