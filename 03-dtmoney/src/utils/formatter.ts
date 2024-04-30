export const dateFormatter = new Intl.DateTimeFormat('en-US')

export const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

/* This way we are exporting an object, which whoever calls it only has to pass this imported object .format with the
value as a parameter */