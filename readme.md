# 🛒 Grocery App Backend

A simple and scalable **Node.js + Express + MongoDB** backend built for a Grocery Management System.
It provides API endpoints to manage products — including adding, fetching, and deleting items.

---

## 🚀 Tech Stack

| Technology     | Purpose                                 |
| -------------- | --------------------------------------- |
| **Node.js**    | Server-side JavaScript runtime          |
| **Express.js** | Web framework for building APIs         |
| **MongoDB**    | NoSQL database for storing grocery data |
| **Mongoose**   | ODM library to interact with MongoDB    |
| **dotenv**     | Manage environment variables            |
| **cors**       | Handle cross-origin requests            |
| **nodemon**    | Auto-restart server during development  |

---

## 📦 Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/grocery-backend.git
cd grocery-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create environment file

Create a `.env` file in the project root and add:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/grocery_db
```

> ⚠️ If you’re using **MongoDB Atlas**, replace the `MONGO_URI` with your Atlas connection string.

---

## ▶️ Running the Server

### Development mode (auto restart)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

Server will start on:

```
http://localhost:5000
```

---

## 🧩 API Endpoints

### 🔹 Products

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/products`     | Get all products       |
| POST   | `/api/products`     | Add a new product      |
| DELETE | `/api/products/:id` | Delete a product by ID |

Example `POST` request body:

```json
{
  "name": "Apples",
  "price": 120,
  "category": "Fruits",
  "stock": 25,
  "image": "https://example.com/apple.jpg"
}
```

---

## 🧠 Folder Structure

```
server/
├── server.js              # Main entry point
├── .env                   # Environment variables
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── Product.js         # Product schema
├── routes/
│   └── productRoutes.js   # Product routes
└── package.json
```

---

## ⚙️ Useful Commands

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `npm install`       | Install dependencies                  |
| `npm run dev`       | Start development server with Nodemon |
| `npm start`         | Start production server               |
| `nodemon server.js` | Run server directly with Nodemon      |

---

## 💡 Next Steps

* 🔐 Add user authentication (JWT)
* 🛍️ Add cart and order APIs
* 🧾 Add admin dashboard support

---

**Made with ❤️ using Node.js + Express + MongoDB**
