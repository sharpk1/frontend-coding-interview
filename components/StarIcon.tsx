"use client";

type StarIconProps = {
  filled?: boolean;
  className?: string;
};

export function StarIcon({ filled = false, className }: StarIconProps) {
  return filled ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#FFD600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
