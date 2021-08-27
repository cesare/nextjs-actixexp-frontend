import { useEffect } from 'react';
import AuthInitiation from '../../src/backend/AuthInitiation'

export default function AuthIndex() {
  useEffect(() => {
    const authRequest = new AuthInitiation().execute()
    authRequest.then(auth => {
      window.location.assign(auth.requestUri)
    })
  })
  return(<div>dummy</div>)
}
