import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Link from 'next/link'
// import React from 'react'

const NavBar = async () => {
    const session = await auth()
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex items-center justify-between'>
                <Link href='/' className='text-2xl font-bold'>
                    <img src="/logo.png" alt="logo" />
                </Link>
                <div className='flex items-center gap-4 text-black'>
                    {session && session.user ? (
                        <>
                            <Link href='/startup/create'>
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='size-6 sm:hidden '/>
                            </Link>
                            
                            <form action={async () =>{ 
                                "use server"
                                await signOut({redirectTo: '/'})}}>
                                <button type="submit">
                                    <span className='max-sm:hidden'>Logout</span>
                                    <LogOut className='size-6 sm:hidden text-red-500'/>
                                
                                </button>
                            </form>
                            <Link href={`/user/${session?.user.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <Link href='/api/auth/signin'>
                    
                            <form action={async () => {
                                "use server"
                                await signIn('github')}}>
                                    <button type="submit">Sign In</button>
                            </form>

                        </Link>
                    )}
                </div>

            </nav>

        </header>
    )
}

export default NavBar