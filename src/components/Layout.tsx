import { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
  children: ReactNode;
}

export function Layout({ children, ...props }: Props) {
  return <>
    <Navbar />
    <div {...props}>{children}</div>
  </>
}
