import './style.css'
import { AuthLayout } from './components/templates/AuthLayout/AuthLayout.ts'
import { LoginForm } from './components/organisms/LoginForm/LoginForm.ts'

document.querySelector<HTMLDivElement>('#app')!.appendChild(
  AuthLayout({ banner: '/banner-login.png', formEl: LoginForm() })
)
