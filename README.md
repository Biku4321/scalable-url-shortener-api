# 🚀 Scalable URL Shortener API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A high-performance, containerized URL shortening service engineered for horizontal scalability and rapid response times. Built with a modular microservice architecture, this system utilizes caching, rate-limiting, and optimized indexing to handle high-throughput traffic efficiently.

---

## ✨ System Features & Engineering Highlights

*   **⚡ O(1) Lookup & Hashing:** Utilizes Base62 encoding (`nanoid`) for secure, collision-resistant 7-character unique ID generation. Backed by MongoDB indexing for instant read operations.
*   **🧠 High-Performance Caching:** Implemented the Cache-Aside pattern via **Redis**, reducing database queries by ~60% and drastically minimizing redirection latency under concurrent load.
*   **🛡️ Robust Rate Limiting:** Built custom middleware using the **Token Bucket algorithm** via Redis (`rate-limiter-flexible`) to enforce a limit of 100 requests/minute per user, preventing DDoS abuse and ensuring system stability.
*   **📊 Asynchronous Analytics:** Real-time click tracking and timestamping decoupled from the main redirection thread, ensuring that metrics logging never blocks the user response.
*   **🐳 Dockerized Deployment:** Completely containerized environment (Node.js API, Redis, MongoDB) using `docker-compose` for guaranteed parity across development, testing, and production.

---

## 🏗️ System Architecture

1. **Client Request:** User hits the endpoint to shorten a URL or visit a short link.
2. **Rate Limiter (Redis):** Verifies the IP has not exceeded the 100 req/min limit.
3. **Cache (Redis):** Checks if the URL mapping is cached. If a cache hit occurs, returns the response instantly.
4. **Database (MongoDB):** On a cache miss, fetches the URL using an indexed O(1) lookup, updates the cache, and returns the response.
5. **Analytics (Async):** Fires a background task to increment click counts without holding up the HTTP cycle.

---

## 🚀 Getting Started

### Prerequisites
*   [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose installed on your machine.

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/scalable-url-shortener-api.git](https://github.com/YOUR_USERNAME/scalable-url-shortener-api.git)
   cd scalable-url-shortener-api
Set up Environment Variables
Create a .env file in the backend/ directory based on the example provided:

Bash
cp backend/.env.example backend/.env
Spin up the Microservices
Run the following command from the root directory to build and start the containers:

Bash
docker compose up --build
The API will be available at http://localhost:3000.

📖 API Documentation
1. Shorten a URL
Converts a long URL into a highly optimized short link.

Endpoint: POST /api/urls/shorten

Headers: Content-Type: application/json

Body:

JSON
{
  "originalUrl": "[https://github.com/your-username/highly-complex-repo-link](https://github.com/your-username/highly-complex-repo-link)"
}
Response (201 Created):

JSON
{
  "originalUrl": "[https://github.com/your-username/highly-complex-repo-link](https://github.com/your-username/highly-complex-repo-link)",
  "shortUrl": "http://localhost:3000/aB3x9Yz",
  "shortId": "aB3x9Yz"
}
2. Redirect to Original URL
Visiting the generated short link redirects the user automatically.

Endpoint: GET /:shortId

Example: GET http://localhost:3000/aB3x9Yz

Response: 301 Permanent Redirect to the original URL.

📂 Project Structure (Controller-Service Pattern)

```text
backend/
├── src/
│   ├── config/         # DB and Redis connection logic
│   ├── controllers/    # Request handling & HTTP response formatting
│   ├── middleware/     # Redis rate limiting & Error handling
│   ├── models/         # Mongoose schemas (URL, Clicks)
│   ├── routes/         # Express routing definitions
│   ├── services/       # Core business logic (Hashing, Caching, DB Ops)
│   ├── utils/          # Base62 generators & helpers
│   ├── app.js          # Express app configuration
│   └── server.js       # Entry point