import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'


import ToastError, { ToastWorn } from '../utility/toastify';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import { LogInUser } from '../firebase/services';
import { useAuth } from '../firebase/auth.firebase';
import Loader from './Loader';

const Login = () => {
  const { authUser, isLoading } = useAuth()
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",

  })
  const navigate = useNavigate()
  const HandleChangeInput = (e) => {
    const { name, value } = e.target
   
    setUserInfo((prev) => (
      { ...prev, [name]: value }
    ))
  }
  useEffect(() => {
    if (!isLoading && authUser) {
      navigate('/home')
    }
  }, [isLoading, authUser])


  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.email.trim()) {
      ToastWorn({ message: "Please enter Email" })
      return false;
    }
    if (!userInfo.password) {
      ToastWorn({ message: "Please enter Password" })
      return false;
    }
    if (!validator.isEmail(userInfo.email)) {
      ToastError({ message: "Please enter valid Email" })
      return
    }
    const loginuser = await LogInUser(userInfo);
   
    if (loginuser.status != 200) {
      ToastError({ message: loginuser.messsage })
      return
    }
  }
  return (isLoading && !authUser) ? <Loader/> :
    (
      <>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[86vh] lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" >
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="name@company.com" required="" onChange={HandleChangeInput} />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " required="" onChange={HandleChangeInput} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600  dark:ring-offset-gray-800" required="" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                      </div>
                    </div>
                    <Link to="/forgetpassword" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" onClick={HandleSubmit}>Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      </>
    )
}

export default Login