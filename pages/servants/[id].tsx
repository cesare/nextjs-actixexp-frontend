import { useRouter } from 'next/router'
import useSWR from 'swr'

import Servant from '../../src/entities/Servant'
import SingleServant from '../../src/backend/SingleServant'

export default function ShowServant() {
  const router = useRouter()

  const fetcher = (_path: string, id: string): Promise<Servant> => {
    return new SingleServant({ id: id }).execute()
  }

  const fetchKey = () => {
    if (! router.isReady) {
      return null
    }
    const { id } = router.query
    const path = `/servants/${id}`
    return [path, id]
  }

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }

  const { data: servant, error } = useSWR(fetchKey, fetcher, swrOptions)
  if (error) return <div>failed to load</div>
  if (!servant) return <div>loading...</div>

  return (
    <div key={servant.id}>
      <div>{servant.name}</div>
      <div>[{servant.className}]</div>
    </div>
  )
}
