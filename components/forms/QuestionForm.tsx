"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import TagCard from "../cards/TagCard";

type QuestionFormData = z.infer<typeof AskQuestionSchema>;

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[] }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters.",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists.",
        });
      }
    } else {
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleCreateQuestion)} className="flex w-full flex-col gap-10">
      <FieldSet>
        {/* Title */}
        <FieldGroup>
          <Field className="flex w-full flex-col">
            <FieldLabel htmlFor="title" className="paragraph-semibold text-dark400_light800">
              Question Title <span className="text-primary-500">*</span>
            </FieldLabel>

            <Input
              id="title"
              {...register("title")}
              className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
            />

            {errors.title && <FieldError className="mt-2 text-red-500">{errors.title.message}</FieldError>}
          </Field>

          <FieldDescription className="body-regular text-light-500 mt-2.5">
            Be specific and imagine you&apos;re asking a question to another person.
          </FieldDescription>
        </FieldGroup>

        {/* Description -> Editor */}
        <FieldGroup>
          <Field className="flex w-full flex-col">
            <FieldLabel htmlFor="content" className="paragraph-semibold text-dark400_light800">
              Detailed explanation of your problem <span className="text-primary-500">*</span>
            </FieldLabel>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <div className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[350px] rounded-md border">
                  <Editor value={field.value} fieldChange={field.onChange} editorRef={editorRef} />
                </div>
              )}
            />
          </Field>

          <FieldDescription className="body-regular text-light-500 mt-2.5">
            Introduce the problem and expand on what you&apos;ve put on the title.
          </FieldDescription>
        </FieldGroup>

        {/* Tags */}
        <FieldGroup>
          <Field className="flex w-full flex-col gap-3">
            <FieldLabel htmlFor="tags" className="paragraph-semibold text-dark400_light800">
              Tags <span className="text-primary-500">*</span>
            </FieldLabel>

            <div>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      id="tags"
                      placeholder="Add tags..."
                      className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />

                    {/* Render Tags Pills INSIDE the controller render prop */}
                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag: string) => (
                          <TagCard
                            key={tag}
                            _id={tag}
                            name={tag}
                            compact
                            remove
                            isButton
                            handleRemove={() => handleTagRemove(tag, field)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            {errors.tags && <FieldError className="mt-2 text-red-500">{errors.tags.message}</FieldError>}
          </Field>

          <FieldDescription className="body-regular text-light-500 mt-2.5">
            Add up to 3 tags to describe what your question is about. You need to press <b>Enter</b> to add a tag.
          </FieldDescription>
        </FieldGroup>
      </FieldSet>

      <div className="mt-16 flex justify-end">
        <Button type="submit" className="primary-gradient !text-light-900 w-fit">
          Ask A Question
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
