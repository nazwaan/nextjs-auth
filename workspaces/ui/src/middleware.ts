import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('Middleware hit:', request.nextUrl.pathname)

  const token = request.cookies.get('token')?.value;

  if(!token) { return NextResponse.redirect(new URL('/login', request.url)) }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};