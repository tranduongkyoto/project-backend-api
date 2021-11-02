const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
);
const Products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const importData = async () => {
  try {
    //await Category.create(Categories);
    await Product.create(Products);
    // await User.create(users);
    console.log('Data imported ...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    //await Category.deleteMany();
    await Product.deleteMany();
    // await User.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
