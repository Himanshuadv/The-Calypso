import {useState} from 'react'
import Button from './Button'
import { IoMdMail } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import googleLogo from "../assets/google.svg";

function StudentInfo() {
    const [showPassword, setShowPassword] = useState(false);
    const styleInput = "w-full login__input focus:outline-none border-2 border-transparent rounded-lg transition-[bordeer-color] duration-300 p-4"
    const STYLE_INPUT_LABLE = "absolute left-[1.25rem] login__label transition-transform duration-400"
    const STYLE_INPUT_DIV = "relative flex items-center justify-center border-b-2 border-b-teal-400 w-1/2"
  return (
    <div className=''>
        <form action="" className='flex flex-col justify-center items-center'>
        <div className={STYLE_INPUT_DIV}>
          <input
            type="text"
            id="name"
            required
            placeholder=""
            className={styleInput}
          />
          <label
            htmlFor="name"
            className={STYLE_INPUT_LABLE}
          >
            Name
          </label>
          <IoMdMail className="text-2xl" />
        </div>
        <div className={STYLE_INPUT_DIV}>
          <input
            type="number"
            id="email"
            required
            placeholder=""
            className={styleInput}
          />
          <label
            htmlFor="email"
            className={STYLE_INPUT_LABLE}
          >
            Registeration Number
          </label>
          <IoMdMail className="text-2xl" />
        </div>
        <div className={STYLE_INPUT_DIV}>
          <input
            type="text"
            id="semester"
            required
            placeholder=""
            className={styleInput}
          />
          <label htmlFor="semester" className={STYLE_INPUT_LABLE}>Semester</label>
          
        </div>
        <div className={STYLE_INPUT_DIV}>
          <input
            type="number"
            id="email"
            required
            placeholder=""
            className={styleInput}
          />
          <label
            htmlFor="email"
            className={STYLE_INPUT_LABLE}
          >
            Year
          </label>
          <IoMdMail className="text-2xl" />
        </div>
        <div className={STYLE_INPUT_DIV}>
    
          <select name="branch" id="branch"  className={styleInput}>
            <option value="">CSE</option>
            <option value="">ECE</option>
            <option value="">EE</option>
            <option value="ME">ME</option>
            <option value="civil">Civil</option>
          </select>
          <label
            htmlFor="email"
            className={STYLE_INPUT_LABLE}
          >
            Branch
          </label>
          <IoMdMail className="text-2xl" />
        </div>
        <div className={STYLE_INPUT_DIV}>
          <input
            type="number"
            id="phone"
            required
            placeholder=""
            className={styleInput}
          />
          <label
            htmlFor="phone"
            className={STYLE_INPUT_LABLE}
          >
            Phone Number
          </label>
          <IoMdMail className="text-2xl" />
        </div>
        <Button primary outline type="submit" rounded>
         Update
        </Button>
        </form>
    </div>
  )
}

export default StudentInfo