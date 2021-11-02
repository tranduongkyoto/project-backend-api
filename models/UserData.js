const mongoose = require('mongoose');
const UserDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.ObjectId, ref: 'Order', required: false },

    cart: [
      {
        title: {
          type: String,
          trim: true,
          required: [true, 'Please add Product title'],
        },
        image: {
          type: String,
          required: [true, 'Please add path image'],
        },
        description: {
          type: String,
          required: [true, 'Please add description'],
        },
        quantity: {
          type: Number,
          default: 100,
        },
        sizes: {
          type: [String],
          required: [true, 'Please add  list of size'],
        },
        price: {
          type: Number,
          required: [true, 'Please add price of product'],
        },
        rating: {
          type: Number,
          required: [true, 'Please add rating'],
        },
        place: {
          type: String,
          required: [true, 'Please add Place'],
        },
        brand: {
          type: String,
          required: [true, 'Please add brand'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        category: {
          type: mongoose.Schema.ObjectId,
          ref: 'Category',
          required: true,
        },
        count: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: false },
      phoneNum: { type: String, required: false },
      address: { type: String, required: false },
      postalCode: { type: String, required: false },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserData', UserDataSchema);
