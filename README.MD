# 🍽️ Recipe Sharing API

A full-featured **RESTful API** built using **Node.js**, **Express.js**, and **MongoDB**. It allows users to create, share, search, save, comment, and rate recipes — just like a mini social platform for cooking enthusiasts!

---

## 🔧 Features Implemented

### 🔐 Authentication & User Management
- User Sign Up and Login (JWT-based)
- View and update profile
- Secure protected routes using middleware

### 📋 Recipe Management
- Create, update, delete recipes
- Recipes have: name, description, instructions, images (max 5), tags (max 5)
- Fetch all recipes
- Get recipe by name

### 🔍 Search & Filtering
- Search by recipe name
- Filter recipes by tags

### ❤️ Save & Share Recipes
- Save recipes to your profile
- Share recipes (flag for visibility)
- View shared recipes

### ⭐ Ratings & Feedback
- Rate recipes (1 to 5 stars)
- Give text feedback (20–50 characters)
- Users can update their ratings and feedback

### 💬 Comments
- Add comments to recipes
- Share tips, ask questions, or give compliments

### 👥 Social Features
- Follow users
- View follower/following counts
- Prevent following yourself or following multiple times

---

## 🧪 API Routes

### 👤 User Routes

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/signup`           | Register a user              |
| POST   | `/login`            | Login a user                 |
| GET    | `/profile`          | View user profile            |
| PUT    | `/profile`          | Update profile               |
| GET    | `/users`            | Get all users                |
| POST   | `/users/follow`     | Follow another user          |

---

### 🥘 Recipe Routes

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/recipe`                 | Create a recipe                    |
| PUT    | `/recipe/:id`             | Update a recipe                    |
| DELETE | `/recipe/:id`             | Delete a recipe                    |
| GET    | `/recipes`                | Get all recipes                    |
| GET    | `/recipe/:name`           | Get a recipe by name               |
| GET    | `/recipes/filter`         | Filter recipes by tags             |
| POST   | `/recipe/save`            | Save recipe to user profile        |
| GET    | `/recipes/saved`          | View saved recipes                 |
| POST   | `/recipe/share`           | Share a recipe                     |
| GET    | `/recipes/shared`         | View all shared recipes            |
| POST   | `/recipe/rating`          | Rate a recipe                      |
| POST   | `/recipe/feedback`        | Give feedback on a recipe          |
| POST   | `/recipe/comment`         | Leave a comment on a recipe        |

---

## 🧰 Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for Authentication
- **bcrypt** for Password Hashing
- **dotenv** for Config Management

---

### 📂 Folder Structure
- recipe-api/
- │
- ├── controllers/ # Route logic
- ├── models/ # Mongoose schemas
- ├── routes/ # Route endpoints
- ├── middlewares/ # Auth middleware
- ├── config/ # DB connection
- ├── server.js # App entry point
- └── .env # Env variables



---

### ⚙️ Environment Setup

1. **Clone the Repository**

- git clone https://github.com/yourusername/recipe-api.git
- cd recipe-api

2.**Install Dependencies**

- npm install

3.**Create .env File**
- PORT=5000
- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=your_jwt_secret

4.**Run the Server**
- npm run dev
- API will be running on http://localhost:5000

---

### 📘 Example User Stories
- As a user, I can sign up and log in to access features.

- As a user, I can create recipes and tag them.

- As a user, I can search or filter recipes by tags.

- As a user, I can rate, comment, or give feedback to recipes.

- As a user, I can save recipes to my favorites.

- As a user, I can follow other cooks and get inspired!

---

### 🚀 Future Enhancements
- Add image upload via Cloudinary or S3

- Email or WhatsApp integration for real recipe sharing

- Real-time notifications (e.g., new follower, comment)

- Add recipe categories and filters like cuisine, difficulty

---

### 🧑‍💻 Author
- Shaik Naseer
- 📧 Email: naseershaik1976@gmail.com
- 🌐 GitHub: https://github.com/Shaiknaseer99
- 🔗 LinkedIn: https://www.linkedin.com/in/naseer-shaik-023738233/

---

### 📄 License
- This project is licensed under the MIT License.



