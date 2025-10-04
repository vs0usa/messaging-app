import { expect, test } from "@playwright/test"

test("should load the messages page", async ({ page }) => {
  await page.goto("http://localhost:3000/messages")
  await expect(page.getByText("Messages")).toBeVisible()
})
