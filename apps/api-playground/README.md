# api-playground

API 테스트(Postman / Swagger / 코드 기반) 학습용 샘플 서버.

## 무엇이 들어있나
- Express 기반 REST 서버 (`/api/health`, `/api/users`)
- Swagger UI: `http://localhost:3001/docs`
- OpenAPI 스펙: `openapi.yaml`
- Postman 컬렉션: `postman/api-playground.postman_collection.json`
- Supertest 샘플 테스트: `tests/users.spec.ts`

## 실행
```bash
pnpm --filter api-playground install      # 최초 1회
pnpm --filter api-playground dev          # 서버 (http://localhost:3001)
pnpm --filter api-playground test         # supertest
```

## 학습 흐름 (직접 짜본 뒤 AI 답 역분석)
1. **Postman** — `postman/*.json`을 Postman에 import 해서 요청 4종을 직접 실행. 응답 코드, 헤더, 스키마를 눈으로 본다. Tests 탭에 `pm.test(...)` 어서션을 본인이 먼저 작성해본다.
2. **Swagger UI** — `/docs`에서 같은 엔드포인트를 "Try it out"으로 호출. `openapi.yaml`을 열어 스펙 작성 규칙(paths, components/schemas, $ref)을 손으로 따라 적어본다.
3. **코드 기반(Supertest)** — `tests/users.spec.ts`의 TODO를 직접 채운다. POST 성공/400 케이스를 본인 스타일로 먼저 짜본 뒤, AI/문서에 같은 케이스를 짜달라고 해서 차이를 본다 (어서션 위치, 헬퍼 추상화, beforeEach 활용 등).

## 다음에 추가해볼 만한 것
- 인증(JWT) 엔드포인트 + Postman의 pre-request script로 토큰 주입
- newman으로 Postman 컬렉션을 CLI에서 실행
- contract test (Pactum / openapi schema validator)
- Playwright `request` 컨텍스트로 같은 시나리오 재구현 → UI 자동화와 비교
