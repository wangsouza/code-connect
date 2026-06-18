export interface AuthLayoutProps {
  banner: string
  formEl: HTMLElement
}

export function AuthLayout({ banner, formEl }: AuthLayoutProps): HTMLElement {
  const page = document.createElement('div')
  page.className = 'min-h-screen bg-bg flex items-center justify-center p-4 md:p-6'

  const card = document.createElement('div')
  card.className = 'bg-surface rounded-2xl overflow-hidden flex w-full max-w-3xl shadow-2xl'

  const bannerWrapper = document.createElement('div')
  bannerWrapper.className = 'hidden md:block w-2/5 flex-shrink-0'

  const img = document.createElement('img')
  img.src = banner
  img.alt = ''
  img.setAttribute('aria-hidden', 'true')
  img.className = 'w-full h-full object-cover'

  bannerWrapper.appendChild(img)

  const formWrapper = document.createElement('div')
  formWrapper.className = 'flex-1 p-8 md:p-10 flex flex-col justify-center overflow-y-auto'
  formWrapper.appendChild(formEl)

  card.appendChild(bannerWrapper)
  card.appendChild(formWrapper)
  page.appendChild(card)

  return page
}
