# Selenium 학습 노트

## 핵심 개념
- **WebDriver** — 브라우저 세션. `Builder().forBrowser().build()`로 생성, 반드시 `quit()`
- **By locator** — `By.id`, `By.css`, `By.xpath`, `By.linkText` 등
- **Waits**
  - Implicit: `driver.manage().setTimeouts({ implicit: ms })` — 권장하지 않음 (혼동 유발)
  - Explicit: `driver.wait(until.elementLocated(...), timeout)` — 권장
  - Fluent: 폴링 간격/예외 무시 세밀 제어
- **ActionChains** — 마우스 hover, drag-drop, 키 조합

## Playwright와의 차이
- Selenium은 auto-waiting이 없어 명시적 wait 필수
- 병렬 실행은 Mocha/Jest 구성에 의존
- 트레이스, 비디오 같은 기능은 별도 라이브러리 또는 직접 구현
