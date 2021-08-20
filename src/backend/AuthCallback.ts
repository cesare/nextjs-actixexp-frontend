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
    const response = await fetch(uri, {
      method: "GET",
      credentials: "include",
    })
    const responseJson = await response.json()
    return {
      identifier: responseJson.identifier,
      username: responseJson.username,
      name: responseJson.name,
    }
  }

  private requestUri(): string {
    const params = {
      code: this.code,
      state: this.state,
    }
    const query = queryString.stringify(params)
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/auth/callback?${query}`
  }
}

export default AuthCallback
