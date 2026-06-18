import { FormField } from '../../molecules/FormField/FormField.ts'
import { RememberForgot } from '../../molecules/RememberForgot/RememberForgot.ts'
import { Button } from '../../atoms/Button/Button.ts'
import { Divider } from '../../molecules/Divider/Divider.ts'
import { SocialLogins } from '../../molecules/SocialLogins/SocialLogins.ts'
import { TextLink } from '../../atoms/TextLink/TextLink.ts'

export function LoginForm(): HTMLFormElement {
  const form = document.createElement('form')
  form.noValidate = true
  form.className = 'flex flex-col gap-5'

  const heading = document.createElement('div')
  heading.className = 'mb-2'

  const h1 = document.createElement('h1')
  h1.textContent = 'Login'
  h1.className = 'text-2xl font-bold text-white mb-1'

  const subtitle = document.createElement('p')
  subtitle.textContent = 'Boas-vindas! Faça seu login.'
  subtitle.className = 'text-text-muted text-sm'

  heading.appendChild(h1)
  heading.appendChild(subtitle)
  form.appendChild(heading)

  form.appendChild(FormField({ label: 'Email ou usuário', inputProps: { name: 'emailOrUser', placeholder: 'usuario123' } }))
  form.appendChild(FormField({ label: 'Senha', inputProps: { name: 'password', type: 'password', placeholder: '••••••' } }))
  form.appendChild(RememberForgot())
  form.appendChild(Button({ label: 'Login', type: 'submit', showArrow: true }))
  form.appendChild(Divider())
  form.appendChild(SocialLogins())

  const footer = document.createElement('p')
  footer.className = 'text-center text-sm text-text-muted'
  footer.appendChild(document.createTextNode('Ainda não tem conta? '))
  footer.appendChild(TextLink({ text: 'Crie seu cadastro! 📋' }))
  form.appendChild(footer)

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    const inputs = form.querySelectorAll<HTMLInputElement>('input:not([type="checkbox"])')
    inputs.forEach((input) => input.classList.remove('border-red-500', 'focus:border-red-500'))

    const data = new FormData(form)
    const emailOrUser = data.get('emailOrUser')?.toString() ?? ''
    const password = data.get('password')?.toString() ?? ''
    const remember = data.get('remember') !== null

    if (!emailOrUser || !password) {
      inputs.forEach((input) => {
        if (!input.value) input.classList.add('border-red-500', 'focus:border-red-500')
      })
      return
    }

    // TODO: wire to /v1/auth once endpoint exists
    console.log({ emailOrUser, password, remember })
  })

  return form
}
