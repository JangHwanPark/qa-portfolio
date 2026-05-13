# Playwright 학습 노트

## 핵심 개념
- **Locator vs ElementHandle** — Locator는 지연 평가, 자동 재시도 포함
- **Auto-waiting** — `click`, `fill`, `expect().toHaveText` 등이 자동으로 actionable/조건 대기
- **Fixture** — `test.extend`로 의존성 주입, beforeEach 보일러플레이트 제거
- **Trace Viewer** — `--trace=on` 후 `npx playwright show-trace`

## 자주 쓰는 selector 우선순위
1. `getByRole`, `getByLabel` (접근성 기반, 가장 권장)
2. `getByTestId` (data-testid)
3. CSS / XPath (최후의 수단)

## 명령어
```bash
pnpm --filter playwright-suite test
pnpm --filter playwright-suite test:ui      # UI 모드로 디버깅
pnpm --filter playwright-suite codegen      # 동작 녹화 → 코드 생성
```
