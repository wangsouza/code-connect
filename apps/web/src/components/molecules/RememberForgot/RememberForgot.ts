import { Checkbox } from '../../atoms/Checkbox/Checkbox.ts'
import { TextLink } from '../../atoms/TextLink/TextLink.ts'

export function RememberForgot(): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex items-center justify-between'

  wrapper.appendChild(Checkbox({ id: 'remember', name: 'remember', label: 'Lembrar-me' }))
  wrapper.appendChild(TextLink({ text: 'Esqueci a senha' }))

  return wrapper
}
