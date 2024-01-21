'use client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../firebase/auth.firebase'

const Header = () => {
    const { authUser, signOut } = useAuth()
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center   p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Resolute</span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {
                            !authUser ?
                                <>
                                    <Link to="/register" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Register</Link>
                                    <Link to="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                                </>
                                :
                                <>
                                    <button className="text-sm  text-blue-600 dark:text-blue-500 hover:underline" onClick={signOut}>Logout</button>
                                    <Link to="/home" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline" aria-current="page">Home</Link>
                                </>

                        }
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header