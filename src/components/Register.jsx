import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ToastError, { ToastWorn } from '../utility/toastify'
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import { createUser } from '../firebase/services'
import { useAuth } from '../firebase/auth.firebase'
import Loader from './Loader'

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate();
  const { isLoading, authUser } = useAuth()

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

  }, [isLoading, authUser, navigate])

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!userInfo.email.trim()) {
        ToastWorn({ message: "Please enter Email" })
        return false;
      }

      if (!userInfo.password) {
        ToastWorn({ message: "Please enter Password" })
        return false;
      }
      if (!userInfo.confirmPassword) {
        ToastWorn({ message: "Please enter confirm Password" })
        return false;
      }

      if (!validator.isEmail(userInfo.email)) {
        ToastError({ message: "Please enter valid Email" })
        return
      } if (userInfo.confirmPassword != userInfo.password) {
        ToastError({ message: "Password and confirm password are not same" })
        return;
      }




      const createUserResult = await createUser(userInfo)
      console.log(createUserResult)
      if (createUserResult.status != 200) {
        ToastError({ message: createUserResult.messsage })
        return
      }
      else {

        setUserInfo({
          email: "",
          password: "",
          confirmPassword: ""
        })

      }

    } catch (error) {
      console.log(error)
    }



  }
  return (isLoading && !authUser) ? <Loader /> : (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 md:h-[86vh]">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " placeholder="name@example.xyz" required="" name='email' onChange={HandleChangeInput} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " required="" name='password' onChange={HandleChangeInput} />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " required="" name='confirmPassword' onChange={HandleChangeInput} />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50   dark:bg-gray-700 dark:border-gray-600  dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" to="#">Terms and Conditions</Link></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none  300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" onClick={HandleSubmit}>Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section >
    </>
  )
}

export default Register