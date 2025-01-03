
import { countries } from "@/utils/data"
import { NextResponse } from "next/server"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(
    
  ) {
    try {
    
      return NextResponse.json({
        message: 'Fetch succesfull',
        data: [...countries].sort((a, b) =>
          a.name.localeCompare(b.name),
        ).map(el => ({
          label: el.name,
          value: el.name
        })),
      })
    } catch (error) {
      console.log('[PRODUCT_GET_SINGLE]', error)
      return new NextResponse('Internal error', { status: 500 })
    }
  }