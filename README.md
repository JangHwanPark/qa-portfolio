- [Playwright](https://playwright.dev/?utm_source=chatgpt.com)

# Test Automation 학습 모노레포

Playwright와 Selenium을 비교 학습하기 위한 pnpm + turbo 모노레포입니다.

## 구조

```
apps/
  demo-web/              로컬 데모 사이트 (안정적 학습용)
packages/
  playwright-suite/      Playwright 테스트 (TypeScript)
  selenium-suite/        Selenium WebDriver 테스트 (TypeScript)
  shared-utils/          공용 유틸 (logger, env, faker)
  test-data/             공용 픽스처 데이터
docs/                    학습 노트
```

## 시작하기

```bash
pnpm install
cp .env.example .env

# 데모 사이트 띄우기 (포트 5173)
pnpm --filter demo-web dev

# 전체 테스트
pnpm test

# 개별 실행
pnpm --filter playwright-suite test
pnpm --filter selenium-suite test
```

## 학습 진행 순서 제안

1. `packages/playwright-suite/tests/01-basics` — locator, assertion
2. `packages/selenium-suite/tests/01-basics` — 동일 시나리오를 Selenium으로
3. 두 구현을 비교하며 `docs/comparison.md`에 정리
4. POM, fixture, 인증 상태 재사용 등 단계적으로 진도
