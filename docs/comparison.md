# Playwright vs Selenium 비교 표

| 항목 | Playwright | Selenium WebDriver |
| --- | --- | --- |
| 대기 | Auto-waiting 내장 | Explicit wait 필수 |
| 셀렉터 | `getByRole`, `getByTestId` 등 시맨틱 API | `By.css`, `By.xpath` 위주 |
| 병렬 실행 | 기본 제공 (`fullyParallel`) | Runner 설정에 의존 |
| 트레이스/리포트 | 내장 (HTML report, Trace Viewer) | 별도 도구 필요 |
| 브라우저 | Chromium, Firefox, WebKit | Chrome, Firefox, Edge, Safari |
| 모바일 | 디바이스 에뮬레이션 내장 | Appium 별도 필요 |
| 네트워크 mocking | `page.route()` 내장 | 별도 프록시/CDP 필요 |
| 학습 곡선 | 완만 | 가파른 편 (대기 전략, 드라이버 관리) |
| 생태계 성숙도 | 신생, 빠르게 성장 | 업계 표준, 풍부한 자료 |

## 같은 시나리오를 양쪽으로 작성하면 좋은 이유
- 두 도구의 추상화 차이를 체감할 수 있음
- "auto-waiting"이 실제로 제거하는 보일러플레이트 양을 코드로 비교 가능
- 실무에서 도구 선택 근거를 갖게 됨
