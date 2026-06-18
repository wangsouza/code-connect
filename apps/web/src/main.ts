import './style.css'
import { LoginPage } from './components/pages/LoginPage/LoginPage.ts'

document.querySelector<HTMLDivElement>('#app')!.appendChild(LoginPage())
