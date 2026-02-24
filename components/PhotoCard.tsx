"use client";

import { useCallback } from "react";
import { useLikes } from "@/contexts/LikesContext";
import { StarIcon } from "@/components/StarIcon";
import type { PexelsPhoto } from "@/types/pexels";

interface PhotoCardProps {
  photo: PexelsPhoto;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(photo.id);

  const handleToggleLike = useCallback(() => {
    toggleLike(photo.id);
  }, [toggleLike, photo.id]);

  return (
    <div className="flex items-center gap-4 py-4">
      <button
        onClick={handleToggleLike}
        aria-label={liked ? "Unlike photo" : "Like photo"}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center cursor-pointer"
      >
        <StarIcon filled={liked} />
      </button>

      {/* Photo thumbnail */}
      <img
        src={photo.src.medium}
        alt={photo.alt || `Photo by ${photo.photographer}`}
        width={75}
        height={75}
        className="w-[75px] h-[75px] object-cover rounded-lg flex-shrink-0"
        crossOrigin="anonymous"
      />

      {/* Photo details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[14px] font-bold text-[#111827]">
            {photo.photographer}
          </p>
          <a
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[14px] text-[#0075EB] hover:text-[#0060C0] transition-colors flex-shrink-0"
          >
            <img
              src="/links.svg"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Portfolio
          </a>
        </div>
        <p className="text-[14px] text-[#374151] truncate md:overflow-visible md:whitespace-normal md:text-clip">
          {photo.alt || "No description"}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[14px] text-[#374151]">{photo.avg_color}</span>
          <span
            className="inline-block w-[14px] h-[14px] border border-[#E5E7EB]"
            style={{ backgroundColor: photo.avg_color }}
            aria-label={`Average color: ${photo.avg_color}`}
          />
        </div>
      </div>
    </div>
  );
}
