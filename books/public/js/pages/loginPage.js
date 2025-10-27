import { loginUser } from '../api/user/index.js'
import { getJsonFromFormData } from '../utils/getJsonFromFormData.js'

const submitButton = document.querySelector('#submit')

const handleLogin = async (e) => {
  e.preventDefault()

  const path = window.location.pathname
  const isLoginPage = path === '/login'

  const form = document.querySelector('#form')
  const formResult = getJsonFromFormData(form)

  const data = await loginUser(formResult, isLoginPage)

  if (data?.redirectUrl) {
    window.location.href = data.redirectUrl
  }
}

submitButton.addEventListener('click', handleLogin)