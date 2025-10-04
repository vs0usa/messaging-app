import { expect, test } from "@playwright/test"

test("should load the home page", async ({ page }) => {
  await page.goto("http://localhost:3000/")
  await expect(page.getByText("Welcome to the messaging app!")).toBeVisible()
})

test("should redirect to home page when clicking on the logo", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/#")
  await page.getByRole("navigation").getByRole("link").nth(0).click()
  expect(page.url()).toBe("http://localhost:3000/")
})

test("should be able to change the theme", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  const initialBackgroundColor = await page.evaluate(() =>
    getComputedStyle(document.body).getPropertyValue("background-color"),
  )

  await page.getByRole("navigation").getByRole("button").click()
  await page.getByRole("menuitem").getByText("Theme").hover()
  await page.getByRole("menuitemradio").getByText("Dark").click()

  const newBackgroundColor = await page.evaluate(() =>
    getComputedStyle(document.body).getPropertyValue("background-color"),
  )

  expect(newBackgroundColor).not.toBe(initialBackgroundColor)
})
