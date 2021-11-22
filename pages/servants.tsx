import { useEffect, useState } from 'react';
import Link from 'next/link'

import Servant from '../src/entities/Servant'
import ServantListing from '../src/backend/ServantListing'

export default function ListServants() {
  const initialValue: Servant[] = []
  const [servants, setServants] = useState(initialValue)

  useEffect(() => {
    async function loadServants() {
      const servants = await new ServantListing().execute()
      setServants(servants)
    }
    loadServants()
  }, [])

  return (
    <div>
      {servants.map(servant => (
        <div key={servant.id}>
          <div>
            <Link href={{pathname: "/servants/[id]", query: { id: servant.id }}}>
              {servant.name}
            </Link>
            <span>[{servant.className}]</span>
          </div>
        </div>
      ))}
    </div>
  )
}
