"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PhotoList } from "@/components/PhotoList";

export default function PhotosPage() {
  const { isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[960px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <img src="/logo.svg" alt="CI Logo" width={75} height={75} />
          <button
            onClick={signOut}
            className="text-[14px] text-[#6B7280] hover:text-[#111827] transition-colors mt-2 cursor-pointer"
          >
            Sign out
          </button>
        </div>

        {/* Title */}
        <h1 className="text-[20px] font-bold text-[#111827] mb-6">
          All photos
        </h1>

        {/* Photo list */}
        <PhotoList />
      </div>
    </main>
  );
}
