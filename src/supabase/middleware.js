import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

/**
 * Обновляет сессию Supabase через middleware
 * @param {import("next/server").NextRequest} request
 */
export async function updateSession(request) {
  const response = NextResponse.next({ request });

  const requestCookies = request.cookies.getAll();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => requestCookies,
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // ⚠️ Не убирай — эта строка триггерит refresh токена и синхронизацию куков
  await supabase.auth.getUser();

  return response;
}
