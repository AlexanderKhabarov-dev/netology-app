export const request = async ({ body = {}, method, url }) => {
  const params = {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  try {
    const request = await fetch(url, params)
    const response = await request.json()

    if (response.errorMessage) {
      alert(response.errorMessage)
    }

    return response
  } catch(e) {
    alert(e)
  }
}

export const getFile = async (url) => {
  const params = {
    method: 'GET',
    credentials: 'same-origin',
  }

  try {
    const response = await fetch(url, params)

    if (response.errorMessage) {
      alert(response.errorMessage)
    }

    const blob = await response.blob()
    return blob
  } catch (e) {
    alert(e)
  }
}

export const uploadFile = async ({ file  }) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const request = await fetch('/api/file/upload', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    })

    const response = await request.json()

    if (response.errorMessage) {
      alert(response.errorMessage)
    }

    return response
  } catch (e) {
    alert(e)
  }
}