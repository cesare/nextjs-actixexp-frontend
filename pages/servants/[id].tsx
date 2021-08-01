import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import SingleServant from '../../src/backend/SingleServant'
import { NotFound } from '../../src/backend/errors'

export default function ShowServant({ servant }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div key={servant.id}>
      <div>{servant.name}</div>
      <div>[{servant.className}]</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id
  if (typeof id != "string") {
    return { notFound: true }
  }

  try {
    const servant = await new SingleServant({ id: id }).execute()
    return {
      props: {
        servant
      },
    }
  }
  catch (e) {
    if (e instanceof NotFound) {
      return { notFound: true }
    }
    throw e
  }
}
