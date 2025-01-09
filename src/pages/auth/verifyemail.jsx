import { WarpBackground } from '@/components/ui/warp-background';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function verify() {
  const router=useRouter();
  const [token, setToken] = useState("");
 
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", token);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    const {query}=router;
    const urlToken=query.token;
    setToken(urlToken);
    
      verifyUserEmail();
    
  },[token])

  return (
    <WarpBackground className='h-screen flex justify-center items-center'> 
      <Card className="w-80 text-center p-3 bg-slate-600">
          <CardHeader className="text-2xl justify-center font-semibold">Your Email Verify</CardHeader>
        <CardBody className="flex flex-col gap-2 p-3">
          <Link href={'/auth/signin'} className='bg-blue-500 p-3 font-bold rounded-lg w-11/12 m-auto text-center'>Login</Link>
        </CardBody>
      </Card>
    </WarpBackground>

  )
}

export default verify
