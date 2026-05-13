import "dotenv/config";

export const env = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:5173",
  publicDemoUrl: process.env.PUBLIC_DEMO_URL ?? "https://the-internet.herokuapp.com",
  sauceDemoUrl: process.env.SAUCE_DEMO_URL ?? "https://www.saucedemo.com",
  demoUser: process.env.DEMO_USER ?? "standard_user",
  demoPass: process.env.DEMO_PASS ?? "secret_sauce",
  logLevel: (process.env.LOG_LEVEL ?? "info") as "debug" | "info" | "warn" | "error",
};
