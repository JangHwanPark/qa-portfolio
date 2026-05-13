import type { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly result: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator("#username");
    this.password = page.locator("#password");
    this.submit = page.locator("#submit");
    this.result = page.getByTestId("result");
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submit.click();
  }
}
