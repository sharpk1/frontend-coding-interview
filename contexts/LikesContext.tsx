"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

interface LikesContextType {
  likedPhotos: Set<number>
  toggleLike: (photoId: number) => void
  isLiked: (photoId: number) => boolean
}

const LikesContext = createContext<LikesContextType | undefined>(undefined)

export function LikesProvider({ children }: { children: ReactNode }) {
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set())

  const toggleLike = useCallback((photoId: number) => {
    setLikedPhotos((prev) => {
      const next = new Set(prev)
      if (next.has(photoId)) {
        next.delete(photoId)
      } else {
        next.add(photoId)
      }
      return next
    })
  }, [])

  const isLiked = useCallback(
    (photoId: number) => likedPhotos.has(photoId),
    [likedPhotos]
  )

  return (
    <LikesContext.Provider value={{ likedPhotos, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  )
}

export function useLikes(): LikesContextType {
  const context = useContext(LikesContext)
  if (context === undefined) {
    throw new Error("useLikes must be used within a LikesProvider")
  }
  return context
}
