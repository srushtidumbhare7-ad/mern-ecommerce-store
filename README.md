🛒 MERN E-Commerce Store

A full-stack E-Commerce web application built using the MERN stack (MongoDB, Express, React, Node.js).
The project includes user authentication, admin management, cart, orders, search & filter, and a complete e-commerce workflow.

----

🚀 Features
👤 User Features

User Registration & Login (JWT Authentication)

View all products

Search products by name

Filter products by category

View product details

Add products to cart

Increase / decrease cart quantity

Remove items from cart

Checkout with shipping details

Place orders

View order history

Track order status

----

🛠️ Admin Features

Admin login & authorization

Add new products

Delete products

View all orders

Update order status (Processing → Shipped → Delivered)

----

🧰 Tech Stack
Frontend

React (Vite)

React Router DOM

Axios

React Icons

HTML, CSS

----

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Bcrypt (Password hashing)

---- 

📂 Project Structure
mern-ecommerce-store
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── screenshots
│   ├── login.png
│   ├── register.png
│   ├── home.png
│   ├── search-filter.png
│   ├── product-details.png
│   ├── cart.png
│   ├── checkout.png
│   ├── my-orders.png
│   ├── admin-dashboard.png
│   └── admin-orders.png
│
├── README.md
└── .gitignore

----
🧪 API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

----

Products

GET /api/products

GET /api/products/:id

POST /api/products (Admin)

DELETE /api/products/:id (Admin)

----
Orders

POST /api/orders

GET /api/orders/my

GET /api/orders (Admin)

PUT /api/orders/:id (Admin – update status)

----
📸 Screenshots

📌 All screenshots are stored in the screenshots/ folder

🔐 Authentication

Login Page → screenshots/login.png

Register Page → screenshots/register.png

🏠 User Interface

Home Page  → screenshots/home.png

Product Details Page → screenshots/productdetails.png

🛒 Cart & Checkout

Cart Page → screenshots/cart.png

Checkout Page → screenshots/checkout.png

📦 Orders

My Orders Page → screenshots/my-orders.png

🛠️ Admin Panel

Admin Dashboard → screenshots/admindashboard.png

----


🎯 Project Highlights

Secure JWT-based authentication

Role-based access (User / Admin)

Persistent cart using LocalStorage

Clean REST API design

Real-world e-commerce flow

Scalable and modular code structure

----

🚀 Future Enhancements

Payment gateway integration (Razorpay / Stripe)

Image upload using Cloudinary

Tailwind / Material UI

Product reviews & ratings

Wishlist feature

Deployment (Vercel + Render)
