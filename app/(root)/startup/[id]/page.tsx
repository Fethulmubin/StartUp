// app/startup/[id]/page.tsx or similar

import { client } from '@/sanity/lib/client'; // Make sure this exports a configured Sanity client
import { STARTUP_QUERY_BY_ID } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic'; // or use experimental_ppr as needed

const StartUp = async ({ params }: { params: Promise<{ id: string }> }) => {
  const  id  = (await params).id;

  const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });

  if (!post) return notFound();
  console.log(post[0].title)

  return( 
  <div>StartUp {post[0].title}</div>
);
};

export default StartUp;
