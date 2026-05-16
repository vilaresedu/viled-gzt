import { NextRequest, NextResponse } from 'next/server'
import { readCategoryData } from '@/lib/data'
import categoriesData from '@/data/categories.json'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.EXEC_COOKIE_SECRET)

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  const category = categoriesData.find(c => c.id === params.category)

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  if (category.exec) {
    const token = cookies().get('exec_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
      await jwtVerify(token, secret)
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const issues = await readCategoryData(params.category)
  const issue = issues.find((i: any) => i.id === params.id)

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
  }

  return NextResponse.json(issue)
}
