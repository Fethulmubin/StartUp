import React from 'react'
import SearchForm from '../components/SearchForm'


const Home = ({ searchParams }: { searchParams: { query: string } }) => {

  const query = searchParams.query;
  return (
    <section className='pink_container'>
      <h1 className='heading'>Pitch your startups<br /> <span className='text-30-semibold'>Connect to your peers</span></h1>
      <p className="sub-heading !max-w-3xl">Join a community of like-minded entrepreneurs and take your startup to the next level.</p>
      <SearchForm query={query} />
    </section>
    
  )
}

export default Home
