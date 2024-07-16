import { getByRole } from '@testing-library/react'
import { expect, test } from 'playwright/test'
import { toast } from 'sonner'

test('navigate to login page', async ({ page }) => {
  await page.goto('/auth/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Sign In' }).click()

  expect(page.url()).toContain('/auth/sign-in')
})

/* In tests, utilizing the mock environment, is important for us to utilize the names we specified in the mocks */
test('sign up successfully', async ({ page }) => {
  await page.goto('/auth/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Restaurant Name').fill('Pizza Shop')
  await page.getByLabel('Manager Name').fill('Jorge')
  await page.getByLabel('Phone nº').fill('jorge@gmail.com')
  await page.getByLabel('Your e-mail').fill('1597354532')

  await page.getByRole('button', { name: 'Finish Register' }).click()

  const toast = page.getByText('Resturant was successfully registered')

  expect(toast).toBeVisible()
})

test('error on signing up', async ({ page }) => {
  await page.goto('/auth/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Restaurant Name').fill('Invalid name')
  await page.getByLabel('Manager Name').fill('Jorge')
  await page.getByLabel('Phone nº').fill('jorge@gmail.com')
  await page.getByLabel('Your e-mail').fill('1597354532')

  await page.getByRole('button', { name: 'Finish Register' }).click()

  const toast = page.getByText('Error during the restaurant register')

  expect(toast).toBeVisible()
})
