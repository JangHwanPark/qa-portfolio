# 4단계 · 자동화 분류 + POM 코드 (모범답안)

[03_testcases.md](03_testcases.md) 의 TC 를 **자동 / 부분자동 / 제외** 로 분류하고, Playwright POM 구조로 코드를 작성한 예시.

## 분류 정의
- **자동**: 매 PR Smoke 또는 nightly Regression 에서 자동 실행
- **부분 자동**: 사전 상태 세팅(API / DB seed / 시계 조작) 필요
- **자동 제외**: 외부 의존(메일 발송 등), 장기 대기(30일 세션), 또는 코드로 검증 어려운 부분(시각 흐름)

## 대상 페이지
| 환경 | 용도 | URL |
|---|---|---|
| 로컬 데모 (`apps/demo-web`) | 정상 / 실패 메시지 학습 | `/` (admin / pass1234) |
| saucedemo | 잠금 시나리오 학습 | https://www.saucedemo.com (`locked_out_user`) |

`apps/demo-web` 은 단순 정답 비교만 구현되어 잠금/휴면/자동 로그인은 자동화 학습 대상 외이다.

---

## 1. 자동화 대상 시나리오

- **검증 대상 기능**: 이메일 로그인 (TC-001 ~ TC-018)
- **자동화 범위**
  - 매 PR Smoke: TC-001
  - nightly Regression: TC-002, TC-009, TC-014, TC-015
  - 학습용 (외부 사이트): saucedemo `locked_out_user` 로 잠금 메시지 검증 (TC-006)
- **자동화 제외 케이스 및 사유**
  - **TC-005 (6회 실패 카운터)**, **TC-007 (30분 자동 해제)**: 실시간 대기 또는 백엔드 시각 조작 필요. demo-web 에 미구현
  - **TC-008 (휴면 진입)**: demo-web 에 휴면 정책 미구현. 실제 서비스에선 DB seed 로 마지막 접속일 백데이팅
  - **TC-016 (자동 로그인 30일)**: 브라우저 재시작 + 30일 경과. CI 자동화 비용 과대
  - **TC-017 (재설정 메일 발송)**: 외부 메일 시스템 의존. Mailhog 도입 시 재평가
  - **TC-018 (접근성 Tab 이동)**: axe-core 등 보조 자동화는 가능하나 시각 흐름 검증은 수동

## 2. 자동화 매트릭스

| TC | 자동화 여부 | 대상 환경 | 트리거 | 사전 상태 세팅 | 비고 |
|---|---|---|---|---|---|
| TC-001 | 자동 | demo-web | 매 PR Smoke | 없음 | POM `LoginPage` 사용 |
| TC-002 | 자동 | demo-web | nightly | 없음 | 실패 메시지 단정 |
| TC-003 | 부분 자동 | (가상) | nightly | API 로 실패 카운터 = 3 | demo-web 미구현. 실 서비스용 |
| TC-004 | 부분 자동 | (가상) | nightly | API 로 실패 카운터 = 4 | 전이 검증 핵심 |
| TC-005 | 자동 제외 | - | - | - | 잠금 이후 카운터 동작은 정책 추측 영역 |
| TC-006 | 자동 (saucedemo) | saucedemo | nightly | `locked_out_user` 사용 | 잠금 메시지 학습 |
| TC-007 | 부분 자동 | (가상) | nightly | DB 시각 백데이팅 | 시계 의존 |
| TC-008 | 부분 자동 | (가상) | nightly | DB 마지막 접속일 백데이팅 | 휴면 분기 |
| TC-009 | 자동 | demo-web | nightly | 없음 | 메시지 정책 동일 검증 |
| TC-010~013 | 자동 (제한적) | demo-web | nightly | 없음 | demo-web 에 길이 검증 없으면 `test.fixme` |
| TC-014 | 자동 | demo-web | nightly | 없음 | 클라이언트 형식 검증 |
| TC-015 | 자동 | demo-web | 매 PR | 없음 | 빈 값 제출 |
| TC-016 | 자동 제외 | - | - | - | 30일 대기 불가 |
| TC-017 | 자동 제외 | - | - | - | 외부 메일 의존 |
| TC-018 | 보조 자동 | demo-web | nightly | 없음 | axe-core 통합 시 |

## 3. 셀렉터 전략 / 대기 전략

- 셀렉터 우선순위: `getByRole` > `getByLabel` > `getByTestId` > CSS `#id`
- demo-web 은 시맨틱 라벨이 있으므로 `getByLabel('아이디')` 도 가능. `LoginPage` 는 `#id` CSS 사용 → `SauceLoginPage` 의 시맨틱 셀렉터와 비교 학습
- 대기: `expect(...).toBeVisible()`, `toHaveText()` 의 auto-waiting 만 사용. `waitForTimeout` 금지
- 잠금 메시지 검증(saucedemo)은 `toHaveText` 로 정규식 부분 매칭

## 4. 코드 위치

| 파일 | 역할 |
|---|---|
| [`playwright.config.ts`](../playwright.config.ts) | 본 앱 전용 Playwright 설정 |
| [`pages/LoginPage.ts`](../pages/LoginPage.ts) | demo-web POM (`#id` CSS 셀렉터) |
| [`pages/SauceLoginPage.ts`](../pages/SauceLoginPage.ts) | saucedemo POM (`getByRole` / `getByPlaceholder` 시맨틱 셀렉터) |
| [`tests/login-suite.spec.ts`](../tests/login-suite.spec.ts) | TC-001/002/009/014/015 |
| [`tests/login-locked.spec.ts`](../tests/login-locked.spec.ts) | TC-006 (saucedemo 잠금) |

## 5. 회귀 안정성 메모

- **깨지기 쉬운 부분**
  - 메시지 텍스트(i18n / 카피 변경 시): 정규식 부분 매칭 사용
  - 외부 사이트(saucedemo): 가용성 의존. `test.skip(condition)` 으로 다운 시 건너뛰기
  - 잠금/휴면 시뮬레이션: UI 5회 클릭 대신 API 또는 DB seed 로 사전 상태 세팅 (시간 + 안정성 둘 다 개선)
- **안정화 방법**
  - 메시지 단정: `toHaveText(/올바르지 않습니다/)` 처럼 핵심 단어만
  - 상태 세팅: API 직접 호출 (테스트 헬퍼 fixture)
  - 동일 spec 10회 반복 통과 후 머지 (`test:repeat` 스크립트)
- 자동화 제외 케이스는 본 매트릭스에 사유와 함께 기록 (코드 주석으로 흩어지지 않게)

## 실행 명령

```bash
pnpm install                                       # 1회: 워크스페이스 인식
pnpm --filter @ta/login-app exec playwright install
pnpm --filter demo-web dev                         # 별도 터미널
pnpm --filter @ta/login-app test                   # 전체 spec
pnpm --filter @ta/login-app test tests/login-suite.spec.ts --project=chromium
pnpm --filter @ta/login-app test:repeat            # 10회 반복 안정성 확인
```

---

## 학습 포인트

- **분류의 핵심은 "사전 상태 세팅 가능 여부"**: 잠금/휴면을 자동화 못한다고 단정하면 틀림. UI 로 5회 클릭하는 대신 API/DB 로 상태를 만들면 자동화 가능 → "부분 자동" 으로 분류. **자동화 비용을 줄이는 사고**가 평가 포인트.
- **자동 제외 사유를 코드 주석이 아닌 문서에**: 코드에 `// TODO: 자동화 안됨` 흩뿌리지 말고, 매트릭스에 사유를 모아두면 회의/리뷰에서 한 번에 본다.
- **POM 의 메서드는 동작만, 단정은 spec 에**: `LoginPage.login()` 은 입력+클릭까지. `expect(login.result).toHaveText(...)` 는 spec 에서. POM 안에 `assertLoggedIn()` 같은 단정 메서드를 두면 재사용성이 떨어진다.
- **시맨틱 vs CSS 셀렉터 비교**: `LoginPage` 는 `#id` CSS, `SauceLoginPage` 는 `getByRole` / `getByPlaceholder`. 두 스타일을 같은 폴더에 둔 이유는 **셀렉터 깨짐 위험**의 차이를 직접 비교하라는 것. `#submit` 은 id 가 바뀌면 즉시 깨지지만 `getByRole('button', { name: 'Login' })` 은 텍스트만 같으면 살아남는다.
- **외부 사이트 의존 보호**: saucedemo 가 다운되면 빌드 전체가 빨개진다. `test.skip(condition, '...')` 로 다운 시 건너뛰기. CI 신뢰도를 떨어뜨리지 않는 패턴.
