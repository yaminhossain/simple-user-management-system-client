# Simple User Management System

## Description

A simple but powerful user management application built with the MERN stack. Users can be added, viewed, updated, and deleted. The frontend reflects changes instantly without page reloads, and all UI components are custom-built from scratch.

## Useful Links

### Client Side
**Hosted with Vercel:** [Client Side](https://simple-user-management-system-client.vercel.app/)

### Server Side
**Hosted with Vercel:** [Server Side](https://simple-user-management-system-server-three.vercel.app/)

**GitHub:** [Server Side Repository](https://github.com/yaminhossain/simple-user-management-system-server)

## Features

- 🔄 Full CRUD operations for users
- 🌐 RESTful APIs built with Express.js
- ⚛️ Instant UI updates without page reloads
- 🧰 Custom-built modal component without UI libraries
- 📦 MongoDB for data storage
- 💅 Tailwind CSS for styling

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Communication:** Axios
- **State Management:** React useState and useEffect
- **Deployment:** Vercel (frontend and backend)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

**1. Clone the repositories:**

```bash
git clone https://github.com/yaminhossain/simple-user-management-system-client.git
git clone https://github.com/yaminhossain/simple-user-management-system-server.git
```

**2. Set up the backend:**

```bash
cd simple-user-management-system-server
npm install
```

Configure the MongoDB connection string in your backend environment variables, then start the server using the appropriate script in `package.json`.

**3. Set up the frontend:**

```bash
cd simple-user-management-system-client
npm install
npm run dev
```

**4. Open the application:**

Visit the local development URL displayed in your terminal.

## Why These Technologies?

- **React.js:** For building reusable UI components and managing interactive state.
- **Node.js & Express.js:** For building the backend and RESTful APIs.
- **MongoDB:** For flexible storage and management of user information.
- **Axios:** For communicating with the backend APIs.
- **Tailwind CSS:** For quickly building a responsive interface without relying on external UI component libraries.

## Challenges Faced & Solutions

- **Managing CRUD operations:** Implemented RESTful APIs with Express.js to handle user creation, retrieval, updates, and deletion.
- **Keeping the UI synchronized:** Used React state management to reflect changes immediately without requiring page reloads.
- **Building custom UI components:** Created reusable modal components from scratch instead of depending on external UI libraries.

## Problems Solved

- Simplifies user management through a single interface.
- Eliminates manual data handling by providing complete CRUD functionality.
- Provides a responsive user experience with instant UI updates.
- Demonstrates how a React frontend communicates with a Node.js backend and MongoDB database.

---

**Live Demo:** [Simple User Management System](https://simple-user-management-system-client.vercel.app/)
