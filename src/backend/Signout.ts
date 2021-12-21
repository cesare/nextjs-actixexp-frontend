class Signout {
  public async execute(): Promise<SignoutResult> {
    const uri = this.requestUri()
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "cors",
      credentials: "include",
    })

    return { result: "ok" }
  }

  private requestUri(): string {
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/signout`
  }
}

interface SignoutResult {
  result: string
}

export default Signout
