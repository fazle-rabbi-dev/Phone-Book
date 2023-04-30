import React from 'react'
import { Icon } from '@iconify/react';
import Link from 'next/link'

const NavBar = () => {
  return (
    <div class="fixed w-full top-0 h-[60px] bg-black text-white p-4 flex items-center justify-between">
      <div class="">
        <Link href="/"><h2 class="text-2xl font-bold">Phone-Book</h2></Link>
      </div>
      <div class="flex items-center space-x-2">
        <Link href="https://github.com/fh-rabbi/Phone-Book/issues/new"><p class="text-2xl"><Icon icon="bi:bug" color="white" /></p></Link>
        <Link href="https://github.com/fh-rabbi/Phone-Book"><p class="text-3xl"><Icon icon="ri:github-fill" color="white" /></p></Link>
      </div>
    </div>
  )
}

export default NavBar
