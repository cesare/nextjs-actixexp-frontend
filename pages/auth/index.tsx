import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import AuthInitiation from '../../src/backend/AuthInitiation'

export default function AuthIndex({ authParams }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return(
    <div>
      <div>{authParams.clientId}</div>
      <div>{authParams.scope}</div>
      <div>{authParams.state}</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const authParams = await new AuthInitiation().execute()
  return {
    props: {
      authParams
    }
  }
}
