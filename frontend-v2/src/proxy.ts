import { auth } from "@/lib/auth";

export default auth((req) => {
  const isProtected = req.nextUrl.pathname.startsWith("/") && 
                     !req.nextUrl.pathname.startsWith("/login") &&
                     !req.nextUrl.pathname.startsWith("/register") &&
                     !req.nextUrl.pathname.startsWith("/api");
  
  if (isProtected && !req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
