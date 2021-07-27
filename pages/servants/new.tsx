import Router from 'next/router'
import { useState } from 'react'
import ServantClassSelector from '../../src/components/ServantClassSelector'

interface ServantRegistrationParameters {
  name: String,
  className: String,
}

export default function NewServantForm() {
  const [servantName, setServantName] = useState('')
  const [servantClass, setServantClass] = useState('')

  const register: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const uri = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/servants`
    const response = await fetch(
      uri, {
        body: JSON.stringify({
          name: servantName,
          class_name: servantClass,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "no-cache",
        credentials: 'include',
        method: "POST",
      }
    )
    if (response.ok) {
      const result = await response.json()
      Router.push("/servants")
    }
    else {
      console.log(response.body)
    }
  }

  return (
    <form onSubmit={register}>
      <div>
        <label htmlFor="name">name</label>
        <input id="name" name="name" type="text" onChange={e => setServantName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="className">class</label>
        <ServantClassSelector onClassnameChange={value => setServantClass(value)} />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  )
}
