# 🎬 Movie Tracker

Frontend application for the Movie Tracker platform.

This Angular application allows users to search for movies, authenticate securely, and manage a personal movie tracking list. It connects to a NestJS backend API and integrates movie data from TMDB.

---

## 🚀 Live Application

Frontend: https://movie-tracker-ps7b.onrender.com/

---

## 🧠 What This Application Does

- Allows users to register and log in
- Authenticates users using JWT
- Protects private routes
- Enables users to search movies via TMDB
- Allows adding and removing movies from a personal list
- Gives to user their statistics about the movies they have added
- Communicates securely with a deployed backend API
- Provides a responsive and structured user interface

This project demonstrates a complete frontend-to-backend production architecture.

---

## 🛠 Technologies Used

- **Angular 21**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **Angular HttpClient**
- **JWT Authentication**
- **Render (Static Site Hosting)**

---

## 🔐 Authentication Flow

1. User logs in or registers.
2. Backend returns a JWT token.
3. Token is stored on the client.
4. Authenticated requests include: Authorization: Bearer <token>

Protected routes are guarded using Angular route guards.

---

## 🌍 Architecture

Angular SPA (Frontend)  
⬇  
NestJS REST API (Backend)  
⬇  
MongoDB Atlas (Database)  

The frontend is deployed as a static site on Render and connects to a production backend hosted separately.

---

## 🖥 Development

To run locally:

```bash
npm install
ng serve
```
App runs at: http://localhost:4200
Backend runs locally at: http://localhost:3000

To production:

```bash
ng build --configuration production
```

---

## 👨‍💻 Author: Juan José Alzate García


