import type { Page, Locator } from "@playwright/test";

export class SauceLoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly errorBanner: Locator;
  readonly inventoryHeader: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.submit = page.getByRole("button", { name: "Login" });
    this.errorBanner = page.locator('[data-test="error"]');
    this.inventoryHeader = page.locator(".title");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submit.click();
  }
}
