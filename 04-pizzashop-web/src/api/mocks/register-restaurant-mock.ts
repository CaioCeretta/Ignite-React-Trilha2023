import { http, HttpResponse } from 'msw'

import { RegisterRestaurantBody } from '../register-restaurant'

export const registerRestaurantsMock = http.post<never, RegisterRestaurantBody>(
  '/restaurants',
  async ({ request }) => {
    const { restaurantName } = await request.json()

    /* We are always checking if the name, email, or something is equal to a real case scenario, we are doing this because
    when we are creating out application tests, we don't want to test only the success flows, we also want to test what
    happens to our application if we get an error. So we create at least one path of ways that an user can take.

    So one test is of success, if everything went right, and the other one if something went wrong, if we pass a error toast,
    a message, etc.

     */

    console.log(restaurantName)

    if (restaurantName === 'Pizza Shop') {
      return new HttpResponse(null, { status: 201 })
    }

    return new HttpResponse(null, { status: 401 })
  },
)
