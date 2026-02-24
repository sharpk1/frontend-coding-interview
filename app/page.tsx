"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/photos");
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-white px-4 pt-[36px] md:pt-0 md:justify-center">
      <div className="flex flex-col items-center w-full max-w-[400px]">
        {/* Logo */}
        <img
          src="/logo.svg"
          alt="CI Logo"
          width={75}
          height={75}
          className="mb-8"
        />

        {/* Heading */}
        <h1 className="text-[20px] font-bold leading-[1] tracking-[0%] text-[#111827] mb-8 font-[Helvetica]">
          Sign in to your account
        </h1>

        {/* Form */}
        <SignInForm />
      </div>
    </main>
  );
}
