import { auth } from "@/auth";
import UserStartup from "@/components/UserStartup";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
//   if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
            <div className="profile_title">
                <h3 className="text-24-black uppercase text-center line-clamp-1">
                    {user.name}
                </h3>
            </div>
            <Image 
            src={user?.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
            />
            <p className="text-30-extrabold mt-7 text-center">
                @{user?.username}
            </p>
            <p className="mt-1 text-center text-14-normal">
                {user?.bio || "No bio available"}
            </p>
        </div>
        <div className="flex-1 flex-col gap-5 lg:mt-5">
            <p className="text-30-bold">
                {session?.id === user._id ? "Your" : "All"} Startups
            </p>
            <ul className="card_grid-sm">
                <UserStartup id={id}/>
            </ul>
            </div>  

      </section>
    </>
  );
};

export default Page;
