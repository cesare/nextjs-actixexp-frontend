import { GetStaticProps, GetStaticPropsContext } from 'next'
import { InferGetStaticPropsType } from 'next'

type Servant = {
  name: String,
  class_name: String,
}

export default function Servants({ servants }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      {servants.map((servant: Servant) => (
        <div>
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
  const response = await fetch('http://localhost:8080/servants')
  const servants: Servant[] = await response.json()

  return {
    props: {
      servants,
    },
  }
}
