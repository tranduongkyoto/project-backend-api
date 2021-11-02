const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    // For sample support and debugging, not required for production:
    name: 'stripe-samples/accept-a-payment/prebuilt-checkout-page',
    version: '0.0.1',
    url: 'https://github.com/stripe-samples',
  },
});

const getCheckoutSession = async (req, res) => {
  console.log(req.query);
  const { session_id, order_id } = req.query;
  console.log(order_id);
  const order = await Order.findById(order_id);
  console.log(order);
  (order.isPaid = true), (order.paidAt = Date.now());
  await order.save();
  console.log(order);
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session.payment_status == 'paid') {
    res.status(200).json({
      success: true,
      data: session,
    });
  } else {
    res.status(400).json({
      fail: 'not paid',
    });
  }
};

const createCheckoutSession = async (req, res) => {
  const data = req.body;
  const domainURL = process.env.DOMAIN;

  // The list of supported payment method types. We fetch this from the
  // environment variables in this sample. In practice, users often hard code a
  // list of strings for the payment method types they plan to support.
  const pmTypes = (process.env.PAYMENT_METHOD_TYPES || 'card')
    .split(',')
    .map((m) => m.trim());

  // Create new Checkout Session for the order
  // Other optional params include:
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const product = await stripe.products.create({
    name: data.name || 'ace',
  });
  console.log(Math.round(data.price * 100));
  const price = await stripe.prices.create({
    unit_amount: Math.round(data.price * 100),
    currency: 'usd',
    product: product.id,
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: pmTypes,
    mode: 'payment',
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: data.success,
    cancel_url: data.cancel,
    // automatic_tax: { enabled: true }
  });
  // res.redirect(session.url);
  res.status(200).json(session.url);
};

module.exports = {
  createCheckoutSession,
  getCheckoutSession,
};
