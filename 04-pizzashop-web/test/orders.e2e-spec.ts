import { expect, test } from '@playwright/test'

test('List orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()
})

test('Paginate Orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Next Page' }).click()

  expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Last Page' }).click()

  expect(
    page.getByRole('cell', { name: 'Customer 51', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Previous Page' }).click()

  expect(
    page.getByRole('cell', { name: 'Customer 41', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 50', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'First Page' }).click()

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()
})

test('Filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Order ID').fill('order-11')

  await page.getByRole('button', { name: 'Filter Results' }).click()

  expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()
})

test('Filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Customer Name').fill('Customer 20')

  await page.getByRole('button', { name: 'Filter Results' }).click()

  expect(page.getByRole('cell', { name: 'Customer 20' })).toBeVisible()
})

test('Filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()

  await page.getByLabel('Pending').getByText('Pending').click()

  await page.getByRole('button', { name: 'Filter Results' }).click()

  const tableRows = await page.getByRole('cell', { name: 'Pending' }).all()

  expect(tableRows).toHaveLength(10)

  await page.waitForTimeout(1000)
})
