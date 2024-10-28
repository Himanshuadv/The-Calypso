import {useState} from 'react'
import { IoMdMail } from "react-icons/io";
import Button from './Button';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import googleLogo from "../assets/google.svg"
import { FaRegIdCard } from "react-icons/fa";

function Register({setIsSignin,isSignIn}) {
    const [showPassword,setShowPassword] = useState(false)
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
     <h1 className='text-2xl text-teal-500 w-full text-center mb-[2rem]'>Create New Account</h1>
        <form action="" className='w-1/4 mt-2'>     
            <div className='relative flex items-center justify-center border-b-2 border-b-teal-400 w-full'>
                <input type="number" id="reg" required placeholder='' className='w-full login__input focus:outline-none border-2 border-transparent rounded-lg transition-[bordeer-color] duration-300 p-4'/>
                <label htmlFor="reg" className='absolute left-[1.25rem] login__label transition-transform duration-400'>Registration number</label>
                <FaRegIdCard className='text-2xl'/>
            </div>
            <div className='relative flex items-center justify-center border-b-2 border-b-teal-400 w-full'>
                <input type="email" id="email" required placeholder='' className='w-full login__input focus:outline-none border-2 border-transparent rounded-lg transition-[bordeer-color] duration-300 p-4'/>
                <label htmlFor="email" className='absolute left-[1.25rem] login__label transition-transform duration-400'>Email</label>
                <IoMdMail className='text-2xl'/>
            </div>
            <div className='relative flex items-center justify-center border-b-2 border-b-teal-400 w-full'>
                <input type={showPassword?"text":"password"} id='password' required placeholder='' className='w-full login__input focus:outline-none border-2 border-transparent rounded-lg transition-[bordeer-color] duration-300 p-4' />
                <label htmlFor="password" className='absolute left-[1.25rem] login__label transition-transform duration-400'>Password</label>
                <div onClick={()=>setShowPassword(!showPassword)} className='cursor-pointer'>
                    {showPassword?<FaEye className='text-2xl'/>:<FaEyeSlash className='text-2xl'/>}
                </div>

            </div>
            <Button primary outline type="submit" rounded >Sign In</Button>
        </form>
        <div className='flex flex-col text-center items-center'>
            <p>Or Login with</p>
            <a href="#" className='p-2 items-center text-center w-full'>
                <img src={googleLogo} alt="image" className='w-[1.5rem]  transition-all duration-300 hover:-translate-y-2' />
            </a>
        </div>
        <p>Already have an account? <span onClick={() => setIsSignin(true)} className='hover:text-blue-500 cursor-pointer'>Sign in</span></p>

    </div>
  )
}

export default Register