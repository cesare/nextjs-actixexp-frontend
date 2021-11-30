import { useRouter } from 'next/router'
import useSWR from 'swr'

import Servant from '../../src/entities/Servant'
import SingleServant from '../../src/backend/SingleServant'

export default function ShowServant() {
  const router = useRouter()

  const fetcher = (_path: String): Promise<Servant> => {
    const id = router.query.id as string
    return new SingleServant({ id: id }).execute()
  }
  const { data, error } = useSWR(router.pathname, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const servant = data

  return (
    <div key={servant.id}>
      <div>{servant.name}</div>
      <div>[{servant.className}]</div>
    </div>
  )
}
