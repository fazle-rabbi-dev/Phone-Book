import '@/styles/globals.css'
import { useState,useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {useRouter} from 'next/router';
import NavBar from './lib/navBar'
import Footer from './lib/footer'
import Head from 'next/head';


const exclude = ['/dashboard','/myaccount'];

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter();


  useEffect(() => {
    router.events.on('routeChangeStart', ()=>setProgress(30));
    router.events.on('routeChangeComplete', ()=>setProgress(100));
    // alert(router.asPath)
  },[]);

  return(
    <>
      <Head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
        <meta name="theme-color" content="#222"/>
        <meta name="author" content="fazle-rabbi"/>
        <meta property="og:title" content="Phone-Book" />
        <meta property="og:description" content="Organize your contacts easily with our user-friendly phone-book web app. Keep all your important contact information in one secure place. Say goodbye to lost or forgotten phone numbers and hello to streamlined communication. Try it now!" />
        <meta property="og:image" content="/logo.png" />
        <title>Phone-Book</title>
        {router.asPath.includes('/signin') && <title>Phone-Book Sign In</title>}
        {router.asPath.includes('/signup') && <title>Phone-Book Sign Up</title>}
        {router.asPath.includes('/forgot') && <title>Phone-Book Forgot Password</title>}
        {router.asPath.includes('/resetpassword') && <title>Phone-Book Reset Password</title>}
        {router.asPath.includes('/secretkey') && <title>Phone-Book Secret Key</title>}
        <meta name="keywords" content="Phone-Book fhrabbi fh-rabbi fazle-rabbi fazle rabbi contacts fhrabbi-phone-book Phone-Book-fhrabbi manage-contacts "/>
        <meta name="description" content="Organize your contacts easily with our user-friendly phone-book web app. Keep all your important contact information in one secure place. Say goodbye to lost or forgotten phone numbers and hello to streamlined communication. Try it now!"/>  
        {/*Fav Icon*/}
        <link rel="shortcut icon" type="image/ico" href="/favicon.ico" title="Logo" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      
      {!exclude.includes(router.asPath) && <NavBar/>}
      <LoadingBar
        color='hsl(243, 75.4%, 58.6%)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {
       router.asPath.includes('/dashboard') || router.asPath.includes('/myaccount') ?  <div class="min-h-[100vh]">
          <Component {...pageProps} />
        </div>
        :
        <div class="mt-[100px] min-h-[100vh]">
          <Component {...pageProps} />
        </div>
        
      }
      {!exclude.includes(router.asPath) && <Footer/>}
    </>
    )
}
