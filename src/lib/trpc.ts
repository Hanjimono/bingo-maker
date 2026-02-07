// System
import { createTRPCReact } from "@trpc/react-query"
import { httpBatchLink } from "@trpc/client"
// Types
import type { AppRouter } from "../../server/router"

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_URL || "http://localhost:3001/trpc"
    })
  ]
})
