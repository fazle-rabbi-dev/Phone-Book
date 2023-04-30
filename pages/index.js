import {useState,useEffect} from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if(localStorage.getItem('user_data')){
      let token = localStorage.getItem('user_data');
      // setIsLoggedIn(true);
      router.push('/dashboard');
    }
    else{
      // setIsLoggedIn(false);
      setIsLoading(false);
    }
    
  },[]);
  
  return (
    <div class="my-2 mt-[100px] mx-4 md:mx-20">
      { isLoading ? <div>
        <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
        {/*<h3 class="text-center">Redirecting ...</h3>*/}
      </div>
      :<div class="">
      <div class="">
        <h1 class="leading-snug text-4xl font-bold text-black">
          Easily Create and Manage Contacts with This Phone-Book App
        </h1>
        <h2 class="text-xl font-light mt-3">
          🤩 Keep All Your Contacts in One Place!
        </h2>
      <div class="my-4">
        {/*Signup & Signin Button*/}
        <div class="flex justify-between items-center">
          <button
            onClick={()=>router.push('/signin')}
            class="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
            Sign in
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
            </svg>
          </button>
          <button
            onClick={()=>router.push('/signup')}
            class="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 ml-2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
            </svg>
          </button>
        </div>
      </div>
      </div>
      
              {
          cardData.map(data=>{
            return(
              <div class="">
                <div class=" my-3 p-[.9px] bg-gradient-to-r from-green-400 to-indigo-400">
                  <div class="bg-white p-4">
                    <h2 class="text-xl mb-3 font-bold">
                      {data.title}
                    </h2>
                    <p>
                      {data.details}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      
      </div>
      }
    </div>
  )
}

export default Home


const cardData = [
    {
      "title": "Contact Management",
      "details": "You can easily manage your contacts, including adding, editing, and deleting contact."
    },
    {
      "title": "Search",
      "details": "You will be able to search for contacts by name.A search bar is available on the user dashboard."
    },
    {
      "title": "Forgot Password",
      "details": "If you forget your password, you will be able to easily reset it. A Forgot Password button available in sign in page, which takes you to the password reset page."
    },
    {
      "title": "Data Encryption",
      "details": "Phone-Book encrypts all contact data before storing it in the database. This means that the data is converted into a code that is unreadable without the secret key."
    },
  ]



