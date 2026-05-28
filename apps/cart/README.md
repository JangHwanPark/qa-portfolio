# apps/cart · 장바구니 수량 변경 학습 프로젝트

매뉴얼 테스트 + 자동화를 같이 연습하는 단일 앱. 한 폴더에 다음을 모두 모았다.
- 자동화 대상 HTML 페이지 (`index.html`, vite 로 서빙)
- 4단계 학습 문서 ([`docs/`](docs/), 답안란 빈 양식)
- POM 골격 ([`pages/`](pages/), 필드만 정의)
- spec 스켈레톤 ([`tests/`](tests/))

워크스페이스 패키지명: `@ta/cart-app`

---

## 기능 명세 (v1.0)

### 1. 수량 변경
- 장바구니의 각 상품은 **수량 조절 UI** (`-` / 숫자 입력 / `+`) 를 가진다.
- 사용자는 버튼 또는 **직접 입력**으로 수량을 변경할 수 있다.
- 수량 변경 시 **해당 상품 소계**와 **총 결제 금액**이 즉시 갱신된다.

### 2. 수량 제약
- 최소 수량은 **1개** 다.
- 상품의 **재고 수량**을 초과해 담을 수 없다.
- 일부 상품은 **1인 최대 구매 수량** 제한을 가진다. (예: 1인 최대 5개)
- 제약 초과 시 수량은 허용 한도로 보정되고 안내 메시지가 노출된다.

### 3. 삭제
- 수량 변경과 별개로, 상품을 장바구니에서 **삭제**하는 버튼이 따로 있다.

### 4. 품절
- **품절** 상품은 장바구니에 남아있어도 수량 변경 / 직접 입력이 불가하다.

### 5. 화면
- 수량 / 재고 / 1인 최대 / 품절 상태는 각 상품 카드에 노출된다.
- 안내 메시지는 해당 상품 카드 아래 표시된다.

---

## 자동화 대상 상품 데이터 (`index.html` 내장)

| ID | 이름 | 단가 | 초기 수량 | 재고 | 1인 최대 | 품절 |
|---|---|---|---|---|---|---|
| A | 사과 (재고 충분) | 1,500 | 1 | 99 | - | X |
| B | 바나나 (재고 3개 한정) | 2,000 | 1 | 3 | - | X |
| C | 체리 (1인 최대 5개) | 8,000 | 1 | 99 | 5 | X |
| D | 복숭아 (품절) | 5,000 | 0 | 0 | - | O |

---

## 학습 흐름

1. **매뉴얼 탐색 (10~15분)**: `pnpm --filter @ta/cart-app dev` 로 브라우저에서 직접 클릭하며 명세 vs 동작 차이 / 엣지 케이스 찾기. **자동화 코드 보기 전에** 진행.
2. **4단계 문서 작성**: [`docs/`](docs/) 의 빈 양식을 본인이 채운다. 매뉴얼 탐색 메모를 반영.
3. **자동화 작성**: [`pages/CartPage.ts`](pages/CartPage.ts) 의 필드만 보고 메서드를 본인이 채운 뒤, [`tests/`](tests/) 의 spec 스켈레톤을 완성한다.

| 단계 | 문서 / 파일 | 권장 소요 |
|---|---|---|
| 0. 매뉴얼 탐색 | 브라우저에서 `index.html` | 15분 |
| 1. 요구사항 분석 | [`docs/01_requirements.md`](docs/01_requirements.md) | 15분 |
| 2. 시나리오 설계 | [`docs/02_scenarios.md`](docs/02_scenarios.md) | 20분 |
| 3. 테스트 케이스 | [`docs/03_testcases.md`](docs/03_testcases.md) | 30분 |
| 4. 자동화 분류 | [`docs/04_automation.md`](docs/04_automation.md) | 15분 |
| 5. POM + spec | [`pages/`](pages/), [`tests/`](tests/) | 40분 |

비교 학습이 필요할 때는 [`apps/login`](../login/README.md) 의 동일 4단계 모범답안을 참고한다.

---

## 폴더 구조

```
apps/cart/
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
│   └── CartPage.ts         (필드만 정의)
└── tests/
    └── cart.spec.ts        (describe + beforeEach 스켈레톤)
```

---

## 실행

```bash
# 1회: 워크스페이스 인식 + 브라우저 설치
pnpm install
pnpm --filter @ta/cart-app exec playwright install

# 매뉴얼 탐색용
pnpm --filter @ta/cart-app dev   # http://localhost:5174

# 자동화 (vite 자동 기동)
pnpm --filter @ta/cart-app test
pnpm --filter @ta/cart-app test --project=chromium
pnpm --filter @ta/cart-app test:repeat
```

---

## 매뉴얼 vs 자동화 분리 가이드

| 영역 | 매뉴얼이 우위 | 자동화가 우위 |
|---|---|---|
| 즉시 갱신 시각 확인 | O (사용자가 자연스럽다고 느끼는가) | X |
| 금액 합계 계산 정확성 | X | O (반복 검증 가치 큼) |
| 안내 메시지 노출 | △ (텍스트 정확성) | O (텍스트 단정) |
| 재고/1인 최대 경계값 | △ | O (자동화 우위) |
| 품절 상품 비활성 | △ | O (disabled 단정) |
| 입력 필드 음수/문자/소수 | O (브라우저 동작 차이) | △ (브라우저별 다름) |
| 삭제 후 복구 흐름 | O (UX 검증) | X (현재 명세에 복구 없음) |
| 접근성 (Tab / 스크린리더) | O | △ (axe-core 보조) |

매뉴얼 / 자동화 어느 한쪽만 의존하면 놓치는 결함이 있다. 본 과제의 목표는 **어떤 검증이 어느 쪽에 더 적합한지 분류하는 감각**을 기르는 것.
