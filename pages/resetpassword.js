import { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [npassword, setNpassword] = useState('')
  const [cnpassword, setCnpassword] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [isChangingPassword, setisChangingPassword] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const router = useRouter();
  
  useEffect(() => {
    
    if(router.asPath.includes('token')){
      let token = router.asPath.slice(router.asPath.indexOf('?')+1,router.asPath.length)
      if(token.startsWith('token')){
        token = token.slice(6,token.length);
        setisChangingPassword(true)
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/resetpassword?token=${token}`)
          .then((res) => res.json())
          .then((response) => {
            // alert(JSON.stringify(response,null,3))
            if(response.success){
              // toast.success("Password changed successful")
              setIsTokenValid(true)
              // setIsLoading(true)
              setNpassword('')
              setCnpassword('')
              setisChangingPassword(false)
              // router.push('/signin');
              setIsLoading(false)
            }
            // When token invalid
            else{
              // toast.error("Token is not valid!")
              router.push('/forgot')
            }
          })
          .catch(e=>{
            toast.error(e.message)
            setIsLoading(false)
            setNpassword('')
            setCnpassword('')
            setisChangingPassword(false)
          })
      }
      // When token not found (currectly) in url
      else{
        // toast.error("Token not found!")
        router.push('/forgot')
        return;
      }
    }
    // When token not found in url
    else{
      // toast.error("Token not found!")
      router.push('/forgot')
      return;
    }
    
  },[]);
  
  const changePassword = async() => {
    if(npassword.length < 6 || cnpassword.length < 6){
      toast.error("Password must be at least 6 digit");
      return;
    }
    if(npassword != cnpassword){
      toast.error("Password did't matched!")
      return;
    }
    
    try {
      setIsLoading(true);
      const token = router.query.token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/resetpassword`, {
          method: 'POST',
          body: JSON.stringify({
            npassword,token
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
        if(response.success){
          toast.success(response.message);
          setButtonDisabled(true);
          setIsLoading(false);
          setNpassword('');
          setCnpassword('')
          setTimeout(function() {
            router.push('/signin')
          }, 2000);
        }
        else{
          toast.error(response.message);
          setIsLoading(false);
        }
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
    
    
  }

  if(isLoading){
    return <div class="my-2">
      <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
    </div>
  }
  
  /*if(!isLoading && !isTokenValid){
    alert('not show')
  }*/
  
  return (
    <div class="my-4 md:mx-20">
      <ToastContainer/>
      <h2 class="text-3xl font-bold text-center">Set New Password</h2>
      <div class="m-4">
        <div className="my-2.5">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="password"
              required
              placeholder="New Password"
              onChange={(e)=>setNpassword(e.target.value)}
              value={npassword}
              name="npassword"
            ></input>
          </div>
          <div className="my-2.5">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="password"
              required
              placeholder="Confirm New Password"
              onChange={(e)=>setCnpassword(e.target.value)}
              value={cnpassword}
              name="cnpassword"
            ></input>
          </div>
          <button 
              className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 disabled:bg-indigo-400 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
              disabled={isChangingPassword || buttonDisabled}
              onClick={changePassword}
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
      </div>
    </div>
  )
}

export default ResetPassword
