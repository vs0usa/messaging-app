import { expect } from "@playwright/test"
import type { Page } from "@playwright/test"

export const sendMessage = async (
  page: Page,
  message: string,
  name?: string,
) => {
  await page.goto("http://localhost:3000/messages")
  await page.waitForTimeout(2000)
  await page.getByRole("button").nth(1).click()

  if (name) {
    await page.getByPlaceholder("Search contacts...").fill(name)
    await page.getByRole("option").click()
  } else {
    await page.getByRole("option").nth(3).click()
  }

  await page.getByRole("textbox").fill(message)
  await page.keyboard.press("Enter")
  await expect(page.getByText(message)).toHaveCount(3) // 2x contacts list + 1x message
}
