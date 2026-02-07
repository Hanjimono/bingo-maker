// System
import { router } from "./trpc"
// Routers
import { bingoRouter } from "./routers/bingo"

export const appRouter = router({
  bingo: bingoRouter
})

export type AppRouter = typeof appRouter
