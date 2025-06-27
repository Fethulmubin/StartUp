import { auth } from '@/auth'
import Startup_form from '@/components/Startup_form'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async() => {

    const session = await auth()
    if(!session) redirect('/')
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit Your Startup</h1>

    </section>
    <Startup_form/>
    </>
  )
}

export default Page