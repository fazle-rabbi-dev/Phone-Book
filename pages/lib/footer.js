import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div class="text-center bg-black text-white p-4">
      <p>Made With &hearts; By <a class="underline" href="https://bio-link.github.io/im-fazle-rabbi/">Fazle Rabbi</a></p>
      <Link class="text-sm underline text-center block" href="https://t.me/fhrabbi">Report a problem</Link>
    </div>
  )
}

export default Footer
