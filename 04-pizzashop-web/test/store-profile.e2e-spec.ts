import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Store Profile' }).click()

  await page.getByRole('button', { name: 'Save' }).click()

  const toastError = page.getByText('There was an error updating the profile')

  await expect(toastError).toBeVisible()

  await page.getByLabel('Name').fill('Rocket Pizza')
  await page.getByLabel('Description').fill('Another Description')

  await page.getByRole('button', { name: 'Save' }).click()

  const toastSuccess = page.getByText('Successfully updated profile')

  await expect(toastSuccess).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
})
