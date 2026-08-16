"use server";

import { createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(
  _prev: { error: string },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: "Invalid credentials" };
  }

  await createSession();
  redirect("/admin/enquiries");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
