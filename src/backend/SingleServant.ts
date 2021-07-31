interface Parameters {
  id: string,
}

class SingleServant {
  private params: Parameters

  constructor(params: Parameters) {
    this.params = params
  }

  public execute(): Promise<Response> {
    const uri = this.endpointUri()
    return fetch(uri)
  }

  private endpointUri(): string {
    const id = this.params.id
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/servants/${id}`
  }
}

export default SingleServant
