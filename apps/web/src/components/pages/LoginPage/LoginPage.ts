import { AuthLayout } from '../../templates/AuthLayout/AuthLayout.ts'
import { LoginForm } from '../../organisms/LoginForm/LoginForm.ts'

export function LoginPage(): HTMLElement {
  return AuthLayout({
    banner: '/banner-login.png',
    formEl: LoginForm(),
  })
}
