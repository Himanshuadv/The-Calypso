import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import Button from "./Button";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import googleLogo from "../assets/google.svg";
function Signin({ setIsSignin, isSignIn }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl text-teal-500 w-full text-center mb-[2rem]">
        Log in to your account.
      </h1>
      <form action="" className="w-1/4 mt-2">
        <div className="relative flex items-center justify-center border-b-2 border-b-teal-400 w-full">
          <input
            type="email"
            id="email"
            required
            placeholder=""
            className="w-full login__input focus:outline-none border-2 border-transparent rounded-lg transition-[bordeer-color] duration-300 p-4"
          />
          <label
            htmlFor="email"
            className="absolute left-[1.25rem] login__label transition-transform duration-400"
          >
            Email
          </label>
          <IoMdMail className="text-2xl" />
        </div>
        <div className="relative flex items-center justify-center border-b-2 border-b-teal-400 w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            placeholder=""
            className="w-full login__input focus:outline-none border-2 border-transparent rounded-lg transition-[bordeer-color] duration-300 p-4"
          />
          <label
            htmlFor="password"
            className="absolute left-[1.25rem] login__label transition-transform duration-400"
          >
            Password
          </label>
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          >
            {showPassword ? (
              <FaEye className="text-2xl" />
            ) : (
              <FaEyeSlash className="text-2xl" />
            )}
          </div>
        </div>
        <Button primary outline type="submit" rounded>
          Sign In
        </Button>
      </form>
      <div className="flex flex-col text-center items-center">
        <p>Or Login with</p>
        <a
          href="#"
          className="p-2 flex justify-center items-center text-center w-full bg-white border-2 border-white rounded-lg shadow-xl hover:shadow-cyan-500 shadow-cyan-200 m-4"
        >
          <img
            src={googleLogo}
            alt="image"
            className="w-[2rem]  transition-all duration-300 hover:-translate-y-2"
          />
        </a>
      </div>
      <p className="cursor-pointer">
        Create an account-{" "}
        <span onClick={() => setIsSignin(false)} className="hover:text-sky-500">
          Register
        </span>
      </p>
    </div>
  );
}

export default Signin;
