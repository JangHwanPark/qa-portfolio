import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { users } from "@ta/test-data";

test("POM 패턴으로 로그인", async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.validLocal.username, users.validLocal.password);
  await expect(login.result).toHaveText(/환영합니다/);
});
