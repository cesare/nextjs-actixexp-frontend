import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Servant from '../../src/entities/Servant'
import SingleServant from '../../src/backend/SingleServant'
import { NotFound } from '../../src/backend/errors'

export default function ShowServant() {
  const router = useRouter()
  const [servant, setServant] = useState<Servant>()
  const fetchServant = async () => {
    if (router.isReady) {
      const id = router.query.id as string
      const value = await new SingleServant({ id: id }).execute()
      setServant(value)
    }
  }

  useEffect(() => {
    fetchServant()
  }, [router.query])

  if (servant) {
    return (
      <div key={servant.id}>
        <div>{servant.name}</div>
        <div>[{servant.className}]</div>
      </div>
    )
  }
  else {
    return <div />
  }
}
