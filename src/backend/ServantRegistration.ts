interface Parameters {
  name: string,
  className: string,
}

class ServantRegistration {
  private params: Parameters

  constructor(params: Parameters) {
    this.params = params
  }

  public execute(): Promise<Response> {
    return this.request()
  }

  private request(): Promise<Response> {
    const body = this.requestJson()
    return fetch(
      this.endpointUri(), {
        body: body,
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "no-cache",
        credentials: 'include',
        method: "POST",
      }
    )
  }

  private endpointUri(): string {
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/servants`
  }

  private requestJson(): string {
    return JSON.stringify({
      name: this.params.name,
      class_name: this.params.className,
    })
  }
}

export default ServantRegistration
