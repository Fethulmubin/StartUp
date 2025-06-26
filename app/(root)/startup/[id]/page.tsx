// app/startup/[id]/page.tsx or similar

import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client"; // Make sure this exports a configured Sanity client
import { STARTUP_QUERY_BY_ID } from "@/sanity/lib/queries";
// import {image} from '../../../../public/logo.png'
// import { Image } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic"; // or use experimental_ppr as needed

const StartUp = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const data = await client.fetch(STARTUP_QUERY_BY_ID, { id });
  if (!data) return notFound();
  const startup = data[0];

  // console.log(post)

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tage">
          {formatDate(startup.createdAt)} by {startup.author.name}
        </p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>
      <section className="section_container">
        <img src={startup.image} alt="startup" className="w-full h-auto rounded-xl" />

        <div className="space-y-5 mt-5 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link className='flex gap-2 items-center mb-3' href={`user/${startup.author?._id}`}>
              <img
              src={startup.author?.image}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{startup.author?.name}</p>
                <p className="text-16-medium !text-black-300">@{startup.author?.name}</p>
              </div>
            </Link>

            <p className="category-tag">{startup.category}</p>
            {/* <h3 className="text-30-bold">{startup.pitch}</h3> */}

          </div>

        </div>
        <hr className="divider" />

      </section>
      <Suspense fallback={<Skeleton className="view_skeleton"/>}>
        <View id={id} views={startup.views} />
      </Suspense>
    </>
  );
};

export default StartUp;
