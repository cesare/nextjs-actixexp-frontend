import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import SingleServant from '../../src/backend/SingleServant'

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

  const response = await new SingleServant({ id: id }).execute()
  if (!response.ok) {
    return { notFound: true }
  }

  const json = await response.json()
  const servant = {
    id: json.id,
    name: json.name,
    className: json.class_name,
  }

  return {
    props: {
      servant
    },
  }
}
