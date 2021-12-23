import Router from 'next/router'
import { useState } from 'react'
import { Layout } from '../../src/components/Layout'
import ServantNameInput from '../../src/components/ServantNameInput'
import ServantClassSelector from '../../src/components/ServantClassSelector'
import ServantRegistration from '../../src/backend/ServantRegistration'

export default function NewServantForm() {
  const [servantName, setServantName] = useState('')
  const [servantClass, setServantClass] = useState('')

  const register: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const params = {
      name: servantName,
      className: servantClass,
    }
    const response = await new ServantRegistration(params).execute()
    if (response.ok) {
      const result = await response.json()
      Router.push("/servants")
    }
    else {
      console.log(response.body)
    }
  }

  return <>
    <Layout>
      <form onSubmit={register}>
        <div>
          <label htmlFor="name">name</label>
          <ServantNameInput onNameChange={setServantName} />
        </div>
        <div>
          <label htmlFor="className">class</label>
          <ServantClassSelector onClassnameChange={setServantClass} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </Layout>
  </>
}
