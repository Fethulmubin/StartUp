import React from 'react'
import SearchForm from '../../components/SearchForm'
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';
// import { Search } from 'lucide-react';


const Home = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {

  // const posts = await client.fetch(STARTUPS_QUERY)
  // console.log(JSON.stringify(posts, null, 2));
   
  
    

  const query = (await searchParams).query;
  const params = {search: query || null}
  const session = await auth()
  console.log(session)
  const {data :posts} = await sanityFetch({query : STARTUPS_QUERY, params})
  
   
  return (
    <>
    <section className='pink_container'>
      <h1 className='heading'>Pitch your startups<br /> <span className='heading'>Connect to your peers</span></h1>
      <p className="sub-heading !max-w-3xl">Join a community of like-minded entrepreneurs and take your startup to the next level.</p>
      <SearchForm query={query} />
    </section>
    <section className='section_container'>
       <p className="text-30-semibold">

        {query ? `Search results for ${query}` : "All StartUps"}
       </p>
        
        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post : StartupTypeCard)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ): (
            <p className='no-results'>No startups found</p>
          )
        }
        </ul>
    </section>

    <SanityLive/>
    </>
    
  )
}

export default Home
