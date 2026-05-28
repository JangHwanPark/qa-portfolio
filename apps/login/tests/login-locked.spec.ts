import { test, expect } from "@playwright/test";
import { SauceLoginPage } from "../pages/SauceLoginPage";
import { users } from "@ta/test-data";

/**
 * TC-006 잠금 상태에서 정확한 비밀번호 입력 → 차단
 * demo-web 은 잠금 정책 미구현이므로 saucedemo 의 locked_out_user 로 학습한다.
 * 외부 사이트 의존이라 다운 시 자동 skip 되도록 보호한다.
 */
test.describe("잠금 계정 (saucedemo)", () => {
  test("TC-006 잠금 사용자 로그인 시 차단 메시지 노출", async ({ page }) => {
    const login = new SauceLoginPage(page);

    try {
      await login.goto();
    } catch {
      test.skip(true, "saucedemo 접근 실패. 외부 가용성 이슈로 skip.");
    }

    await login.login(users.sauceLocked.username, users.sauceLocked.password);

    await expect(login.errorBanner).toBeVisible();
    await expect(login.errorBanner).toHaveText(/locked out/i);
    await expect(login.inventoryHeader).not.toBeVisible();
  });

  test("대조: standard_user 는 정상 로그인", async ({ page }) => {
    const login = new SauceLoginPage(page);

    try {
      await login.goto();
    } catch {
      test.skip(true, "saucedemo 접근 실패. 외부 가용성 이슈로 skip.");
    }

    await login.login(users.sauceStandard.username, users.sauceStandard.password);

    await expect(login.inventoryHeader).toHaveText("Products");
  });
});
