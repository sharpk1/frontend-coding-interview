# Clever Frontend Coding Interview — Submission

## Overview

This is a small Next.js + TypeScript app that implements the two required pages (Sign in and All photos). It fetches 10 nature photos from the Pexels API, supports like/unlike, and uses a simple localStorage-backed auth flow to gate access to the photos page.

## Requirements Coverage

- **React + TypeScript**: Implemented with Next.js App Router.
- **Pexels API**: Server route in `app/api/photos/route.ts` calls the Pexels endpoint with an `Authorization` header from env.
- **Sign in page**: Functional form; auth is spoofed via localStorage.
- **All photos page**: Auth-gated; redirects unauthenticated users to `/`.
- **10 photos only**: Pexels query is set to `per_page=10`.
- **Like/unlike**: Implemented with `LikesContext` and a toggle button.
- **React concepts**: Contexts, hooks, callbacks, and client components.
- **Tests**: Basic tests in `__tests__` for auth, likes, and photo card UI.

## How to Run

Create a local env file `.env.local` with:

```bash
PEXELS_API_KEY=your_key_here
PEXELS_URL=https://api.pexels.com/v1/search?query=nature&per_page=10
```

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Tests

```bash
npm test
```

## Key Implementation Notes

- **Auth**: `AuthProvider` stores `ci_auth` and `ci_user` in localStorage.
- **Photos**: `PhotoList` uses SWR to fetch from `/api/photos`.
- **Likes**: `LikesProvider` keeps a `Set<number>` of liked photo IDs.

## What I’d Do Next (Production-Ready Improvements)

- Add server-side auth guards and session handling.
- Add pagination, caching, and error retries for the photo list.
- Improve accessibility (focus states, landmarks, aria labels, keyboard nav).
- Add visual regression tests against the Figma mocks.
- Harden empty/error states and loading skeletons.
- Optimize images with Next.js `<Image>` and proper sizing.
- Add analytics and monitoring for performance and errors.
- Persist likes in storage or a backend.
