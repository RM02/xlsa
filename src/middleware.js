import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
/*     let cookie = request.cookies.get("currentUser")?.value
    let user = JSON.parse(cookie)
    if (!user.access) {
      return NextResponse.redirect(new URL('/auth/expire/', request.url))
    }
  NextResponse.next() */
}
 
export const config = {
  matcher: ['/dashboard/:path*'],
}