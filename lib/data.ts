import fs from 'fs'
import path from 'path'

export async function readCategoryData(category: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', `${category}.json`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch {
    return []
  }
}
