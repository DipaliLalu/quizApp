import Link from 'next/link'
import React from 'react'

function verify() {
  return (
    <div>
      Successful verify
      <button><Link href="/auth/signin">Login</Link></button>
    </div>
  )
}

export default verify
