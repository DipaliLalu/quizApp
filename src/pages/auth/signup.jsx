import { Form, Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Ripple from '@/components/ui/ripple';
import { Loader2 } from 'lucide-react';
import { endPoint } from '@/helper/axios';


function Signup() {
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
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
            setLoading(true)
             const url=endPoint.auth.signUp;
            const response = await axios.post(url, formData);
            toast.success("Signup successfully");
            setFormData({ username: '', email: '', password: '' });
            setLoading(false)
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
        }

    };

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    return (

        <div className='w-screen flex flex-col justify-center items-center min-h-screen p-4'>
            <Ripple className='md:block hidden'/>
            <div className=' flex flex-col gap-5 border-4 p-5 md:p-9 rounded-xl border-slate-400'>

                <h2 className='text-2xl font-semibold text-blue-900'>Sign Up</h2>

                <Form className="w-full" validationBehavior="native" onSubmit={onSubmit}>
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
                        className="max-w-xs"
                        labelPlacement="outside"
                        name="email"
                        placeholder='Enter your email'
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        validate={(value) => {
                            if (!validateEmail(value)) {
                                return "enter valid email";
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
                    <p>Already Have An Account? <Link href={'/auth/signin'} className='underline'> Sign In </Link></p>
                    <Button type="submit" color='primary'>
                        {loading ? <Loader2 className="animate-spin" />: "Submit"}
                    </Button>
                </Form>
            </div>

        </div>

    )
}

export default Signup
