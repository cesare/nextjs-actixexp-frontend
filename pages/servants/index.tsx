import { useEffect, useState } from 'react';

import Servant from '../../src/entities/Servant'
import ServantListing from '../../src/backend/ServantListing'
import ServantList from '../../src/components/ServantList'

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

  return <ServantList servants={servants} />
}
