import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

export type BrowserName = "chrome" | "firefox";

export async function createDriver(browser: BrowserName = "chrome"): Promise<WebDriver> {
  if (browser === "chrome") {
    const options = new chrome.Options();
    if (process.env.HEADLESS !== "false") options.addArguments("--headless=new");
    options.addArguments("--no-sandbox", "--disable-dev-shm-usage", "--window-size=1280,800");
    return new Builder().forBrowser("chrome").setChromeOptions(options).build();
  }
  return new Builder().forBrowser(browser).build();
}
