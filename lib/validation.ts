import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description is required").max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Category is required").max(50, "Category must be less than 50 characters"),
  link: z.string().url( ).min(3,).max(200, "Link must be less than 200 characters")
  .refine(async(url) => {
    try {
        const res = await fetch(url, {
            method: 'HEAD',
        });
        const contentType = res.headers.get('content-type');

        return (contentType?.startsWith('image/')) 
        
    } catch (error) {
        return false;
    }
  }),
  pitch: z.string().min(10, "Pitch is required").max(1000, "Pitch must be less than 1000 characters"),
});