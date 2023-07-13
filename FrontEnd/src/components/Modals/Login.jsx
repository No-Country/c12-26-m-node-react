import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import axios from "axios"
import toast from "react-hot-toast";
export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm()
    const { register, handleSubmit } = form

    const onSubmit = (data) => {
        setIsLoading(true);
          console.log(data)
        axios.post(`${process.env.REACT_APP_API_URL}login`, data)
        .then(() => {
          toast.success('Registered!');
        })
        .catch((error) => { 
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        })
      
      };
  return (
    <div>
    
 <div className="w-full px-6 py-4 mt-[300px] overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>      
                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined"> Email </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 undefined"> Password </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
                <a href="about_blank" className="text-xs text-purple-600 hover:underline"> Forget Password?</a>
                <div className="flex items-center mt-4">
                    <button onClick={handleSubmit(onSubmit)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                        Register
                    </button>
                </div>
            </form>
            <div className="mt-4 text-grey-600">
                Don't have an account?{" "}
                <span>
                    <a className="text-purple-600 hover:underline" href="about_blank">
                        Register
                    </a>
                </span>
            </div>
            <div className="flex items-center w-full my-4">
                <hr className="w-full" />
                <p className="px-3 ">OR</p>
                <hr className="w-full" />
            </div>
            <div className="my-6 space-y-2">
                <Skeleton />
                <Skeleton />
            </div>
        </div>
    </div>

  )
}
