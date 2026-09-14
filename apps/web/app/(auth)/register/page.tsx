"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValues, signUpSchema } from "@/lib/schemas/signUpSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpUser } from "@/lib/api/client-api";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import AuthLayout from "@/lib/ui/auth-layout";

type PageProps = {};

function RegisterPage({}: PageProps) {
  const queryClient = useQueryClient();
  const { handleSubmit, register } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success(`User ${data.name} registered successfully.`);
      redirect("/dictionary");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) toast.error(error.response?.data?.message);
        if (status === 500) toast.error("Something went wrong");
      }
    },
  });

  return (
    <AuthLayout
      title="Register"
      description="To start using our services, please fill out the registration form below. All fields are mandatory:"
    >
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <label htmlFor="name">Name</label>
        <input {...register("name")} id="name" type="text" />
        <label htmlFor="email">Email</label>
        <input {...register("email")} id="email" type="text" />
        <label htmlFor="password">Password</label>
        <input {...register("password")} id="password" type="text" />
        <button type="submit">Sigh Up</button>
      </form>
      <Link href="/login">Login</Link>
    </AuthLayout>
  );
}
export default RegisterPage;
