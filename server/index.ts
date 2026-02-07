// System
import express from "express"
import cors from "cors"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
// Server
import { appRouter } from "./router"
import { createContext } from "./context"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// tRPC: handle all procedure paths under /trpc (e.g. /trpc/bingo.getList)
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
