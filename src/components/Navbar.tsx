import Link from 'next/link'
import React from 'react'
import Signout from '../backend/Signout'

interface Props {
}

class Navbar extends React.Component<Props> {
  render() {
    return <>
      <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="px-2 mx-2 navbar-start">
          <span className="text-lg font-bold">Actixexp</span>
        </div>
        <div className="hidden px-2 mx-2 navbar-end lg:flex">
          <div className="flex items-stretch">
            <a href="/" className="btn btn-ghost btn-sm rounded-btn">Home</a>
            <a href="/servants" className="btn btn-ghost btn-sm rounded-btn">Servants</a>
            <a href="/signout" onClick={handleSignout} className="btn btn-ghost btn-sm rounded-btn">Logout</a>
          </div>
        </div>
      </nav>
    </>
  }
}

const handleSignout = function(event: React.MouseEvent<HTMLElement, MouseEvent>) {
  event.preventDefault()

  new Signout().execute().then(() => {
    globalThis.location.assign("/")
  })
}

export default Navbar
