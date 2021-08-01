import Servant from '../entities/Servant'
import { NotFound } from '../backend/errors'

interface Parameters {
  id: string,
}

class SingleServant {
  private params: Parameters

  constructor(params: Parameters) {
    this.params = params
  }

  public async execute(): Promise<Servant> {
    const uri = this.endpointUri()
    const response = await fetch(uri)
    if (!response.ok) {
      throw new NotFound()
    }

    const json = await response.json()
    const servant = {
      id: json.id,
      name: json.name,
      className: json.class_name,
    }
    return servant
  }

  private endpointUri(): string {
    const id = this.params.id
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/servants/${id}`
  }
}

export default SingleServant
