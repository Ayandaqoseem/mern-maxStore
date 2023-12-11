import Order from "../models/orderModel.js";
import Product from "../models/product.js";
import { calculateTotalPrice } from "../utils/index.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createOrder = async (req, res) => {
  try {
    const {
      orderDate,
      orderTime,
      orderAmount,
      orderStatus,
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon,
    } = req.body;

    //     Validation
    if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
      return res.json("Order data missing!!!");
    }

    await Order.create({
      user: req.user.id,
      orderDate,
      orderTime,
      orderAmount,
      orderStatus,
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon,
    });

    res.json("Order created");
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === 1) {
      orders = await Order.find().sort({ createdAt: -1 });
      return res.json(orders);
    }

    orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.json("Order not found");
    }

    if (req.user.role === 1) {
      return res.json(order);
    }

    if (order.user.toString() !== req.user._id.toString()) {
      res.status(401).json("User not authorized");
    }
    res.json(order)
  } catch (err) {
    console.log(err);
  }
};


// update Order status
export const UpdateOrderStatus = async(req, res) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return req.json("Order not found");
    }

    // Update the order status
    await Order.findByIdAndUpdate(
      {
        id: _id
      },
      {
        orderStatus
      },
      {
        new: true,
        runValidators: true,
      }
    )

    res.json("Order status updated")
  } catch (err) {
    console.log(err);
  }
}


export const payWithStripe = async(req, res) => {
  try {
    const { items, shipping, description, coupon } = req.body;

   const products = await Product.find();

   let orderAmount;
   orderAmount = calculateTotalPrice(products, items);


   if(coupon !== null && coupon?.name !== "nil") {
      let totalAfterDiscount = 
      orderAmount - (orderAmount * coupon?.discount) /100;
      orderAmount = totalAfterDiscount
   }

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "NGN",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  } catch (err) {
    console.log(err);
  }
}
