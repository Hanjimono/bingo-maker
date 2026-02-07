// System
import { z } from "zod"
import { readFile } from "fs/promises"
import { join } from "path"
import { router, publicProcedure } from "../trpc"
// Types
import { BingoCardList, BingoItem } from "../../src/consts/types/bingo"

const getPublicPath = (filename: string) => {
  return join(process.cwd(), "public", filename)
}

async function readJsonFile<T>(path: string, fallbackPath?: string): Promise<T> {
  try {
    const content = await readFile(path, "utf-8")
    return JSON.parse(content) as T
  } catch (err) {
    const isNotFound =
      err instanceof Error && "code" in err && err.code === "ENOENT"
    if (isNotFound && fallbackPath) {
      const content = await readFile(fallbackPath, "utf-8")
      return JSON.parse(content) as T
    }
    throw err
  }
}

export const bingoRouter = router({
  getList: publicProcedure.query(async (): Promise<BingoCardList> => {
    try {
      const path = getPublicPath("bingoList.json")
      const fallback = getPublicPath("bingoList.json.example")
      return await readJsonFile<BingoCardList>(path, fallback)
    } catch (error) {
      console.error("Error reading bingo list:", error)
      return []
    }
  }),

  getCard: publicProcedure
    .input(
      z.object({
        fileName: z.string()
      })
    )
    .query(async ({ input }): Promise<BingoItem[]> => {
      const path = getPublicPath(join("bingo", input.fileName))
      const fallback = getPublicPath(join("bingo", input.fileName + ".example"))
      try {
        return await readJsonFile<BingoItem[]>(path, fallback)
      } catch (error) {
        console.error(`Error reading bingo card ${input.fileName}:`, error)
        throw new Error(`Failed to load bingo card: ${input.fileName}`)
      }
    })
})
