export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/queue/:path*",
    "/profile/:path*",
  ],
};