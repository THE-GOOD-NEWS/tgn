import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { locales } from "./i18n";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export default withAuth(
  function onSuccess(req) {
    const response = intlMiddleware(req);

    // Extract locale from pathname and add as header
    const pathname = req.nextUrl.pathname;
    const locale = pathname.split("/")[1] || "en";

    if (response) {
      response.headers.set("x-locale", locale);
      response.headers.set("x-pathname", pathname);
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect The Good Project routes
        // if (req.nextUrl.pathname.includes("/the-good-project")) {
        //   return token?.role === "subscriber" || token?.role === "admin";
        // }
        const protectedRoutes = ["/account"];
        const path = req.nextUrl.pathname;

        const publicRoutes = [
          "/",
          "/login",
          "/signin",
          "/signup",
          "/create-admin",
          "/register",
        ];
        const isProtectedRoute = protectedRoutes.some((route) =>
          path.startsWith(route)
        );
        const isPublicRoute = publicRoutes.includes(path);
        // Protect dashboard routes
        if (!isProtectedRoute && !isPublicRoute) {
          return true;
        }

        // For public routes, allow access regardless of auth status
        if (isPublicRoute) {
          return true;
        }

        // For protected routes, check if user has token
        if (isProtectedRoute) {
          return !!token;
        }

        // For other routes, allow access
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
