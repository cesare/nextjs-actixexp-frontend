interface ResponseJson {
  client_id: string,
  scope: string,
  state: string,
}

interface AuthParams {
  clientId: string,
  scope: string,
  state: string,
}

class AuthInitiation {
  public async execute(): Promise<AuthParams> {
    const uri = this.endpointUri()
    const response = await fetch(uri)
    const responseJson = await response.json()
    return this.createParams(responseJson)
  }

  private endpointUri(): string {
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/auth`
  }

  private createParams(jsonObject: ResponseJson): AuthParams {
    return {
      clientId: jsonObject.client_id,
      scope: jsonObject.scope,
      state: jsonObject.state,
    }
  }
}

export default AuthInitiation
