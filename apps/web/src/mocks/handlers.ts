import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as { username?: string; password?: string };
    if (body.username === "admin" && body.password === "pass1234") {
      return HttpResponse.json({ ok: true, user: { name: "admin" } });
    }
    return HttpResponse.json(
      { ok: false, message: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }),

  http.get("/api/me", () => {
    return HttpResponse.json({ user: { name: "admin" } });
  }),
];
