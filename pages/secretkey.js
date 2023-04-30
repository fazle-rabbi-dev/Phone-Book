import React from 'react'

const Secrerkey = () => {
  return (
    <div class="my-3 md:mx-20">
      {/*<h2 class="text-center text-black text-4xl mb-4 font-bold">Secretkey</h2>*/}
      <div class="my-4 mx-4">
        <h2 class="text-black text-4xl font-bold mb-2">What is Secretkey exactly?</h2>
        <p class="border border-1 border-gray-400 bg-zinc-50 p-3 rounded text-black text-justify text-center">
          It is the secret key that is used
          to encrypt your contact information
          before saved in database.And this
          secretkey will not stored in database.That's
          why, no one but you can only see your saved contact information. 
          Not even the developer of this app!
        </p>
        <p class="mt-4 border border-1 border-gray-400 bg-zinc-50 p-3 rounded text-black text-justify text-center">
          <span class="font-bold">NOTE: </span>Keep your secretkey secret and remember that, everytime you try
          to login to your account
          you will need this secretkey.And you can't
          login without your secret key!
          And you can't change this secretkey
          once signup!
        </p>
      </div>
      <div class="m-4 my-4">
        <h2 class="text-black text-4xl font-bold mb-2">What to write as secretkey?</h2>
        <p>You can write anything as your secretkey with minimum length of 6 digit.</p>
        <h3 class="font-bold underline">Example: 123456</h3>
      </div>
    </div>
  )
}

export default Secrerkey
