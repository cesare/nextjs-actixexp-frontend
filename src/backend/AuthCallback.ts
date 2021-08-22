import queryString from "query-string"

interface CallbackResponse {
  identifier: string,
  username: string,
  name: string,
}

class AuthCallback {
  private code: string
  private state: string

  constructor(code: string, state: string) {
    this.code = code
    this.state = state
  }

  public async execute(): Promise<CallbackResponse> {
    const uri = this.requestUri()
    const params = {
      code: this.code,
      state: this.state,
    }
    const body = queryString.stringify(params)

    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
      mode: "cors",
      credentials: "include",
    })
    if (response.ok) {
      const responseJson = await response.json()
      return {
        identifier: responseJson.identifier,
        username: responseJson.username,
        name: responseJson.name,
      }
    } else {
      const errorJson = await response.json()
      throw errorJson
    }
  }

  private requestUri(): string {
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/auth/callback`
  }
}

export default AuthCallback
