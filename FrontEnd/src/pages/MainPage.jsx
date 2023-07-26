import React from 'react'
import Payment from '../components/Stripe/Payment'

export default function MainPage() {
  return (
    <div className='flex flex-row items-center justify-around mt-5'>
        <Payment />
    </div>
  )
}
