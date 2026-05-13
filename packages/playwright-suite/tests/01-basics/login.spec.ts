import { test, expect } from "@playwright/test";
import { users } from "@ta/test-data";

test.describe("로컬 데모 로그인 (basics)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("올바른 자격 증명으로 로그인 성공", async ({ page }) => {
    await page.locator("#username").fill(users.validLocal.username);
    await page.locator("#password").fill(users.validLocal.password);
    await page.locator("#submit").click();
    await expect(page.getByTestId("result")).toHaveText(/환영합니다/);
  });

  test("잘못된 비밀번호로 로그인 실패", async ({ page }) => {
    await page.locator("#username").fill(users.invalidLocal.username);
    await page.locator("#password").fill(users.invalidLocal.password);
    await page.locator("#submit").click();
    await expect(page.getByTestId("result")).toHaveText(/올바르지 않습니다/);
  });
});
