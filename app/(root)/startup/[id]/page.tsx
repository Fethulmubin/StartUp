// app/startup/[id]/page.tsx or similar

import { auth } from "@/auth";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client"; // Make sure this exports a configured Sanity client
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_QUERY_BY_ID,
} from "@/sanity/lib/queries";
import markdownit from "markdown-it";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const md = markdownit();

export const dynamic = "force-dynamic"; // or use experimental_ppr as needed

const StartUp = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const [{ select: editorPosts }, data] = await Promise.all([
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "best-of-the-month" }),
    client.fetch(STARTUP_QUERY_BY_ID, { id }),
  ]);

  // const {select: editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'best-of-the-month'});
  // const data = await client.fetch(STARTUP_QUERY_BY_ID, { id });
  if (!data) return notFound();
  const startup = data[0];

  const parsedContent = md.render(startup?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">
          {formatDate(startup._createdAt)} by {startup.author?.name}
        </p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>
      <section className="section_container">
        <img
          src={startup.image}
          alt="startup"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-5 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              className="flex gap-2 items-center mb-3"
              href={`/user/${startup.author?._id}`}
            >
              <img
                src={startup.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{startup.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{startup.author?.name}
                </p>
              </div>
            </Link>

            <p className="category-tag">{startup.category}</p>
            {/* pitch details */}
            <h3 className="text-30-bold">Pitch Details</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>

          {/* best of month */}
        </div>
        <hr className="divider" />
        {editorPosts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Best Of The Month 🏆</p>
            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard) => (
                <StartupCard key={post._id} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default StartUp;
