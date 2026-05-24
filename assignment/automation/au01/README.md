# 과제 A-01 · demo-web Playground 위젯 자동화

| 항목 | 내용 |
|---|---|
| 카테고리 | A · 자동화 실기 |
| 난이도 | 입문 |
| 권장 소요 시간 | 60분 |
| 대상 회사 | 일반 |
| 도구 | Playwright (Selenium 으로도 동일 시나리오 작성 가능) |
| 학습 목표 | 셀렉터 전략 + 대기 전략 + POM 기본 구조 익히기 |
| 평가 포인트 | 시맨틱 셀렉터 사용 비율 · auto-waiting 활용 · POM 추상화 · 회귀 안정성 |

## 대상 페이지
`apps/demo-web/playground.html` — 다음 7개 위젯 포함

1. 인사하기 (텍스트 입력 → 출력)
2. 카운터 (증가 / 감소 / 초기화)
3. 약관 동의 (체크박스 → 버튼 활성화)
4. 드롭다운 선택
5. 표시 / 숨김 토글
6. 지연 메시지 (1.5초 후 표시)
7. 할 일 목록 (추가 / 삭제)

## 작성 문제
위 7개 위젯 중 다음 3개를 자동화하시오.

### 필수 자동화 대상
1. **인사하기** — 입력값에 따라 정상 메시지 / 빈 입력 안내 메시지 분기
2. **약관 동의 + 제출** — 체크 전후 제출 버튼 상태와 제출 후 메시지
3. **지연 메시지** — 1.5초 후 메시지 노출 (auto-waiting 활용, 고정 대기 금지)

### 선택 자동화 대상 (시간 여유 시)
- 할 일 목록의 추가 / 삭제 흐름
- 드롭다운 선택 후 결과 텍스트 검증

## 작성 조건
- `apps/demo-web/tests/` 하위에 spec 파일 작성
- Page Object Model 사용 (`tests/pages/playground.page.ts` 활용 또는 신규 작성)
- 셀렉터 우선순위: `getByRole` > `getByLabel` > `getByTestId` > CSS / XPath
- 고정 대기(`waitForTimeout`) 사용 금지
- 각 시나리오는 **독립 실행 가능** 해야 함 (테스트 간 의존 금지)
- 동일 spec 을 10회 반복 실행했을 때 모두 통과해야 함

## 실행 명령 (참고)
```bash
pnpm --filter demo-web test tests/scenario --project=chromium
pnpm --filter demo-web test tests/scenario --project=chromium --repeat-each=10
```

---

## 답안 작성란

### 1. 자동화 대상 시나리오
- 검증 대상 기능:
- 자동화 범위:
- 자동화 제외 케이스 및 사유:

### 2. 셀렉터 전략 / 대기 전략
- 셀렉터 전략:
- 대기 전략:
- POM 구조:

### 3. 코드
- spec 파일 경로:
- POM 파일 경로:

```typescript
// 핵심 코드 인용 또는 전체 코드
```

### 4. 회귀 안정성 메모
- 깨지기 쉬운 부분:
- 안정화 방법:
- 10회 반복 실행 결과:
