import { NextResponse } from "next/server";
import type { PexelsSearchResponse } from "@/types/pexels";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_URL = process.env.PEXELS_URL;

export async function GET() {
  if (!PEXELS_API_KEY || !PEXELS_URL) {
    return NextResponse.json(
      { error: "Missing Pexels configuration" },
      { status: 500 },
    );
  }
  try {
    const response = await fetch(PEXELS_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch photos from Pexels" },
        { status: response.status },
      );
    }

    const data: PexelsSearchResponse = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
