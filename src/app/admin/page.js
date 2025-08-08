import { redirect } from "next/navigation";
import { createServerClientTyped } from "@/supabase/server";
import AdminContent from "./AdminContent"; // <-- renamed

export default async function ProtectedAdminPage() {
  const supabase = await createServerClientTyped();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Ошибка при получении пользователя:", error.message);
  }

  if (!data?.user) {
    redirect("/login");
  }

  return <AdminContent />;
}
