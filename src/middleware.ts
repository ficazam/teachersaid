import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();

  const roleCookie = cookies().get("_role");

  if (!roleCookie && !url.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (roleCookie && !url.pathname.startsWith(`/${roleCookie.value}`)) {
    return NextResponse.redirect(new URL(`/${roleCookie.value}`, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
