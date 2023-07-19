import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import axios from "axios"
import toast from "react-hot-toast";
import Input from '../Layouts/Input';
import { useDispatch } from 'react-redux';
import {getCurrentUser} from "../../hooks/CurrentUserSlice"
import { closeModal } from '../../hooks/modalSlice';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: {
        email: "",
        password: "",
    }})

    const onSubmit = (data) => {
        setIsLoading(true);
          console.log(data)
        axios.post(`${process.env.REACT_APP_API_URL}login`, data)
        .then((response) => {
          toast.success(response.data.message);
          console.log(response)
          dispatch(getCurrentUser(response.data))
          reset()
          navigate('/main');
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
                        <Input
                            type={"email"}
                            id={"email"}
                            register={register}
                            disabled={isLoading}
                            errors={errors}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 undefined"> Password </label>
                    <div className="flex flex-col items-start">
                        <Input
                            type={"password"}
                            id={"password"}
                            register={register}
                            disabled={isLoading}
                            errors={errors}
                        />
                    </div>
                </div>
                <a href="about_blank" className="text-xs text-purple-600 hover:underline"> Forget Password?</a>
                <div className="flex items-center mt-4">
                    <button onClick={handleSubmit(onSubmit)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                        Login
                    </button>
                </div>
            </form>
            <div className="mt-4 text-grey-600">
                Don't have an account?{" "}
                <span>
                    <button onClick={() => dispatch(closeModal())} useNavigate className="text-purple-600 hover:underline" href="about_blank">
                        Register
                    </button>
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
