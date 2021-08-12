import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import AuthInitiation from '../../src/backend/AuthInitiation'

export default function AuthIndex({ authRequest }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return(<div>dummy</div>)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const authRequest = await new AuthInitiation().execute()
  return {
    redirect: {
      statusCode: 302,
      destination: authRequest.requestUri,
    }
  }
}
