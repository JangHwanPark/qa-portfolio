import { By, WebDriver, until } from "selenium-webdriver";
import { env } from "@ta/shared-utils";

export class LoginPage {
  constructor(private readonly driver: WebDriver) {}

  async goto() {
    await this.driver.get(env.baseUrl);
  }

  async login(user: string, pass: string) {
    await this.driver.findElement(By.id("username")).sendKeys(user);
    await this.driver.findElement(By.id("password")).sendKeys(pass);
    await this.driver.findElement(By.id("submit")).click();
  }

  async resultText(timeoutMs = 5000): Promise<string> {
    const el = await this.driver.wait(
      until.elementLocated(By.css('[data-testid="result"]')),
      timeoutMs
    );
    return el.getText();
  }
}
