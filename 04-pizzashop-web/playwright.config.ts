import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './test',

  /* Run the tests in parallel */
  fullyParallel: true,

  /* To forbif when we want to execute ONLY one test */
  forbidOnly: !!process.env.CI,

  /* It's common for E2E tests to fail for any reason, so in a CI environment we make it run twice */
  retries: process.env.CI ? 2 : 0,

  /* How many tests we want to run in parallel */
  workers: process.env.CI ? 1 : undefined,

  /* In which formar we want to export the results */
  // reporter: 'html',

  use: {
    /* In which url we are going to run the tests, in our case, on the test environmnt url */
    baseURL: 'http://127.0.0.1:50789',
    /*
    The trace attribute is for when we are having some error in the tests and we have more details

    trace: 'on-first-retry', */
  },

  /* Command to run our application */
  webServer: {
    command: 'pnpm run dev:test-mock',
    url: 'http://localhost:50789',
    /* Don't launch the server after each test, here we are telling to reuse the existing ones */
    reuseExistingServer: !process.env.CI,
  },

  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],
})
