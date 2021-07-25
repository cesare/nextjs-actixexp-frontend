import { GetStaticProps, GetStaticPropsContext } from 'next'
import { InferGetStaticPropsType } from 'next'

type ListServantsResponse = {
  servants: Servant[],
}

type Servant = {
  id: number,
  name: String,
  class_name: String,
}

export default function Servants({ servants }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      {servants.map((servant: Servant) => (
        <div key={servant.id}>
          <div>{servant.name}</div>
          <div>[{servant.class_name}]</div>
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/servants`
  const response = await fetch(uri)
  const json: ListServantsResponse = await response.json()
  const servants: Servant[] = json.servants

  return {
    props: {
      servants,
    },
  }
}
