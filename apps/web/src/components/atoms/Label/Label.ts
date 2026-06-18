export interface LabelProps {
  text: string
  htmlFor?: string
}

export function Label({ text, htmlFor }: LabelProps): HTMLLabelElement {
  const label = document.createElement('label')
  label.textContent = text
  if (htmlFor) label.htmlFor = htmlFor
  label.className = 'block text-sm text-white mb-1'
  return label
}
