import { faker } from "@faker-js/faker"
import { expect, test } from "@playwright/test"
import { signIn, signUp } from "../utils/auth"

const user = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

test("should load the sign in page", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/sign-in")
  await expect(page.getByText("Welcome back")).toBeVisible()
})

test("should load the sign up page", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/sign-up")
  await expect(page.getByText("Create Account")).toBeVisible()
})

test("should sign up & redirect to the home page", async ({ page }) => {
  await signUp(page, user)
})

test("should sign in & redirect to the home page", async ({ page }) => {
  await signIn(page, user)
})

test("should not have access to auth pages while signed in", async ({
  page,
}) => {
  await signIn(page, user)
  await page.goto("http://localhost:3000/auth/sign-in")
  expect(page.url()).toBe("http://localhost:3000/")
  await page.goto("http://localhost:3000/auth/sign-up")
  expect(page.url()).toBe("http://localhost:3000/")
})

test("should sign out & redirect to the sign in page", async ({ page }) => {
  await signIn(page, user)
  await page.getByRole("navigation").getByRole("button").click()
  await page.getByRole("menuitem", { name: "Sign Out" }).click()
  await page.getByRole("navigation").getByRole("button").click()
  await page.getByRole("menuitem", { name: "Sign In" }).click()
})
