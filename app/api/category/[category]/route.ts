import { NextRequest, NextResponse } from 'next/server'
import categoriesData from '@/data/categories.json'

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = categoriesData.find(c => c.id === params.category)

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  return NextResponse.json({ category })
}
