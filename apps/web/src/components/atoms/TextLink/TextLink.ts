export interface TextLinkProps {
  text: string
  href?: string
  onClick?: (e: MouseEvent) => void
}

export function TextLink({ text, href = '#', onClick }: TextLinkProps): HTMLAnchorElement {
  const a = document.createElement('a')
  a.textContent = text
  a.href = href
  a.className = 'text-sm text-accent hover:underline cursor-pointer'
  if (onClick) a.addEventListener('click', onClick)
  return a
}
