"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

interface AuthContextType {
  isAuthenticated: boolean
  username: string | null
  signIn: (username: string, password: string) => boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = "ci_auth"
const USER_STORAGE_KEY = "ci_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true)
      setUsername(storedUser)
    }
    setIsLoaded(true)
  }, [])

  const signIn = useCallback((user: string, password: string): boolean => {
    if (user.trim().length > 0 && password.trim().length > 0) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true")
      localStorage.setItem(USER_STORAGE_KEY, user)
      setIsAuthenticated(true)
      setUsername(user)
      return true
    }
    return false
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setIsAuthenticated(false)
    setUsername(null)
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
