# SHOPPING-CART-API

> Backend API for project training: ftech-shopping-cart (link FE: https://github.com/tranduongkyoto/Ftech_Project_Training)

## Usage

Rename ".env.env" to ".env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, Categories, Products and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

