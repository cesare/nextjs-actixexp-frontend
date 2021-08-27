import { useEffect } from 'react';
import { useRouter } from 'next/router'
import AuthCallback from '../../src/backend/AuthCallback'

export default function Callback() {
  const router = useRouter()
  const state = router.query.state
  const code = router.query.code

  useEffect(() => {
    if (typeof state == "string" && typeof code == "string") {
      const auth = new AuthCallback(code, state).execute()
      auth.then(result => {
        window.location.assign("/")
      })
    }
  })

  return(
    <div>
      <p>dummy</p>
    </div>
  )
}
