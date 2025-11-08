import { request } from '../index.js'

export const loginUser = async (body, isLoginPage) => {
  const url = isLoginPage ?'/api/user/login' : '/api/user/signup'

  try {
    const data = await request({ 
      method: 'POST', 
      body, 
      url,
    })

    return data
  } catch(e) {
    alert(e)
  }
}