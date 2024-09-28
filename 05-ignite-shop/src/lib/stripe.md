Stripe is a payment tool very handful for us developers. On stripe is very simple for us to start using it. One good and
common way is to create a util folder, place a stripe.ts inside of it, and export a new constant named stripe which is a new
object of the class Stripe that comes from the 'stripe' library, we pass our secret key as the first parameter, and as the
second parameter an object, with the project name, apiVersion, etc

Now, if we were to utilize our stripe credential somewhere in our project, we simple need to import the stripe constant we've
just exported and utilize it like

const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })


this will simply get the products registered on our stripe dashboard.

But for us to work on running time, like utilize it for checkouts, which depends on the user interaction, we are going to use
the webhooks and create a checkout session inside stripe.

In the stripe checkout we say which items we want the cart to have, the client credentials, if he has any in our application,
or he would inform everything insde stripe, etc. Stripe has its own checkout, we won't make a transparent checkout, where
the person inserts his information inside our app, instead we are going to redirect the user to the stripe checkout page,
where the user will conclude his payment and after that, stripe is going to redirect them back to our app
