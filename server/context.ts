// System
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { inferAsyncReturnType } from "@trpc/server"

export const createContext = async (_opts: CreateExpressContextOptions) => {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>
