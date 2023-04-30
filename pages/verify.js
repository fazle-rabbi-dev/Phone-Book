import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const Verify = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setisValidToken] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  
  useEffect(() => {
    
    if(localStorage.getItem('user_data')){
      let token = localStorage.getItem('user_data');
      router.push('/dashboard');
    }
    else{
      // setIsloading(false);
      if(router.query.token){
      const token = router.query.token;
      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verify?token=${token}`)
      .then((res) => res.json())
      .then((response) => {
        if(response.success){
          setIsLoading(false);
          setisValidToken(true);
          setMessage(response.message);
        }
        else{
          setIsLoading(false);
          setisValidToken(true);
          setMessage(response.message);
          setError(true);
        }
      })
      .catch(e=>{
        // setIsLoading(false);
        // setisValidToken(false);
        alert(e.message)
        setError(true);
      });
    }
    }
    
  },[router.query]);
  
  return (
    <div class="my-4 md:mx-20">
      <h2 class="text-3xl mb-5 text-center font-bold">Account Activating</h2>
      {
        isLoading ? <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
        : 
        isValidToken && message && <div class="mx-5 text-center">
          {!error && <div class="text-8xl text-center flex justify-center "><Icon color="indigo" icon="mdi:tick-circle" /></div>}
          {error && <div class="text-8xl text-center flex justify-center "><Icon color="red" icon="ic:sharp-error" /> </div>}
          {error && <h3 class={`text-red-600 font-bold`}>{message}</h3>}
          {!error && <h3 class={`text-indigo-600 font-bold`}>{message}</h3>}
          {!error && <p>You can <Link class="text-indigo-600" href="/signin">sign in</Link> now</p>}
        </div>
      }
    </div>
  )
}

export default Verify
