import Router from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import AuthCallback from '../../src/backend/AuthCallback'

export default function Callback(result: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (result.ok) {
    Router.push("/")
  }
  return(
    <div>
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

  try {
    const auth = await new AuthCallback(code, state).execute()

    return {
      props: { ok: true, auth }
    }
  } catch(error) {
    return {
      props: { ok: false, error }
    }
  }
}
