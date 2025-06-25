import React from 'react'
import SearchForm from '../../components/SearchForm'
import StartupCard from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';


const Home = async ({ searchParams }: { searchParams: { query: string } }) => {

  const posts = await client.fetch(STARTUPS_QUERY)
  console.log(JSON.stringify(posts, null, 2));
// const posts = [{
//   createdAt: new Date(),
//   view: 55,
//   author: {_id :1 , name: "John Doe", },
//   _id:1,
//   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
//   image:"",
//   category: "robot",
//   title: "we robots" 
// }]
 
  const query = searchParams.query;
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
            posts.map((post, index)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ): (
            <p className='no-results'>No startups found</p>
          )
        }
        </ul>
    </section>
    </>
    
  )
}

export default Home
