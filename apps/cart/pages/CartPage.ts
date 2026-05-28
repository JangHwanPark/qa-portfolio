import type { Page, Locator } from "@playwright/test";

/**
 * 장바구니 POM.
 * 필드(로케이터)만 정의되어 있다. 동작 메서드(예: increment, setQty, expectTotal 등)는
 * 본인이 직접 작성한 뒤, 작성 후 [`apps/login/pages/LoginPage.ts`](../../login/pages/LoginPage.ts)
 * 의 메서드 구조와 비교 학습한다.
 *
 * 셀렉터는 모두 data-testid 기반이라 안정적이다. 시맨틱 셀렉터(getByRole 등) 변형도 시도해 볼 것.
 */
export class CartPage {
  // 전체 컨테이너
  readonly cart: Locator;
  readonly total: Locator;

  // 상품 카드별 영역 (id: "A" | "B" | "C" | "D")
  readonly item: (id: string) => Locator;
  readonly name: (id: string) => Locator;
  readonly subtotal: (id: string) => Locator;
  readonly notice: (id: string) => Locator;

  // 수량 조절 컨트롤
  readonly decBtn: (id: string) => Locator;
  readonly incBtn: (id: string) => Locator;
  readonly qtyInput: (id: string) => Locator;
  readonly delBtn: (id: string) => Locator;

  constructor(private readonly page: Page) {
    this.cart = page.getByTestId("cart");
    this.total = page.getByTestId("total");

    this.item = (id) => page.getByTestId(`item-${id}`);
    this.name = (id) => page.getByTestId(`name-${id}`);
    this.subtotal = (id) => page.getByTestId(`subtotal-${id}`);
    this.notice = (id) => page.getByTestId(`notice-${id}`);

    this.decBtn = (id) => page.getByTestId(`dec-${id}`);
    this.incBtn = (id) => page.getByTestId(`inc-${id}`);
    this.qtyInput = (id) => page.getByTestId(`qty-${id}`);
    this.delBtn = (id) => page.getByTestId(`del-${id}`);
  }

  async goto() {
    await this.page.goto("/");
  }

  // TODO: 본인이 작성할 메서드 예시
  // - increment(id, times = 1)
  // - decrement(id, times = 1)
  // - setQty(id, value)         (직접 입력)
  // - remove(id)                (삭제)
  // - readSubtotal(id): Promise<number>
  // - readTotal(): Promise<number>
  //
  // 단정(expect)은 POM 이 아니라 spec 에 두는 게 원칙이다.
}
