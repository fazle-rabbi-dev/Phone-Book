import { useState, useEffect } from "react";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


const SignUpThree = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretkey, setSecretKey] = useState('');
  const [isloading, setIsloading] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  useEffect(() => {
    if(localStorage.getItem('user_data')){
      let token = localStorage.getItem('user_data');
      router.push('/dashboard');
    }
    else{
      setIsLoading(false);
    }
  },[]);
  
  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    if(target == 'name'){
      setName(value);
    }
    else if(target == 'email'){
      setEmail(value)
    }
    else if(target == 'password'){
      setPassword(value)
    }
    else if(target == 'secretkey'){
      setSecretKey(value)
    }
    
  };
  
  function validateFields(name, email, password, secretKey) {
    let errors = {};
  
    // Check if name is empty
    if (!name) {
      errors.name = "Name is required";
    }
  
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
    /*if (!secretKey) {
      errors.secretKey = "Secret key is required";
    } else if (secretKey.length < 6) {
      errors.secretKey = "Secret key is must be at least 6 characters long";
    }*/

  return errors;
}
  
  const createAccount = async(e) => {
    e.preventDefault();
    const validation = validateFields(name,email,password,secretkey);
    if(validation.name){
      toast.error(validation.name);
    }
    else if(validation.email){
      toast.error(validation.email);
    }
    else if(validation.password){
      toast.error(validation.password);
    }
    else if(validation.secretKey){
      toast.error(validation.secretKey);
    }
    else{
      try {
        // setIsloading(true);
        setIsSigningIn(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
            // secretkey is not required
            secretkey: 'abc'
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
        if(response.success){
          toast.success(response.message);
          toast.success("We sent an email with activation link to your email address.Please check your inbox and complete registration by clicking on registration link");
          setName('');
          setEmail('')
          setPassword('')
          setSecretKey('')
          setIsloading(false);
          setTimeout(function() {
            router.push('/signin');
          }, 7000);
          
          // alert(JSON.stringify(response.user))
          // localStorage.setItem('user',JSON.stringify(response.user))
        }
        else{
          toast.error(response.message);
          // setIsloading(false);
          setIsSigningIn(false)
        }
      } catch (e) {
        toast.error("Please check your internet connection!");
        // setIsloading(false);
        setIsSigningIn(false)
      }
    }
  };
  
  return (
    <div className="">
      <ToastContainer/>
      { isLoading ? <div>
        <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
        {/*<h3 class="text-center">Redirecting ...</h3>*/}
      </div>
       :<div class="mx-6 my-5 md:mx-20">
        <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black ">
            Sign Up
          </h2>
          <p className="mt-2 text-base text-gray-600 ">
            Already have an account?{" "}
            <Link
              href="/signin"
              title=""
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              Sign In
            </Link>
          </p>

          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter You Full Name"
                    id="name"
                    name="name"
                    value={name}
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    name="email"
                    value={email}
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900 "
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
                    type="password"
                    placeholder="Enter Your Password"
                    id="password"
                    name="password"
                    value={password}
                  ></input>
                </div>
              </div>
              {
              /*<div>
                <label
                  htmlFor="secretkey"
                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                >
                  {" "}
                  Secretkey <Link href="/secretkey" class="text-indigo-600 text-sm ">Read this.Important!</Link>
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    placeholder="Ex:111000"
                    id="secretkey"
                    name="secretkey"
                    value={secretkey}
                  ></input>
                </div>
              </div>*/
            }
              <div>
                <button disabled={isSigningIn} onClick={createAccount} className="disabled:bg-indigo-400 w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
                  {isloading ? "Creating Account..." : "Get started"}
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
      </div>
      }
    </div>
  );
};

SignUpThree.displayName = "SignUpThree";

export default SignUpThree;