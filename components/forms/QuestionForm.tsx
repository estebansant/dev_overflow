"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

type QuestionFormData = z.infer<typeof AskQuestionSchema>;

const QuestionForm = () => {
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
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = form;

  const currentTags = watch("tags") || [];

  const handleCreateQuestion = () => {};
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

        {/* Description */}
        <FieldGroup>
          <Field className="flex w-full flex-col">
            <FieldLabel htmlFor="content" className="paragraph-semibold text-dark400_light800">
              Detailed explanation of your problem <span className="text-primary-500">*</span>
            </FieldLabel>
            Editor
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
              <Input
                id="tags"
                placeholder="Add tags"
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
              />
              Tags
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
