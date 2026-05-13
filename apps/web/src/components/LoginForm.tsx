"use client";

import { useState } from "react";

type LoginResponse = { ok: boolean; user?: { name: string }; message?: string };

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = (await res.json()) as LoginResponse;
    if (data.ok && data.user) {
      setStatus("ok");
      setResult(`환영합니다, ${data.user.name}!`);
    } else {
      setStatus("error");
      setResult(data.message ?? "로그인 실패");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-sm">
      <label className="flex flex-col gap-1">
        아이디
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </label>
      <label className="flex flex-col gap-1">
        비밀번호
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </label>
      <button
        id="submit"
        type="submit"
        className="bg-black text-white px-3 py-2 rounded"
      >
        로그인
      </button>
      <div data-testid="result" className={status === "error" ? "text-red-600" : "text-green-700"}>
        {result}
      </div>
    </form>
  );
}
