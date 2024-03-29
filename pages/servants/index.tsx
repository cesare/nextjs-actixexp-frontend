import Head from 'next/head'
import useSWR from 'swr'

import Servant from '../../src/entities/Servant'
import ServantListing from '../../src/backend/ServantListing'
import ServantList from '../../src/components/ServantList'
import { Layout } from '../../src/components/Layout'


export default function ListServants() {
  const fetcher = (path: string): Promise<Servant[]> => {
    return new ServantListing().execute()
  }

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
  const { data: servants, error } = useSWR("/servants", fetcher, swrOptions)

  if (error?.status == 401) {
    globalThis.location.assign("/")
  }
  if (error) return <div>failed to load</div>
  if (!servants) return <div>loading...</div>

  return <>
    <Layout>
      <Head>
        <title>Servants</title>
      </Head>
      <ServantList servants={servants} />
    </Layout>
  </>
}
