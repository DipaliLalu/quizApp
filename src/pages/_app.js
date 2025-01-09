// pages/_app.js
import { NextUIProvider } from '@nextui-org/react';
import { Inter } from 'next/font/google'
import "../styles/globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })
function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider className={inter.className}>
       <Toaster position="top-right" reverseOrder={false}   toastOptions={{
                    duration: 3000,  
                }}/>
      <Component {...pageProps} className="dark" />
    </NextUIProvider>
  );
}

export default MyApp;
