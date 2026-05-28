import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "@ta/test-data";

/**
 * TC-001 / 002 / 009 / 014 / 015 자동화 (demo-web 대상)
 * 학습 메모: LoginPage 의 #id CSS 셀렉터를 그대로 사용.
 * 시맨틱 우선 원칙을 적용한 변형은 SauceLoginPage 와 비교 학습한다.
 */
test.describe("이메일 로그인 (demo-web)", () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test("TC-001 정상 로그인 시 환영 메시지 노출", async () => {
    await login.login(users.validLocal.username, users.validLocal.password);
    await expect(login.result).toHaveText(/환영합니다/);
  });

  test("TC-002 비밀번호 불일치 시 동일 실패 메시지", async () => {
    await login.login(users.validLocal.username, "wrong-pw");
    await expect(login.result).toHaveText(/올바르지 않습니다/);
  });

  test("TC-009 미가입 이메일도 동일 실패 메시지 (사용자 열거 방지)", async () => {
    await login.login("nobody", users.validLocal.password);
    await expect(login.result).toHaveText(/올바르지 않습니다/);
  });

  test("TC-014 이메일 형식 오류는 클라이언트 검증으로 막혀야 함", async () => {
    test.fixme(
      true,
      "demo-web 은 이메일 형식 검증이 없음. 실제 서비스 도입 시 활성화.",
    );
    await login.username.fill("abc");
    await login.password.fill(users.validLocal.password);
    await expect(login.submit).toBeDisabled();
  });

  test("TC-015 빈 값 제출 시 결과 영역에 변화 없음", async () => {
    await login.submit.click();
    await expect(login.result).toHaveText("");
  });
});
