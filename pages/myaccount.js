import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myaccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [npassword, setNpassword] = useState('')
  const [cnpassword, setCnpassword] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  
  useEffect(() => {
    
    const getUser = async(token) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
          method: 'POST',
          body: JSON.stringify({
            token
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
        // alert(JSON.stringify(response))
        if(response.success){
          const {user} = response;
          setIsLoading(false);
          setName(user.name)
          setEmail(user.email)
        }
        else{
          // alert('false')
          localStorage.clear()
          router.push('/signin')
        }
      } catch (e) {
        // alert(e.message)
        localStorage.clear()
        router.push('/signin')
      }
    }
    
    if(localStorage.getItem('user_data')){
      let user_data = localStorage.getItem('user_data');
      user_data = JSON.parse(user_data);
      if(!user_data.token){
        localStorage.clear();
        router.push('/signin');
      }
      
      // Ok. Everything is fine now get user data by calling api with token and display them!
      getUser(user_data.token)
      // setIsLoading(false)
      
    }
    else{
      router.push('/signin')
    }
    
  },[isUpdating]);
  
  const handleChange = (e) => {
    const targetName = e.target.name;
    const value = e.target.value;
    switch (targetName) {
      case 'name':
        setName(value)
        break;
      
      case 'email':
        setEmail(value)
        break;
      
      case 'npassword':
        setNpassword(value)
        break;
      
      case 'cnpassword':
        setCnpassword(value)
        break;
      
      default:
        // code
    }
    
  }
  
  const updateBasicInfo = async(e) => {
    e.preventDefault()
    if(!name || !email || !email.includes('@') || !email.includes('.') ){
      toast.error("Name or email address is not valid!")
      return;
    }
    // Update (name & email) with api
    // updatebasicinfo.js
    if(localStorage.getItem('user_data')){
      let user_data = localStorage.getItem('user_data');
      user_data = JSON.parse(user_data);
      if(user_data.token){
        setIsUpdating(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatebasicinfo`, {
            method: 'POST',
            body: JSON.stringify({
              name,email,token:user_data.token
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const response = await res.json();
        if(response.success){
          toast.success(response.message);
          setIsUpdating(false)
        }
        // Token is not valid
        else{
          toast.error(response.message);
          // setIsUpdating(false)
          localStorage.clear();
          router.push('/signin')
        }
      }
      // Token is not found
      else{
        localStorage.clear();
        router.push('/signin')
      }
    }
    // User is not logged in
    else{
      localStorage.clear();
      router.push('/signin')
    }
  }
  
  const updatePassword = async() => {
    if(npassword.length < 6 || cnpassword.length < 6){
      toast.error("Password must be at least 6 digit!");
      return;
    }
    if(npassword != cnpassword){
      toast.error("Password didn't matched.Retype same password twice!");
      return;
    }
    // Update password with api
    if(localStorage.getItem('user_data')){
      let user_data = localStorage.getItem('user_data');
      user_data = JSON.parse(user_data);
      if(user_data.token){
        setIsUpdating(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
            method: 'PUT',
            body: JSON.stringify({
              npassword,token:user_data.token
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const response = await res.json();
        if(response.success){
          toast.success(response.message);
          setIsUpdating(false)
        }
        else{
          toast.error(response.message);
          // setIsUpdating(false)
          localStorage.clear();
          router.push('/signin')
        }
      }
      // if token is not found
      else{
        localStorage.clear();
        router.push('/signin')
      }
    }
    // if user not logged in
    else{
      localStorage.clear();
      router.push('/signin')
    }
  }
  
  
  if(isLoading){
    return <div class="my-2">
      <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
    </div>
  }
  
  return (
    <div class="my-4">
      <ToastContainer/>
      <h2 class="text-3xl text-center font-bold">Update Your Account</h2>
      <div class="m-4">
        {
        isUpdating ? <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
        :
        <form onSubmit={updateBasicInfo} class="my-2">
          <h2 class="text-lg">Basic Information</h2>
          <div className="mt-2.5">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={name}
              name="name"
            ></input>
          </div>
          <div className="mt-2.5">
            <span class="text-gray-400 text-sm">
                Email cannot be changed right now
            </span>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={email}
              name="email"
              disabled={true}
            ></input>
          </div>
          <button 
              className="mt-4 w-full inline-flex items-center justify-center rounded-md bg-indigo-600 disabled:bg-indigo-400 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
              disabled={isUpdating}
              // onClick={updateBasicInfo}
            >
              Update
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
        }
        
        {/*Change Password*/}
        <div class="mt-5">
          <h2 class="text-lg">Change Password</h2>
          <div class="my-2">
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="password"
                placeholder="New Password"
                onChange={handleChange}
                value={npassword}
                name="npassword"
              ></input>
            </div>
          </div>
          <div class="my-2">
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="password"
                placeholder="Confirm New Password"
                onChange={handleChange}
                value={cnpassword}
                name="cnpassword"
              ></input>
            </div>
          </div>
          <button 
              className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-indigo-600 disabled:bg-indigo-400 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
              disabled={isUpdating}
              onClick={updatePassword}
            >
              Update
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
        <Link class="mt-5 text-sm underline text-center block" href="https://t.me/fhrabbi">Report a problem</Link>
      </div>
    </div>
  )
}

export default Myaccount
