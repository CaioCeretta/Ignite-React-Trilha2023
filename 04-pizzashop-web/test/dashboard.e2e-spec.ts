import { expect, test } from '@playwright/test'

test('Display day orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('20', { exact: true })).toBeVisible()

  expect(
    page.getByText('-5 In relation to yesterday', { exact: true }),
  ).toBeVisible()
})

test('Display month orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(
    page.getByText('A decrease of 10 in relation to the previous month'),
  ).toBeVisible()
})

test('Display month canceled orders amount metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('5', { exact: true })).toBeVisible()

  expect(
    page.getByText('An increase of -5% in relation to the previous month', {
      exact: true,
    }),
  ).toBeVisible()
})

test('Display month revenue metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('$200.00')).toBeVisible()

  expect(page.getByText('+10% in relation to last month')).toBeVisible()
})
