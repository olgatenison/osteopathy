// import { updateSession } from "./src/supabase/middleware";

// export async function middleware(request) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: ["/admin/:path*"], // где требуется сессия
// };

import { updateSession } from "@/supabase/middleware";

export async function middleware(request) {
  return await updateSession(request);
}
export const config = {
  matcher: ["/admin/:path*"],
};
