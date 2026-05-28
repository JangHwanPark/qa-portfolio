# apps/login · 이메일 로그인 학습 프로젝트

QA 입사 과제 대비용 **단일 프로젝트**. 한 폴더에 다음을 모두 모았다.
- 4단계 학습 문서 ([`docs/`](docs/))
- POM + spec 자동화 코드 ([`pages/`](pages/), [`tests/`](tests/))
- Playwright 실행 설정 (`playwright.config.ts`)

워크스페이스 패키지명: `@ta/login-app`

---

## 기능 명세 (v1.0)

### 1. 입력 / 검증
- 이메일과 비밀번호로 로그인한다.
- 비밀번호는 **8~20자**, 영문 / 숫자 / 특수문자가 모두 포함되어야 한다.
- 등록되지 않은 이메일이나 비밀번호 불일치 시 동일한 메시지를 노출한다.
  - 메시지: "이메일 또는 비밀번호가 올바르지 않습니다"

### 2. 잠금 정책
- 비밀번호를 **5회 연속 실패**하면 해당 계정은 잠금 상태가 된다.
- 잠금은 **30분 후 자동 해제**된다.
- 잠금 상태에서는 정확한 비밀번호를 입력해도 로그인할 수 없다.

### 3. 휴면 정책
- **90일** 이상 미접속한 계정은 휴면 상태로 자동 전환된다.
- 휴면 계정으로 로그인을 시도하면 **휴면 해제 안내 화면**으로 이동한다.

### 4. 부가 기능
- 사용자는 "자동 로그인" 옵션을 체크할 수 있으며, 체크 시 **30일간** 세션이 유지된다.
- 사용자는 로그인 화면에서 **비밀번호 재설정 메일**을 요청할 수 있다.

---

## 4단계 학습 흐름

| 단계 | 문서 | 권장 소요 |
|---|---|---|
| 1. 요구사항 분석 | [`docs/01_requirements.md`](docs/01_requirements.md) | 15분 |
| 2. 시나리오 설계 | [`docs/02_scenarios.md`](docs/02_scenarios.md) | 20분 |
| 3. 테스트 케이스 | [`docs/03_testcases.md`](docs/03_testcases.md) | 30분 |
| 4. 자동화 분류 | [`docs/04_automation.md`](docs/04_automation.md) | 15분 |

각 문서는 **완성된 모범답안 + 학습 포인트** 형태로 작성되어 있다. 본인은 동일 명세를 보고 별도 파일(또는 노트)에 직접 작성한 뒤 본 문서와 항목별로 비교 학습한다. 자동화 코드도 마찬가지로 [`pages/`](pages/), [`tests/`](tests/) 를 역분석해 본인이 짠 셀렉터/대기 전략과 대조한다.

---

## 폴더 구조

```
apps/login/
├── README.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── docs/
│   ├── 01_requirements.md
│   ├── 02_scenarios.md
│   ├── 03_testcases.md
│   └── 04_automation.md
├── pages/
│   ├── LoginPage.ts        (demo-web POM, #id CSS 셀렉터)
│   └── SauceLoginPage.ts   (saucedemo POM, 시맨틱 셀렉터)
└── tests/
    ├── login-suite.spec.ts    (TC-001/002/009/014/015)
    └── login-locked.spec.ts   (TC-006 saucedemo 잠금)
```

---

## 실행

```bash
# 1회: 워크스페이스 인식 + 브라우저 설치
pnpm install
pnpm --filter @ta/login-app exec playwright install

# demo-web 기동 (별도 터미널)
pnpm --filter demo-web dev

# 본 앱 테스트
pnpm --filter @ta/login-app test
pnpm --filter @ta/login-app test tests/login-suite.spec.ts --project=chromium
pnpm --filter @ta/login-app test:repeat   # 10회 반복 안정성 확인
pnpm --filter @ta/login-app report
```

`tests/login-locked.spec.ts` 는 saucedemo 외부 사이트를 사용하므로 demo-web 기동 없이도 실행되지만, 외부 가용성에 따라 자동 skip 될 수 있다.

---

## 평가 관점

| 단계 | 평가 포인트 |
|---|---|
| 요구사항 분석 | 임계값(5회 / 30분 / 90일 / 30일) 누락 없음 · 자동 처리(잠금/휴면) 별도 분리 · 메시지 정책(사용자 열거 방지) 식별 |
| 시나리오 | P0 정의 엄격성 · 회귀 영역(잠금/휴면) 포함 · 비기능(보안/접근성) 포함 |
| 테스트 케이스 | 동등 분할(활성/잠금/휴면/미가입) · 경계값(실패 4/5/6, 비번 7/8/20/21) 명시적 표기 · 기대 결과 단정 가능 |
| 자동화 | 자동/부분자동/제외 분류 근거 · POM 추상화 · 시맨틱 셀렉터 · auto-waiting 활용 |
