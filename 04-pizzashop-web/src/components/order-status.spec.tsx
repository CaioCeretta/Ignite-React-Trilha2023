import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('Should display the right text when the order status is pending', () => {
    const wrapper = render(<OrderStatus status="pending" />)

    // wrapper.debug()

    const statusText = wrapper.getByText('Pending')

    // wrapper.find will return us a promise, it'1s commonly used when an element takes long to show on the screen

    // wrapper.get will look for the element, and if it don't exist it will return an error

    // wrapper.query will look for the element, if it don't exist it won't give us an error, it will return null

    /* Like the rounded div before the order status text, is an element which we can't simply find it, by text or things like it
    but one thing we can do is adding a data-testid into it to look for it (this data-testid is going to be added on the real comp)
    with data-testid="badge" */

    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-slate-400')
  })
  /* Canceled */

  it('Should display the right text when the order status is canceled', () => {
    const wrapper = render(<OrderStatus status="canceled" />)
    const statusText = wrapper.getByText('Cancelled')

    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-rose-500')
  })

  /* Processing */

  it('should display the right text when order status is processing', () => {
    const wrapper = render(<OrderStatus status="processing" />)

    const statusText = wrapper.getByText('Processing')
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-400')
  })

  /* Delivering */
  it('Should display the right text when the order status is delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />)
    const statusText = wrapper.getByText('In Transport')

    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-400')
  })

  /* Delivered */
  it('Should display the right text when the order status is delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />)
    const statusText = wrapper.getByText('Delivered')

    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-emerald-500')
  })
})
