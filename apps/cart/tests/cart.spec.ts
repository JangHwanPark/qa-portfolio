import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";

/**
 * cart spec 스켈레톤.
 * docs/03_testcases.md 에 작성한 TC 를 한 개씩 끌어와서 자동화한다.
 * 한 spec 파일에 모두 작성하지 말고, 시나리오 단위로 파일을 쪼개도 좋다.
 *   예) cart-quantity.spec.ts, cart-stock.spec.ts, cart-soldout.spec.ts
 */
test.describe("장바구니 수량 변경", () => {
  let cart: CartPage;

  test.beforeEach(async ({ page }) => {
    cart = new CartPage(page);
    await cart.goto();
  });

  test("TC-001 사과 + 1 시 소계와 총액이 갱신된다", async () => {
    // TODO: 본인이 작성. POM 의 incBtn / subtotal / total 사용.
    // 힌트: subtotal 텍스트 비교 또는 readSubtotal() 메서드 직접 작성.
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-002 바나나 재고 3개 한정. 4번째 + 클릭 시 한도 보정 + 안내", async () => {
    // TODO
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-003 체리 1인 최대 5개. 6번째 + 클릭 시 한도 보정", async () => {
    // TODO
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-004 복숭아(품절) 의 수량 컨트롤은 비활성 상태", async () => {
    // TODO: 품절 상품의 dec/inc/qtyInput disabled 여부
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });

  test("TC-005 직접 입력 0 입력 시 1로 보정 + 안내", async () => {
    // TODO
    test.fail(true, "본인이 자동화 코드를 작성한 뒤 본 라인을 제거할 것");
  });
});
