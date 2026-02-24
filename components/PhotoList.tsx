"use client";

import useSWR from "swr";
import { PhotoCard } from "@/components/PhotoCard";
import type { PexelsSearchResponse } from "@/types/pexels";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function PhotoList() {
  const { data, error, isLoading } = useSWR<PexelsSearchResponse>(
    "/api/photos",
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="py-12 text-center text-[14px] text-[#6B7280]">
        Loading photos...
      </div>
    );
  }

  if (error || !data || !data.photos) {
    return (
      <div className="py-12 text-center text-[14px] text-red-600">
        Failed to load photos. Please try again later.
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#F3F4F6]">
      {data.photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
