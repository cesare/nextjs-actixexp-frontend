import { GetStaticProps, GetStaticPropsContext } from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import Servant from '../src/entities/Servant'
import ServantListing from '../src/backend/ServantListing'

export default function Servants({ servants }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      {servants.map((servant: Servant) => (
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

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const servants = await new ServantListing().execute()
  return {
    props: {
      servants,
    },
  }
}
