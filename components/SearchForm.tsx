import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'
const SearchForm = ({query}: {query:String}) => {
  
  return (
    <Form action='/' scroll={false} className='search-form'>
      <input name='query' defaultValue='' type="text" placeholder="Search Startups" className="search-input" />
        <div className='flex gap-2'>
            {query && <SearchFormReset/>}
            <button className='search-btn text-white' type='submit'>
                <Search className='size-5'/>
            </button>

        </div> 
    </Form>
  )
}


export default SearchForm