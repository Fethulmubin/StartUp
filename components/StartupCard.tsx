import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: "Author" };
const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div>
          <Link href={`/user/${author?._id}`}>
            <p className="text-20-semibold">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/startup/${_id}`}>
          <img
            src={author?.image}
            alt={title}
            width={48}
            height={48}
            className=" rounded-full self-center"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="" className="startup-card_img" />
      </Link>

      <div className="flex-between mt-5 gap-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-semibold">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>View Startup</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
