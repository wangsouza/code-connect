export interface ButtonProps {
  label: string
  type?: HTMLButtonElement['type']
  onClick?: (e: MouseEvent) => void
  showArrow?: boolean
}

export function Button({
  label,
  type = 'button',
  onClick,
  showArrow = false,
}: ButtonProps): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.type = type
  btn.className =
    'w-full py-3 px-6 bg-accent text-bg font-bold text-base rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-accent-hover transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2'

  if (showArrow) {
    btn.textContent = label + ' '
    const arrow = document.createElement('span')
    arrow.setAttribute('aria-hidden', 'true')
    arrow.textContent = '→'
    btn.appendChild(arrow)
  } else {
    btn.textContent = label
  }

  if (onClick) btn.addEventListener('click', onClick)
  return btn
}
