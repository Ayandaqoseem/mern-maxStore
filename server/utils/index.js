import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// calculate total price

export const calculateTotalPrice = (products, cartItems) => {
  let totalPrice = 0;

  cartItems.forEach(function (cartItem) {
    const product = products.find(function (product) {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {
      const quantity = cartItem.cartQuantity;
      const price = parseFloat(product.price);
      totalPrice += quantity * price;
    }
  });
  return totalPrice * 100;
};

// module.exports = {
//   calculateTotalPrice,
// };
