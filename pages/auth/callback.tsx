import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

export default function AuthCallback({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return(
    <div>
      <p>{query.state}</p>
      <p>{query.code}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const state = context.query.state
  const code = context.query.code
  const query = {
    state: state,
    code: code,
  }

  return {
    props: { query }
  }
}
