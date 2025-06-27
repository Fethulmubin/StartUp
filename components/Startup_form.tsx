"use client";
import React from "react";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const Startup_form = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("**Hello world!!!**");
  return (
    <>
      <form action={() => {}} className="startup-form">
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
          />
  
          {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
      </form>
    </>
  );
};

export default Startup_form;
