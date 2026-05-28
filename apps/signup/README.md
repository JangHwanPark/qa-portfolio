# apps/signup · 회원가입 학습 프로젝트

매뉴얼 테스트 + 자동화를 같이 연습하는 단일 앱. 한 폴더에 다음을 모두 모았다.
- 자동화 대상 HTML 페이지 (`index.html`, vite 로 서빙)
- 4단계 학습 문서 ([`docs/`](docs/), 답안란 빈 양식)
- POM 골격 ([`pages/`](pages/), 필드만 정의)
- spec 스켈레톤 ([`tests/`](tests/))

워크스페이스 패키지명: `@ta/signup-app`

---

## 기능 명세 (v1.0)

### 1. 입력 필드
- **이메일** (필수): 형식 검증, 중복 검사 (블러 시점, 비동기)
- **비밀번호** (필수): 8~20자, 영문 / 숫자 / 특수문자 모두 포함 (실시간 검증)
- **비밀번호 확인** (필수): 비밀번호와 일치 (실시간 검증)
- **닉네임** (필수): 2~10자, 중복 검사 (블러 시점, 비동기)
- **휴대폰 번호** (선택): 입력 시 `010-XXXX-XXXX` 형식

### 2. 약관 동의
- **이용약관** (필수)
- **개인정보 처리방침** (필수)
- **만 14세 이상 확인** (필수)
- **마케팅 정보 이메일 수신** (선택)
- **마케팅 정보 SMS 수신** (선택)

### 3. 가입 신청 처리
- 모든 필수 항목 통과 시 가입 신청 접수
- 이메일 인증 링크 발송 안내 메시지 노출
- 인증 링크 유효 시간: **24시간**
- 24시간 경과 시 가입 신청 자동 폐기 (해당 이메일 재사용 가능, 본 데모는 동작만 시뮬레이션)

### 4. 중복 / 상태별 응답
- **이미 가입 완료된 이메일**: "이미 가입된 이메일입니다."
- **인증 대기 중인 이메일**: "인증 대기 중인 이메일입니다."
- **중복 닉네임**: "이미 사용 중인 닉네임입니다."

### 5. 화면 / 안내
- 각 필드 아래 hint 영역에 검증 결과 / 에러 메시지 표시
- 제출 시 첫 실패 항목 메시지를 결과 영역에 표시
- 성공 시 결과 영역에 인증 메일 발송 안내 표시

---

## 자동화 대상 테스트 데이터 (`index.html` 내장 mock)

| 종류 | 값 | 의도 |
|---|---|---|
| 가입된 이메일 | `existing@test.com`, `user@example.com` | 중복 에러 시나리오 |
| 인증 대기 이메일 | `pending@test.com` | 대기 상태 에러 시나리오 |
| 중복 닉네임 | `admin`, `taker`, `tester` | 닉네임 중복 시나리오 |

---

## 학습 흐름

1. **매뉴얼 탐색 (10~15분)**: `pnpm --filter @ta/signup-app dev` 로 브라우저에서 직접 클릭하며 명세 vs 동작 차이 / 엣지 케이스 찾기. **자동화 코드 보기 전에** 진행.
2. **4단계 문서 작성**: [`docs/`](docs/) 의 빈 양식을 본인이 채운다. 매뉴얼 탐색 메모를 반영.
3. **자동화 작성**: [`pages/SignupPage.ts`](pages/SignupPage.ts) 의 필드만 보고 메서드를 본인이 채운 뒤, [`tests/`](tests/) 의 spec 스켈레톤을 완성한다.

| 단계 | 문서 / 파일 | 권장 소요 |
|---|---|---|
| 0. 매뉴얼 탐색 | 브라우저에서 `index.html` | 15분 |
| 1. 요구사항 분석 | [`docs/01_requirements.md`](docs/01_requirements.md) | 15분 |
| 2. 시나리오 설계 | [`docs/02_scenarios.md`](docs/02_scenarios.md) | 20분 |
| 3. 테스트 케이스 | [`docs/03_testcases.md`](docs/03_testcases.md) | 30분 |
| 4. 자동화 분류 | [`docs/04_automation.md`](docs/04_automation.md) | 15분 |
| 5. POM + spec | [`pages/`](pages/), [`tests/`](tests/) | 40분 |

비교 학습이 필요할 때는 [`apps/login`](../login/README.md) 의 동일 4단계 모범답안 + [`apps/cart`](../cart/README.md) 의 동일 형식 빈 양식을 참고한다. signup 도메인 분석의 결은 [`apps/cart/docs/examples/01_requirements_signup_example.md`](../cart/docs/examples/01_requirements_signup_example.md) 에 미리 정리되어 있다 (1단계만).

---

## 폴더 구조

```
apps/signup/
├── README.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── index.html              (자동화 대상 페이지)
├── docs/
│   ├── 01_requirements.md  (빈 양식)
│   ├── 02_scenarios.md
│   ├── 03_testcases.md
│   └── 04_automation.md
├── pages/
│   └── SignupPage.ts       (필드만 정의)
└── tests/
    └── signup.spec.ts      (describe + beforeEach 스켈레톤)
```

---

## 실행

```bash
# 1회: 워크스페이스 인식 + 브라우저 설치
pnpm install
pnpm --filter @ta/signup-app exec playwright install

# 매뉴얼 탐색용
pnpm --filter @ta/signup-app dev   # http://localhost:5175

# 자동화 (vite 자동 기동)
pnpm --filter @ta/signup-app test
pnpm --filter @ta/signup-app test --project=chromium
pnpm --filter @ta/signup-app test:repeat
```

---

## 매뉴얼 vs 자동화 분리 가이드

| 영역 | 매뉴얼이 우위 | 자동화가 우위 |
|---|---|---|
| 필드별 검증 메시지 텍스트 | △ | O (단정 명확) |
| 블러 / 입력 트리거 시점 | O (UX 자연스러움) | △ |
| 비동기 중복 확인 로딩 표시 | O (체감 속도) | △ (race condition) |
| 약관 필수 / 선택 분기 | △ | O (반복 검증) |
| 가입 성공 흐름 (해피패스) | X | O (회귀 필수) |
| 인증 메일 실제 수신 | O (외부 의존) | X |
| 비밀번호 정책 경계값 (7/8/20/21) | △ | O (자동화 우위) |
| 키보드 Tab 순서 / 접근성 | O | △ (axe-core 보조) |
| 24시간 자동 폐기 흐름 | X (시간 의존) | △ (time mock 필요) |

매뉴얼 / 자동화 어느 한쪽만 의존하면 놓치는 결함이 있다. 본 과제의 목표는 **어떤 검증이 어느 쪽에 더 적합한지 분류하는 감각**을 기르는 것.
