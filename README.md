# 🎧 Moodify AI

Turn your mood into music with AI

---

## 🚀 About The Project

Moodify is an AI-powered full stack application that detects user emotions using camera input and recommends songs based on the detected mood in real-time.

It combines computer vision and intelligent recommendation systems to deliver a personalized music experience.

---

## 🧠 Features

* 🎥 Real-time face emotion detection using camera
* 🤖 AI-based mood analysis
* 🎶 Mood-based song recommendation
* ⚡ Fast and modern UI with React + Vite
* 🔐 Secure backend with environment variables

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* MediaPipe (Face Expression Detection)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv

---

## ⚙️ Backend Setup

* Initialized Express server
* Configured middleware for JSON parsing
* Connected MongoDB using Mongoose
* Managed environment variables using dotenv

### Files Structure

* `server.js` → Server setup + DB connection
* `app.js` → Express app configuration
* `database.js` → MongoDB connection

---

## 💻 Frontend Setup

* Initialized React app with Vite
* Created main App component structure
* Implemented FaceExpression feature using MediaPipe
* Added styles and layout
* Included SVG assets for branding

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sameer-dev-106/moodify-ai
cd moodify-ai
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Improvements

* Spotify / YouTube API integration
* Better recommendation algorithm
* User authentication system
* Save mood history
* Dark mode UI

---

## 📸 How It Works

1. User allows camera access
2. Face expression is detected
3. Emotion is analyzed
4. Songs are recommended based on mood

---

## 🤝 Contributing

Feel free to fork this repo and contribute

---

## 📄 License

This project is licensed under the MIT License
