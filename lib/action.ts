"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import { Key } from "lucide-react";
import slugify from "slugify";
import { author } from "@/sanity/schemaTypes/author";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  formData: FormData,
  pitch: string
) => {
  const session = await auth();

  console.log(session)

  if (!session)
    return parseServerActionResponse({
      status: "ERROR",
      error: "Unauthorized",
    });
  const { title, description, category, link } = Object.fromEntries(
    Array.from(formData.entries()).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, {
    lower: true,
    strict: true,
  });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });
    return parseServerActionResponse({
      status: "SUCCESS",
      ...result,
      error: "",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      status: "ERROR",
      error: JSON.stringify(error),
    });
  }
};
