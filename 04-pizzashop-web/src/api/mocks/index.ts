import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getDaysOrdersAmountMock } from './get-day-orders-amount'
import { getManagedRestaurantMock } from './get-manged-restaurant-mock'
import { getMonthCanceledsOrdersAmountMock } from './get-month-canceled-orders'
import { getMonthOrdersAmountMock } from './get-month-orders-amount'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { GetOrdersMock } from './get-orders-mock'
import { getPopularProductsMock } from './get-popular-products.mock'
import { getProfileMock } from './get-profile-mock'
import { registerRestaurantsMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'
import { updateProfileMock } from './update-profile-mock'

/* MSW Explanation

First we need to understand what are service workers. They are a type of web worker that run in the background, separate
from the main browser thread and can control network requests, cache resources, and so on.

In summary, they provide a powerful way to enhance a web application with offline capabilities, background synchronization
and improved performance through caching. By running independently of the main browser thread, they enable features that
contribute to a better user experience, even when network conditions are less than ideal

________________________________________________________________________________________________________________________

Mock Service Worker is a library used for mocking network requests in client-side and server-side applications.
It intercepts HTTP requests and provides mock responses without the need of an actual server

Some features include:

- Intercepting Requests': MSW intercept the http requests made by the application, allowing us to control the responses
and simulate different scenarios
- Integration with popular testing libraries, like jest, cypress, and sorybook, making it easy to use in our existent test
suites
- Realistic Mocking, by providing data that resembles real API responses
- Declarative API, making it easy to define request handler and responses

In the setupWorker we pass all the mocks we created


*/

export const worker = setupWorker(
  signInMock,
  registerRestaurantsMock,
  getDaysOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledsOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getDailyRevenueInPeriodMock,
  updateProfileMock,
  getProfileMock,
  getManagedRestaurantMock,
  GetOrdersMock,
)

/*
  By the moment we call this setupWorker, the mocks still are not going to function properly, the requests won't be intercepted
  only when we clal the worker.start that we are defining in the function below, our mocks will take action. After it,
  all the received requests will be intercepted by the mock service in our test environment
*/
export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
