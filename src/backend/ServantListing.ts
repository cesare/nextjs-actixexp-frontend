import Servant from '../entities/Servant'

interface ResponseServant {
  id: number,
  name: string,
  class_name: string,
}

class ServantListing {
  public async execute(): Promise<Servant[]> {
    const uri = this.endpointUri()
    const response = await fetch(uri, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
    if (!response.ok) {
      return Promise.reject({
        status: response.status
      })
    }

    const responseJson = await response.json()
    return responseJson.servants.map(this.createServant)
  }

  private endpointUri(): string {
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/servants`
  }

  private createServant(jsonObject: ResponseServant): Servant {
    return {
      id: jsonObject.id.toString(),
      name: jsonObject.name,
      className: jsonObject.class_name,
    }
  }
}

export default ServantListing
