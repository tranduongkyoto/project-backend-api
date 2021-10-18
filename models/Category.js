const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    // slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    // careers: {
    //   // Array of strings
    //   type: [String],
    //   required: true,
    //   enum: [
    //     'Web Development',
    //     'Mobile Development',
    //     'UI/UX',
    //     'Data Science',
    //     'Business',
    //     'Other',
    //   ],
    // },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//create Category slug from the name
// CategorySchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

CategorySchema.pre('remove', async (next) => {
  console.log(`Products being remove from Category ${this._id}`);
  await this.model('Product').deleteMany({
    Category: this._id,
  });
  next();
});

CategorySchema.virtual('Products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'Category',
  justOne: false,
});

module.exports = mongoose.model('Category', CategorySchema);
