import React from 'react'
import Heading from '../components/Layouts/Heading'
import Input from '../components/Layouts/Input'
import {BsSearch} from "react-icons/bs"
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import Skeleton from 'react-loading-skeleton'
export default function TransferPage() {
  return (
    <div>
        <Heading title="Transferir Dinero" center/>
        <div className='mt-5'>
        <Input placeholder={"Buscar"} />
        <Input placeholder={"Ingresa el monto a transferir"} />
        </div>
        <Heading subtitle={"Transferencias recientes"} />
        <div className='flex flex-row'>
            <div className='bg-gray-300 w-[50px] h-[50px] m-3  rounded-full flex items-center justify-center'>
               <Avatar  />
            </div>
            <button className='bg-gray-300 w-[50px] h-[50px] m-3   rounded-full flex items-center justify-center'>
               <Avatar />
            </button>
            <div className='bg-gray-300 w-[50px] h-[50px] m-3 rounded-full flex items-center justify-center'>
               <Avatar  />
            </div>
            <div className='bg-gray-300 w-[50px] h-[50px] m-3 rounded-full flex items-center justify-center'>
               <Avatar />
            </div>
    </div>
    <Heading subtitle="Sus beneficiarios" />
    <div className='flex flex-col'>
            <div className='bg-gray-300 w-[300px] h-[80px] m-3  rounded-xl flex items-center justify-start'>
               <Avatar />
               <p className='text-gray-600 m-3'>John Doe</p>
            </div>
            <button className='bg-gray-300 w-[300px] h-[80px] m-3   rounded-xl flex items-center justify-start'>
               <Avatar />
               <Skeleton />
            </button>
            <div className='bg-gray-300 w-[300px] h-[80px] m-3 rounded-xl flex items-center justify-start'>
               <Avatar  />
               <Skeleton />
            </div>
            <div className='bg-gray-300 w-[300px] h-[80px] m-3 rounded-xl flex items-center justify-start'>
               <Avatar />
               <Skeleton />
            </div>
    </div>
    <Button label={"Agregar Nuevo"} />
    </div>
  )
}
