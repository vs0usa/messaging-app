import { faker } from "@faker-js/faker"
import { expect, test } from "@playwright/test"
import { signIn, signUp } from "../utils/auth"
import { sendMessage } from "../utils/messages"

const user = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

const user2 = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

const user3 = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

test("should load the messages page", async ({ page }) => {
  await page.goto("http://localhost:3000/messages")
  await expect(page.getByText("Messages")).toBeVisible()
})

test("should send a message", async ({ page }) => {
  await signUp(page, user)
  await sendMessage(page, "Hello world!")
})

test("should delete a message", async ({ page }) => {
  await signIn(page, user)
  await sendMessage(page, "Trying to delete a message!")
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click()
  await page.getByRole("button", { name: "Delete" }).click()
  await page.waitForTimeout(500)
  await expect(page.getByText("Trying to delete a message!")).not.toBeVisible()
})

test("should show the typing indicator", async ({ browser }) => {
  const context1 = await browser.newContext()
  const context2 = await browser.newContext()
  const page1 = await context1.newPage()
  const page2 = await context2.newPage()

  await signUp(page1, user2)
  await signUp(page2, user3)
  await page2.goto("http://localhost:3000/messages")
  await sendMessage(page1, "Hello world!", user3.name)
  await page2.getByRole("main").getByRole("button").nth(1).click()
  await expect(page2.getByText("Hello world!")).toHaveCount(3)
  await expect(page1.getByText("Hello world!")).toHaveCount(3)
  await page2
    .getByRole("textbox")
    .pressSequentially("Hi how are you?", { delay: 100 })
  await page2.waitForTimeout(300)
  await expect(page1.getByText("Recipient is typing...")).toBeVisible()
  await page1
    .getByRole("textbox")
    .pressSequentially("I'm good, thank you!", { delay: 100 })
  await page2.waitForTimeout(300)
  await expect(page2.getByText("Recipient is typing...")).toBeVisible()
})
