import { useState,useEffect } from "react";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const SignInThree = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secretkey, setSecretkey] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  
  useEffect(() => {
    if(localStorage.getItem('user_data')){
      let token = localStorage.getItem('user_data');
      // setIsLoggedIn(true);
      router.push('/dashboard');
      setIsLoggedIn(true);
    }
    else{
      setIsLoading(false);
      setIsLoggedIn(false);
    }
    
  },[]);
  
  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    
    if(targetName == 'email'){
      setEmail(targetValue)
    }
    
    else if(targetName == 'password'){
      setPassword(targetValue)
    }
    
    else if(targetName == 'secretkey'){
      setSecretkey(targetValue)
    }
    
  };
  
  function validateFields(email, password, secretkey) {
      let errors = {};
    
      // Check if email is empty and in a valid format
      if (!email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
      }
    
      // Check if password is empty and at least 6 characters long
      if (!password) {
        errors.password = "Password is required";
      } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      }
    
      // Check if secretKey is empty and equals "mysecretkey"
      if (!secretkey) {
        errors.secretkey = "Secret key is required";
      } else if (secretkey.length < 6) {
        errors.secretkey = "Secret key is must be at least 6 characters long";
      }
  
    return errors;
  }
  
  const login = async(e) => {
    e.preventDefault();
    const isValid = validateFields(email,password,secretkey);
    if(isValid.email){
      toast.error(isValid.email)
    }
    else if(isValid.password){
      toast.error(isValid.password)
    }
    else if(isValid.secretkey){
      toast.error(isValid.secretkey)
    }
    else{
      try {
        // setIsLoading(true);
        setIsSigningIn(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            secretkey
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
        // alert(JSON.stringify(response,null,3))
        if(response.success){
          // store in localStorage
          // alert(JSON.stringify(response.user_data,null,3))
          localStorage.setItem('user_data',JSON.stringify(response.user_data));
          toast.success(response.message)
          router.push('/dashboard');
        }
        else{
          toast.error(response.message)
          // setIsLoading(false)
          setIsSigningIn(false)
        }
      } catch (e) {
        toast.error("Please check your internet connection!");
        // setIsLoading(false)
        setIsSigningIn(false)
      }
    }
  };
  
  /*if(isLoggedIn){
    return router.push('/dashboard');
  }*/
  
  return (
    <div className="">
      <ToastContainer/>
      {
       isLoading ? <div>
        <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
        {/*<h3 class="text-center">Redirecting ...</h3>*/}
      </div>
       :<div class="mx-6 my-5 md:mx-20">
          <h2 className="text-3xl font-bold leading-tight text-black ">
            Sign in
          </h2>
          <p className="mt-2 text-base text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              title=""
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              Create a free account
            </Link>
          </p>

          <form onSubmit={login} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={email}
                    name="email"
                  ></input>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 "
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <Link
                    href="/forgot"
                    title=""
                    className="text-sm font-medium text-indigo-600 hover:underline hover:text-indigo-700 focus:text-indigo-700"
                  >
                    {" "}
                    Forgot password?{" "}
                  </Link>
                </div>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={password}
                    name="password"
                  ></input>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 "
                  >
                    {" "}
                    Secret Key{" "} <Link href="/secretkey" class="text-indigo-600 text-sm ">Read this.Important!</Link>
                  </label>
                </div>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="text"
                    placeholder="Secret Key"
                    onChange={handleChange}
                    value={secretkey}
                    name="secretkey"
                  ></input>
                </div>
              </div>

              <div>
                <button 
                    className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 disabled:bg-indigo-400 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    disabled={isSigningIn}
                  >
                  {isSigningIn ? 'Signing in ...' : 'Sign in'}
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
          </form>
        </div>
      }
    </div>
  );
};

SignInThree.displayName = "SignInThree"

export default SignInThree;