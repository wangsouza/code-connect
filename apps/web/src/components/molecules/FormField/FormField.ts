import { Label } from '../../atoms/Label/Label.ts'
import { Input } from '../../atoms/Input/Input.ts'
import type { InputProps } from '../../atoms/Input/Input.ts'

export interface FormFieldProps {
  label: string
  inputProps: InputProps
}

export function FormField({ label, inputProps }: FormFieldProps): HTMLDivElement {
  const id = inputProps.id ?? inputProps.name
  const wrapper = document.createElement('div')
  wrapper.className = 'flex flex-col gap-1'

  wrapper.appendChild(Label({ text: label, htmlFor: id }))
  wrapper.appendChild(Input({ ...inputProps, id }))

  return wrapper
}
