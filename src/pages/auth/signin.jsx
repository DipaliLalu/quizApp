import Ripple from '@/components/ui/ripple';
import { Form, Input, Button } from '@nextui-org/react';
import { Spacer } from '@nextui-org/spacer';
import Link from 'next/link';
import React from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Signin() {
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        setFormData({
          username: '',
          password: '',
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };
  return (
    <div className='w-full flex flex-col justify-center items-center h-screen'>
      <Ripple />
      <div className=' flex flex-col gap-7 border-4 p-5 rounded-xl border-slate-400'>

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

              return value === "admin" ? "Nice try!" : null;
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

              return value === "admin" ? "Nice try!" : null;
            }}
          />
          <p className='text-sm'>Don't have an account? <Link href={'/auth/signup'} className='underline'>Sign Up</Link></p>
          <Button type="submit" color='primary'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Signin
