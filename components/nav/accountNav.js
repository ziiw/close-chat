import { Fragment } from 'react'
import Link from 'next/link'

const AccountNav = props => {
  return (
    <nav>
      <Link href='/account'><a>Profil</a></Link><br />
      <Link href='/account/communities'><a>Communities</a></Link><br />
      <Link href='/account/payment'><a>Payment</a></Link>
    </nav>
  )
}

export default AccountNav