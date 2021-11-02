const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
    required: false,
    default: 0,
  },
});

// ProductSchema.statics.getAverageCost = async function (CategoryId) {
//   console.log('Calculating avg cost...'.blue);
//   const obj = await this.aggregate([
//     {
//       $match: { Category: CategoryId },
//     },
//     {
//       $group: {
//         _id: '$Category',
//         averageCost: { $avg: '$tuition' },
//       },
//     },
//   ]);

//   try {
//     await this.model('Category').findByIdAndUpdate(CategoryId, {
//       averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// ProductSchema.post('save', function () {
//   this.constructor.getAverageCost(this.Category); // this.Category here is Category field of Schema ~ CategoryId argument for getAverageCost function
// });

// ProductSchema.pre('remove', function () {
//   this.constructor.getAverageCost(this.Category);
// });
module.exports = mongoose.model('Product', ProductSchema);
