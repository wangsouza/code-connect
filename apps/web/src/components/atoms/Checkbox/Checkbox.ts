export interface CheckboxProps {
  id: string
  name: string
  label: string
  checked?: boolean
}

export function Checkbox({ id, name, label, checked = false }: CheckboxProps): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex items-center gap-2'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.id = id
  input.name = name
  input.checked = checked
  input.className = 'w-4 h-4 accent-accent cursor-pointer'

  const labelEl = document.createElement('label')
  labelEl.htmlFor = id
  labelEl.textContent = label
  labelEl.className = 'text-sm text-text-muted cursor-pointer'

  wrapper.appendChild(input)
  wrapper.appendChild(labelEl)
  return wrapper
}
