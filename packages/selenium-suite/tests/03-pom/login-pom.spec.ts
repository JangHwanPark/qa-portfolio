import { expect } from "chai";
import { WebDriver } from "selenium-webdriver";
import { createDriver } from "../../drivers/driverFactory";
import { LoginPage } from "../../pages/LoginPage";
import { users } from "@ta/test-data";

describe("로그인 POM (Selenium)", function () {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createDriver("chrome");
  });
  afterEach(async () => {
    await driver.quit();
  });

  it("POM 패턴으로 로그인", async () => {
    const login = new LoginPage(driver);
    await login.goto();
    await login.login(users.validLocal.username, users.validLocal.password);
    expect(await login.resultText()).to.match(/환영합니다/);
  });
});
