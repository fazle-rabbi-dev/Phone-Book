import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div class="bg-white border-t-[1px] border-t-gray-100 text-black mt-10 p-4">
      <p>
        Made With &hearts; By{" "}
        <a class="underline" href="https://bio-link.github.io/im-fazle-rabbi/">
          Fazle Rabbi
        </a>
      </p>
      <Link
        class="text-sm text-gray-600 underline"
        href="https://t.me/fhrabbi"
      >
        Report a problem
      </Link>
    </div>
  );
};

export default Footer;
