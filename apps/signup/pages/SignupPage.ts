import type { Page, Locator } from "@playwright/test";

/**
 * 회원가입 POM.
 * 필드(로케이터)만 정의되어 있다. 동작 메서드(예: fillEmail, expectEmailHint, agreeAllRequired,
 * submit, expectSuccess 등)는 본인이 직접 작성한 뒤, 작성 후
 * [`apps/login/pages/LoginPage.ts`](../../login/pages/LoginPage.ts) 의 메서드 구조와 비교 학습한다.
 *
 * 셀렉터는 모두 data-testid 기반이라 안정적이다. 시맨틱 셀렉터(getByLabel / getByRole) 변형도 시도해 볼 것.
 *
 * 비동기 검증(이메일 / 닉네임 블러 후 200ms 지연)이 있어 대기 전략을 단정 기반으로 잡아야 한다.
 */
export class SignupPage {
  // 입력 필드
  readonly email: Locator;
  readonly password: Locator;
  readonly passwordConfirm: Locator;
  readonly nickname: Locator;
  readonly phone: Locator;

  // 각 필드의 hint(검증 결과 / 에러 메시지)
  readonly emailHint: Locator;
  readonly passwordHint: Locator;
  readonly passwordConfirmHint: Locator;
  readonly nicknameHint: Locator;
  readonly phoneHint: Locator;

  // 약관 체크박스
  readonly termsService: Locator;
  readonly termsPrivacy: Locator;
  readonly termsAge: Locator;
  readonly termsMarketingEmail: Locator;
  readonly termsMarketingSms: Locator;

  // 제출 / 결과
  readonly submitBtn: Locator;
  readonly result: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByTestId("email");
    this.password = page.getByTestId("password");
    this.passwordConfirm = page.getByTestId("password-confirm");
    this.nickname = page.getByTestId("nickname");
    this.phone = page.getByTestId("phone");

    this.emailHint = page.getByTestId("email-hint");
    this.passwordHint = page.getByTestId("password-hint");
    this.passwordConfirmHint = page.getByTestId("password-confirm-hint");
    this.nicknameHint = page.getByTestId("nickname-hint");
    this.phoneHint = page.getByTestId("phone-hint");

    this.termsService = page.getByTestId("terms-service");
    this.termsPrivacy = page.getByTestId("terms-privacy");
    this.termsAge = page.getByTestId("terms-age");
    this.termsMarketingEmail = page.getByTestId("terms-marketing-email");
    this.termsMarketingSms = page.getByTestId("terms-marketing-sms");

    this.submitBtn = page.getByTestId("submit");
    this.result = page.getByTestId("result");
  }

  async goto() {
    await this.page.goto("/");
  }

  // TODO: 본인이 작성할 메서드 예시
  // - fillEmail(value)                    (블러까지 트리거)
  // - fillPassword(value)
  // - fillPasswordConfirm(value)
  // - fillNickname(value)                 (블러까지 트리거)
  // - fillPhone(value)
  // - agreeRequiredTerms()                (필수 3개만)
  // - agreeAllTerms()                     (필수 + 선택)
  // - fillValidForm(overrides?)           (해피패스 폼 입력)
  // - submit()
  //
  // 단정(expect)은 POM 이 아니라 spec 에 두는 게 원칙이다.
  // 비동기 hint 대기는 expect(locator).toHaveText(...) 로 처리한다 (sleep 금지).
}
