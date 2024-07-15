import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('Nav-Link', () => {
  it('Should highlight the link when is the current page link', () => {
    /*
      * If we were to try to make this, we should have on the url, where we would get the current page, the constant to make
    the checkings, but on our case, we are trying to make that test on a way we are unlinked with the real app. On unit
    tests, we have a DOM representation, but we don't have an active route.

    What we need to do, in order to achieve this is that we need to wrap that link inside a router, so we are going to use
    render(<Component />) and as second parameter to that render, we have a property named wrpaper, and that wrapper receives
    a component that will receive children and returns like it was our app and what we need to that component function as
    desired.

    On the routes.tsx, we are defining the routes with createBrowserRouter, but it is used when we are in a browser context,
    when we have an url, and on the tests we don't have the browser context, so we'll use another router named MemoryRouter
    the main difference between MemoryRouter and BrowserRouter, is that the active route, is saved on the memory, it don't
    stay stored on the url.

    MemoryRouter has an attribute, named initialEntries, that attribute receives an array, with the first value as wwhich
    route i want to begin that router with, the could would be like this below, that means that by using this wrap
    technique we are able to test components that depends on providers, so if we want to test a component, which depends
    on a context, or things like that, we only need to use the wrapper and wrap it on the provider of that context.
    */

    const wrapper = render(
      <>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/about"> About </NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )

    expect(wrapper.getByText('Home').dataset.current).toEqual('false')
    expect(wrapper.getByText('About').dataset.current).toEqual('true')

    wrapper.debug()
  })
})
