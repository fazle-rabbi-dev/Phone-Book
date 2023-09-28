import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Header = () => {
  return (
    <header class="fixed w-full top-0 h-[60px] bg-gray-100 shadow text-black p-4 flex items-center justify-between">
      <div class="">
        <Link href="/">
          <h2 class="text-xl font-bold flex gap-2">
            <img src="/logo.png" alt="Logo" width="30px" height="7px" />
            Phone-Book
          </h2>
        </Link>
      </div>
      <div class="flex items-center space-x-2">
        <Link href="https://github.com/fh-rabbi/Phone-Book/issues/new">
          <p class="text-3xl">
            <Icon icon="bi:bug" color="black" />
          </p>
        </Link>
        <Link href="https://github.com/fh-rabbi/Phone-Book">
          <p class="text-4xl">
            <Icon icon="ri:github-fill" color="black" />
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
