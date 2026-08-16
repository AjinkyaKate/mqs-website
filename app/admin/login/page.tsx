"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B2A3A] px-4">
      <form
        action={action}
        className="w-full max-w-sm bg-white px-8 py-10"
        style={{ borderTop: "2px solid #16C1F3" }}
      >
        <h1 className="mb-8 font-[family-name:var(--font-archivo)] text-xl font-bold text-[#0B2A3A]">
          Admin Login
        </h1>

        {state?.error && (
          <p className="mb-4 text-sm text-red-600">{state.error}</p>
        )}

        <label className="mb-1 block text-xs text-[#5F7688]">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mb-5 h-12 w-full border-0 border-b border-[#D3DFE7] bg-transparent pl-0.5 text-sm text-[#0B2A3A] outline-none transition-colors focus:border-[#16C1F3]"
          placeholder="admin@mqstechnologies.com"
        />

        <label className="mb-1 block text-xs text-[#5F7688]">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mb-8 h-12 w-full border-0 border-b border-[#D3DFE7] bg-transparent pl-0.5 text-sm text-[#0B2A3A] outline-none transition-colors focus:border-[#16C1F3]"
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={pending}
          className="flex h-12 w-full items-center justify-center bg-[#0E3A52] text-sm font-semibold text-white transition-colors hover:bg-[#0A2B3D] disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
