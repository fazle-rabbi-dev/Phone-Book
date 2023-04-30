import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


const Forgot = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if(localStorage.getItem('user_data')){
      router.push('/dashboard')
    }
    else{
      setIsLoading(false)
    }
  },[]);
  
  const forgotPassword = async(e) => {
    e.preventDefault()
    try {
      setIsRequesting(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
          method: 'POST',
          body: JSON.stringify({
            email
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
        if(response.success){
          toast.success(response.message);
          setIsRequesting(false)
          setEmail('');
        }
        else{
          toast.error(response.message);
          setIsRequesting(false)
        }
    } catch (e) {
      toast.error(e.message);
      setIsRequesting(false)
    }
  }
  
  if(isLoading){
    return <div class="my-2">
      <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
    </div>
  }
  
  return (
    <div class="">
      <ToastContainer/>
      <h2 class="text-center text-3xl font-bold">Forgot Password</h2>
      <form onSubmit={forgotPassword} class="mx-4 mt-4 md:mx-20" accept-charset="utf-8">
          <div className="my-2.5">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="email"
              required
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              name="email"
            ></input>
          </div>
          <button 
              className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 disabled:bg-indigo-400 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
              disabled={isRequesting}
            >
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
      </form>
    </div>
  )
}

export default Forgot
