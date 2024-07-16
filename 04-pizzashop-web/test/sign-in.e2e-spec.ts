import { expect, test } from '@playwright/test'

test('Sign in successfully', async ({ page }) => {
  await page.goto('/auth/signin', {
    waitUntil: 'networkidle',
  })

  /* If we leave the test like this, the page.goto(url) doesn't actually mean that we are waiting for the page to render
  so when we utilize it, we have an option as second parameter to wait until the page load

  here we are using the network idle value as the waitUntil attribute, the networkidle means that we are going to wait for all
  the react requisitions to finish and our login interface successfully renders
  */

  /* The .getByLabel('Your E-mail') was just by calling the playwright test --ui, which will open its browser, then, just
  by clicking in a button on the left of the 'locator' tab, and clicking on the email field, it returned to us which method
  we must call to fetch this value */

  await page.getByLabel('Your E-mail').fill('jorge@gmail.com')

  await page.getByRole('button', { name: 'Access Dashboard' }).click()

  const toast = page.getByText('We sent you an authentication link')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('Sign in with wrong credentials', async ({ page }) => {
  await page.goto('/auth/signin', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Your E-mail').fill('wrong@gmail.com')

  await page.getByRole('button', { name: 'Access Dashboard' }).click()

  const toast = page.getByText('Invalid Credentials')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('Navigate to sign up by clicking the new estabilishment', async ({
  page,
}) => {
  await page.goto('/auth/signin', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('link', { name: 'New Establishment' }).click()

  expect(page.url()).toContain('/signup')

  await page.waitForTimeout(2000)
})
