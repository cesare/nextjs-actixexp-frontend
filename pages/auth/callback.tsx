import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import AuthCallback from '../../src/backend/AuthCallback'

export default function Callback({ result }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return(
    <div>
      <p>{result.identifier}</p>
      <p>{result.username}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const state = context.query.state
  const code = context.query.code
  if (typeof state != "string" || typeof code != "string") {
    return {
      notFound: true
    }
  }

  const result = await new AuthCallback(code, state).execute()

  return {
    props: { result }
  }
}
