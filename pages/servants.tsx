import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'

import Servant from '../src/entities/Servant'
import ServantListing from '../src/backend/ServantListing'

type Result = {
  servants: Servant[]
}

export default function ListServants(result: Result) {
  return (
    <div>
      {result.servants.map(servant => (
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const servants = await new ServantListing().execute()
  return {
    props: {
      servants
    },
  }
}
