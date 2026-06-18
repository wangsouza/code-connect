export function Divider(): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex items-center gap-3 text-text-muted text-xs'

  const line1 = document.createElement('div')
  line1.className = 'flex-1 h-px bg-border'

  const text = document.createElement('span')
  text.textContent = 'ou entre com outras contas'

  const line2 = document.createElement('div')
  line2.className = 'flex-1 h-px bg-border'

  wrapper.appendChild(line1)
  wrapper.appendChild(text)
  wrapper.appendChild(line2)
  return wrapper
}
