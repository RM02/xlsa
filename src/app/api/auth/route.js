import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

const API_URL = process.env.API_v1_URL;

export async function POST(request) {
  
  const { username, password } = await request.json()
  
  let credentials = new FormData()
  credentials.append("username", username)
  credentials.append("password", password)

  let apiResponse = await fetch(`${API_URL}/auth/token/`, { method: 'POST', body: credentials })
  let data = await apiResponse.json()

  return NextResponse.json(data, { status: apiResponse.status });
}