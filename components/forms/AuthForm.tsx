"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Path, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({ schema, defaultValues, formType, onSubmit }: AuthFormProps<T>) => {
  // Initialize form with the PASSED schema and defaultValues, not hardcoded ones
  const form = useForm<T>({
    // @ts-expect-error: Wrapper around generic Zod schemas causes type inference issues with RHF resolver
    resolver: zodResolver(schema) as Resolver<T>,
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // Wrap the submit handler to manage loading states and toasts
  const onFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      const result = await onSubmit(data);
      if (result.success) {
        toast.success(`Successfully ${formType === "SIGN_IN" ? "signed in" : "signed up"}!`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form className="mt-10 space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
      <FieldSet>
        <FieldGroup>
          {Object.keys(defaultValues).map((key) => {
            const isPassword = key.toLowerCase().includes("password");
            const fieldName = key as Path<T>;

            return (
              <Field key={key} className="flex w-full flex-col gap-2.5">
                <FieldLabel htmlFor={key} className="parageaph-medium text-dark400_light700">
                  {key === "email" ? "Email Address" : key.charAt(0).toUpperCase() + key.slice(1)}
                </FieldLabel>

                <Input
                  id={key}
                  type={isPassword ? "password" : "text"}
                  placeholder={`Enter your ${key}`}
                  {...register(fieldName)}
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                />

                {errors[fieldName] && <FieldError>{errors[fieldName]?.message as string}</FieldError>}
              </Field>
            );
          })}
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3"
      >
        {isSubmitting ? (buttonText === "Sign In" ? "Signing In..." : "Signing up... ") : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p className="flex w-full items-center justify-center">
          Dont&apos; have an account?{" "}
          <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
            {" "}
            Sign Up
          </Link>
        </p>
      ) : (
        <p className="flex w-full items-center justify-center">
          Already have an account?{" "}
          <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
            {" "}
            Sign In
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
