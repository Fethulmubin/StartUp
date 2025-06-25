import preview from "next-sanity/preview";
import { defineField, defineType } from "sanity";

export const startup = defineType({
    name:"startup",
    title:"Startups",
    type:"document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name:"slug",
            type:"slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        }),
         defineField({
            name: "author",
            type: "reference",
            to: [{ type: "author" }],
        }),
         defineField({
            name: "views",
            type: "number",
        }),
         defineField({
            name: "description",
            type: "text",
        }),
         defineField({
            name: "category",
            type: "string",
            validation:(Rule) => Rule.min(1).max(20).required().error("Category is required and must be between 1 and 20 characters long."),
        }),
         defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required()
        }),
         defineField({
            name: "pitch",
            type: "markdown",
        }),
       


    ],

})