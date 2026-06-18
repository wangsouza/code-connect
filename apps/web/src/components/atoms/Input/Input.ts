export interface InputProps {
  name: string
  type?: string
  placeholder?: string
  id?: string
}

export function Input({ name, type = 'text', placeholder = '', id }: InputProps): HTMLInputElement {
  const input = document.createElement('input')
  input.type = type
  input.name = name
  input.placeholder = placeholder
  if (id) input.id = id
  input.className =
    'w-full px-4 py-3 bg-input-bg text-white rounded-lg border border-border focus:outline-none focus:border-accent placeholder:text-text-muted transition-colors'
  return input
}
