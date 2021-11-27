import { useEffect, useState } from 'react';

import Servant from '../../src/entities/Servant'
import ServantListing from '../../src/backend/ServantListing'
import ServantList from '../../src/components/ServantList'

export default function ListServants() {
  const [servants, setServants] = useState<Servant[]>([])
  const loadServants = async () => {
    const servants = await new ServantListing().execute()
    setServants(servants)
  }

  useEffect(() => {
    loadServants()
  }, [])

  return <ServantList servants={servants} />
}
