export function randomEmail(prefix = "user"): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`;
}

export function randomString(len = 8): string {
  return Math.random().toString(36).slice(2, 2 + len);
}
