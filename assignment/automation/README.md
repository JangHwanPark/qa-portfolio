# A · Automation · 자동화 실기

Playwright / Selenium 으로 주어진 시나리오를 자동화하는 카테고리.
본 레포의 `apps/demo-web`, `apps/api-playground` 를 검증 대상으로 활용한다.

## 환경 사전 준비
```bash
pnpm install
pnpm --filter demo-web exec playwright install
# 데모 웹 기동 (별도 터미널) — 또는 playwright.config 의 webServer 가 자동 기동
pnpm --filter demo-web dev
# API 서버 기동 (필요한 과제에서)
pnpm --filter api-playground dev
```

## 코드 작성 위치
| 도구 | 위치 |
|---|---|
| Playwright (E2E) | `packages/playwright-suite/tests/` 또는 `apps/demo-web/tests/` |
| Playwright (API) | `packages/api-suite/tests/` |
| Selenium | `packages/selenium-suite/tests/` |

## 답안 양식
각 문제에 다음 항목을 함께 작성한다.

### 1. 자동화 대상 시나리오 (서술)
- 검증 대상 기능 / 검증 포인트
- 자동화 범위 (Smoke / Regression / Edge case)
- 명시적으로 자동화 **제외**한 케이스와 그 이유

### 2. 셀렉터 전략 / 대기 전략
- 어떤 셀렉터를 우선했는지 (`getByRole` > `data-testid` > CSS …)
- 명시적 대기 vs auto-waiting 사용 기준

### 3. 코드 (Playwright 또는 Selenium)
- 실제 spec / page object 파일 경로 명시
- 본 답안에는 핵심 부분만 인용해도 됨

### 4. 회귀 안정성 메모
- 깨지기 쉬운 부분 (시간 의존, 외부 호출 등)
- 어떻게 안정화했는지 (mocking, retry, soft assertion 등)

## 작성 원칙
- 셀렉터는 **시맨틱 우선** (`getByRole`, `getByLabel`, `getByTestId`)
- `waitForTimeout` 같은 고정 대기 금지 — `expect.poll`, `toBeVisible` 등 사용
- 한 spec = 한 시나리오 (병렬 실행 안정성)
- Page Object Model 사용 권장 (셀렉터 변경 시 영향 범위 축소)

## 문제 목록
| 코드 | 시나리오 | 도구 | 시간 | 대상 |
|---|---|---|---|---|
| [A-01](au01/README.md) | demo-web playground 위젯 자동화 | Playwright | 60분 | 일반 |

## 평가 기준
| 기준 | 가중치 | 평가 내용 |
|---|---|---|
| 동작 | 25% | 코드가 실제로 통과함 |
| 셀렉터 전략 | 20% | 시맨틱 우선, 깨지기 어려운 셀렉터 |
| 대기 전략 | 20% | 고정 대기 없음, auto-waiting 활용 |
| 추상화 | 20% | POM / 헬퍼 분리 적절 |
| 회귀 안정성 | 15% | 동일 spec 10회 반복 통과 |
