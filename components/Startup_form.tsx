"use client";
import React, { useActionState } from "react";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { error } from "console";
import { z } from "zod";
import { formSchema } from "@/lib/validation";

const Startup_form = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  // const [isPending, setIsPending] = useState(false);
 

  const handleFormSubmit = async(prevState: any, formData: FormData) =>{
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }
      await formSchema.parseAsync(formValues);
      console.log(formValues)

    } catch (error) {
      if (error instanceof z.ZodError) {
        const filedErrors = error.flatten().fieldErrors;

        setErrors(filedErrors as unknown as Record<string, string>);
        return {...prevState, error: 'Validation failed', status: 'ERROR'};
      }
      return {...prevState, error: 'An unexpected error occurred', status: 'ERROR'};
    } finally{

    }
  }
   const [state, formAction, isPending] = useActionState(handleFormSubmit,{error : '', status: 'INITIAL'})
  return (
    <>
      <form action={formAction} className="startup-form">
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="startup-form_input w-full"
            required
            placeholder="Startup Title"
          />
          {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="startup-form_label">
            Description
          </label>
          <textarea
            name="description"
            className="startup-form_textarea w-full"
            required
            placeholder="Startup Description"
          />
          {errors.title && (
            <p className="startup-form_error">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <input
            type="text"
            name="category"
            className="startup-form_input w-full"
            required
            placeholder="Startup Category (eg: Technology)"
          />
          {errors.category && (
            <p className="startup-form_error">{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="Link" className="startup-form_label">
            Image URL
          </label>
          <input
            type="text"
            name="link"
            className="startup-form_input w-full"
            required
            placeholder="Startup Image URL"
          />
          {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>

        <div>
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MDEditor 
          value={pitch} 
          onChange={(value)=> setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{borderRadius: '20px', overflow: 'hidden', backgroundColor:'white',}}
          previewOptions={{
            disallowedElements: ['style'],
          }}
          textareaProps={{
            placeholder: "Write your pitch here...",
          }}
          />
  
          {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
        <Button
          disabled={isPending}
          type="submit"
          className="startup-form_btn">{isPending ? 'Submitting': 'Submit Your Startup'}</Button>
      </form>
    </>
  );
};

export default Startup_form;
