/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-hot-toast";
import axios from "axios";
import Countries from "../../assets/countrybyname.json"
import Input from "../Layouts/Input"

export default function RegisterModal() {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {
        birthDay:"",
        confirmPassword: "",
        country: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        documentId:""
    }})

    
    const onSubmit = (data) => {
      setIsLoading(true);
        console.log(data)
      axios.post(`${process.env.REACT_APP_API_URL}users/newuser`, data)
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
            <div className="flex flex-col items-center min-h-screen pt-4 sm:justify-center sm:pt-0">
         <div className="w-full px-6 py-4 mt-[100px] overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">Name</label>
                            <div className="flex flex-col items-start">
                                <Input
                                    type={"text"}
                                    id={"firstName"}
                                    register={register}
                                    errors={errors}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">Last name</label>
                            <div className="flex flex-col items-start">
                                <Input
                                    type={"text"}
                                    id={"lastName"}
                                    register={register}
                                    errors={errors}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">Phone Number</label>
                            <div className="flex flex-col items-start">
                                <Input
                                    type={"number"}
                                    id={"phone"}
                                    register={register}
                                    errors={errors}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 undefined">Document Id</label>
                            <div className="flex flex-col items-start">
                                <Input
                                    type={"number"}
                                    id={"documentId"}
                                    register={register}
                                    errors={errors}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined"> Birth Date</label>
                            <div className="flex flex-col items-start">
                                <Input
                                    type={"date"}
                                    id={"birthDay"}
                                    register={register} 
                                    errors={errors}
                                    disabled={isLoading}                               
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined"> Email </label>
                            <div className="flex flex-col items-start">
                                <Input
                                    type={"email"}
                                    id={"email"}
                                    register={register}
                                    errors={errors}
                                    disabled={isLoading}
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
                                    errors={errors}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 undefined"> Confirm Password</label>
                            <div className="flex flex-col items-start">
                                <Input
                                    type={"password"}
                                    id={"confirmPassword"}
                                    register={register}
                                    errors={errors}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 undefined">Country</label>
                            <div className="flex flex-col items-start">
                                    <select id="country" {...register("country")} className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">          
                                        {Countries.map((c) => (
                                            <option key={c.key}>{c.country}</option>
                                        ))}
                                    
                                </select>
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
                        Already have an account?{" "}
                        <span>
                            <a className="text-purple-600 hover:underline" href="about_blank">
                                Log in
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
        </div>
    );
}
