import { expect } from "chai";
import { WebDriver, By } from "selenium-webdriver";
import { createDriver } from "../../drivers/driverFactory";
import { env } from "@ta/shared-utils";
import { users } from "@ta/test-data";

describe("로컬 데모 로그인 (Selenium basics)", function () {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createDriver("chrome");
    await driver.get(env.baseUrl);
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("올바른 자격 증명으로 로그인 성공", async () => {
    await driver.findElement(By.id("username")).sendKeys(users.validLocal.username);
    await driver.findElement(By.id("password")).sendKeys(users.validLocal.password);
    await driver.findElement(By.id("submit")).click();
    const text = await driver.findElement(By.css('[data-testid="result"]')).getText();
    expect(text).to.match(/환영합니다/);
  });

  it("잘못된 비밀번호로 로그인 실패", async () => {
    await driver.findElement(By.id("username")).sendKeys(users.invalidLocal.username);
    await driver.findElement(By.id("password")).sendKeys(users.invalidLocal.password);
    await driver.findElement(By.id("submit")).click();
    const text = await driver.findElement(By.css('[data-testid="result"]')).getText();
    expect(text).to.match(/올바르지 않습니다/);
  });
});
