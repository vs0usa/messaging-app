"use client"

import { Session, User } from "@repo/auth/server"
import { syncTabs } from "zustand-sync-tabs"
import { createContext, ReactNode, useContext, useRef } from "react"
import { createStore, useStore } from "zustand"

type State = {
  user: User | null
  session: Session["session"] | null

  signIn: (user: User) => void
  signOut: () => void
}

type AuthStore = ReturnType<typeof createAuthStore>

const createAuthStore = (session: Session | null) =>
  createStore<State>(
    syncTabs(
      (set) => ({
        user: session?.user ?? null,
        session: session?.session ?? null,
        signIn: (user) => {
          set({ user, session: null })
        },
        signOut: () => {
          set({ user: null, session: null })
        },
      }),
      { name: "auth" },
    ),
  )

/**
 * React part.
 */
const AuthContext = createContext<AuthStore | null>(null)

export const AuthStoreProvider = ({
  children,
  session,
}: {
  children: ReactNode
  session: Session | null
}) => {
  const storeRef = useRef<AuthStore>(null)

  if (!storeRef.current) {
    storeRef.current = createAuthStore(session)
  }

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const store = useContext(AuthContext)

  if (!store) {
    throw new Error("useAuth must be used within a AuthContext")
  }

  return useStore(store, (state) => state)
}

export const useUser = () => {
  const store = useContext(AuthContext)

  if (!store) {
    throw new Error("useUser must be used within a AuthContext")
  }

  return useStore(store, (state) => state.user)
}

export const useSession = () => {
  const store = useContext(AuthContext)

  if (!store) {
    throw new Error("useSession must be used within a AuthContext")
  }

  return useStore(store, (state) => state.session)
}
