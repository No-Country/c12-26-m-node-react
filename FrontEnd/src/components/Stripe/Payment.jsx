import React, { useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import Input from "../Layouts/Input"
import { useForm } from 'react-hook-form'
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import { useSelector } from 'react-redux';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

export default function Payment () {
  const [clientSecret, setClientSecret] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register, formState: {errors} } = useForm({defaultValues: {
    amount :""
}})
const  user  = useSelector((state) => state.user)
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}payment/create-payment-intent`, {
      headers: {
        'Content-Type': "application/json",
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWViNTcyYWI2NDM4NWI3MDcyZjg0YSIsImlhdCI6MTY4OTE4NjA0NCwiZXhwIjoxNjkwMzk1NjQ0fQ.BhXK7waVndPBlt3OOITOin9Fxtp7b0l4arJ2hiJnU3c",
      }
    }).then(async (result) => {
        console.log(result)
    });
  }, [user.user.payload.token]);

  return (
    <div className="mt-[200px]">
      <div className='bg-white p-4 rounded-xl'>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 undefined"> Transfer Amount </label>
                    <div className="flex flex-col items-start">
                        <Input
                            type={"number"}
                            id={"amount"}
                            register={register}
                            disabled={isLoading}
                            errors={errors}
                        />
                    </div>
                </div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );

}
