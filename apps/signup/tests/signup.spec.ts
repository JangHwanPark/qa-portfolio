import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";

/**
 * signup spec 스켈레톤.
 * docs/03_testcases.md 에 작성한 TC 를 한 개씩 끌어와서 자동화한다.
 * 한 spec 파일에 모두 작성하지 말고, 시나리오 단위로 파일을 쪼개도 좋다.
 *   예) signup-email.spec.ts, signup-password.spec.ts, signup-terms.spec.ts, signup-happy.spec.ts
 */
test.describe("회원가입 입력 검증", () => {
  let signup: SignupPage;

  test.beforeEach(async ({ page }) => {
    signup = new SignupPage(page);
    await signup.goto();
  });

  test("TC-001 해피패스: 모든 필수 항목 통과 시 인증 메일 발송 안내", async () => {
    // TODO: 본인이 작성. fillValidForm + agreeRequiredTerms + submit → result success
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-002 이메일 형식 오류 시 hint 에러 메시지", async () => {
    // TODO: signup.email 입력 "not-an-email" + blur → emailHint 에러 텍스트 단정
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-003 이미 가입된 이메일 입력 시 중복 안내", async () => {
    // TODO: existing@test.com 입력 → 블러 후 비동기 검증 완료 대기 → 중복 메시지 단정
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-004 인증 대기 중 이메일 입력 시 안내", async () => {
    // TODO: pending@test.com → 인증 대기 메시지
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-005 비밀번호 경계값: 7자 입력 시 길이 에러", async () => {
    // TODO: 7자 비밀번호 → passwordHint 에러
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-006 비밀번호 문자 조합 미달: 영문+숫자만 입력 시 에러", async () => {
    // TODO
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-007 비밀번호 확인 불일치", async () => {
    // TODO
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-008 닉네임 중복(admin) 입력 시 안내", async () => {
    // TODO
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-009 필수 약관(이용약관) 미동의 시 제출 차단", async () => {
    // TODO: 해피패스 입력 + termsPrivacy/termsAge 만 동의 + submit → result 에러
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-010 휴대폰 번호 형식 오류 시 hint 에러", async () => {
    // TODO: "01012345678" 입력 (하이픈 없음) → 형식 에러
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });
});
