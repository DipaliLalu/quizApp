import Ripple from '@/components/ui/ripple';
import { endPoint } from '@/helper/axios';
import { Form, Input, Button } from '@nextui-org/react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Signin() {
  const router=useRouter();
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url=endPoint.auth.signIn;
      const response=await axios.post(url,formData);
      // const response = await axios.post('/api/users/login', formData);

      toast.success("Login successfully");
      router.push(response.data.redirectUrl);
      setFormData({ username: '', password: '' });
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    }
  };
  return (
    <div className='w-full flex flex-col justify-center items-center h-screen overflow-hidden'>
      <Ripple />
      <div className=' flex flex-col gap-7 border-4 p-7 rounded-xl border-slate-400'>

        <h2 className='text-2xl font-semibold text-blue-900'>Sign In</h2>
        <Form className="w-96 max-w-xs flex flex-col gap-5" validationBehavior="native" onSubmit={onSubmit}>
          <Input
            isRequired
            label="Username"
            labelPlacement="outside"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            type="text"
            validate={(value) => {
              if (value.length < 3) {
                return "Username must be at least 3 characters long";
              }

            }}
          />
          <Input
            isRequired
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters long";
              }
            }}
          />
          <p className='text-sm'>Don't have an account? <Link href={'/auth/signup'} className='underline'>Sign Up</Link></p>
          <Button type="submit" color='primary'>
            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Signin
