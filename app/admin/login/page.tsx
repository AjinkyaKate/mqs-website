import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const authed = await verifySession();
  if (authed) redirect("/admin/enquiries");

  return <LoginForm />;
}
