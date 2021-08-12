import queryString from "query-string"

interface ResponseJson {
  client_id: string,
  scope: string,
  state: string,
}

interface AuthRequest {
  requestUri: string,
}

class AuthParams {
  private clientId: string
  private scope: string
  private state: string

  constructor(responseJson: ResponseJson) {
    this.clientId = responseJson.client_id
    this.scope = responseJson.scope
    this.state = responseJson.state
  }

  public createUri(): string {
    const params = {
      client_id: this.clientId,
      scope: this.scope,
      state: this.state,
      redirect_uri: this.redirectUri(),
    }
    const query = queryString.stringify(params)
    return `https://github.com/login/oauth/authorize?${query}`
  }

  private redirectUri(): string {
    return "http://localhost:3000/auth/callback" // FIXME
  }
}

class AuthInitiation {
  public async execute(): Promise<AuthRequest> {
    const uri = this.endpointUri()
    const response = await fetch(uri)
    const responseJson = await response.json()
    const params = this.createParams(responseJson)
    return {
      requestUri: params.createUri()
    }
  }

  private endpointUri(): string {
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/auth`
  }

  private createParams(jsonObject: ResponseJson): AuthParams {
    return new AuthParams(jsonObject)
  }
}

export default AuthInitiation
