import { auth } from "@/auth"
import { NextResponse } from "next/server"
 

export const proxy = auth((req ) => {

 const { pathname } = req.nextUrl
  const session = req.auth
   if (!session && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }
   if (!session && pathname.startsWith("/creer_defis")) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
  }
     if (!session && pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
  }
    if (!session && pathname.startsWith(`/participation`)) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
  }



  return NextResponse.next()
})
 

export const config = {
  matcher: ["/admin/:path*", "/creer_defis/:path*", "/profile/:path*", "/participation/:path*", "/api/:path*"],
}