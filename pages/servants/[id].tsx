import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

interface Servant {
  id: string,
  name: string,
  className: string,
}

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
  if (!id) {
    return { notFound: true }
  }

  const uri = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/servants/${id}`
  const response = await fetch(uri)
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
