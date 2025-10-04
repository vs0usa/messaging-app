import { expect } from "@playwright/test"
import type { Page } from "@playwright/test"

export const signUp = async (
  page: Page,
  user: { name: string; email: string; password: string },
) => {
  await page.goto("http://localhost:3000/auth/sign-up")
  await page.fill("#name", user.name)
  await page.fill("#email", user.email)
  await page.fill("#password", user.password)
  await page.click("button[type=submit]")
  await expect(page.getByText("Welcome to the app!")).toBeVisible()
  expect(page.url()).toBe("http://localhost:3000/")
}

export const signIn = async (
  page: Page,
  user: { email: string; password: string },
) => {
  await page.goto("http://localhost:3000/auth/sign-in")
  await page.fill("#email", user.email)
  await page.fill("#password", user.password)
  await page.click("button[type=submit]")
  await expect(page.getByText("Welcome to the app!")).toBeVisible()
  expect(page.url()).toBe("http://localhost:3000/")
}
