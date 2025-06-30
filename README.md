# Simple E-Commerce Frontend

This is the frontend of a simple e-commerce application built with **Next.js**, using fake data from [Fake Store API](https://fakestoreapi.com).

> 💡 Live Demo: [https://bshr-fe.vercel.app/](https://bshr-fe.vercel.app/)

---

## ✨ Tech Stack

- [Next.js](https://nextjs.org/)

- [TypeScript](https://www.typescriptlang.org/)

- [Material UI](https://mui.com/material-ui/getting-started/installation/)

- [Context API](https://react.dev/reference/react/createContext)

- [React Hook Form](https://react-hook-form.com/get-started)

- [Axios](https://axios-http.com/)

---

## 📦 Setup & Development

### 1. Clone the repository

```bash

git  clone  https://github.com/kevinromario/bshr-fe

cd  bshr-fe

```

### 2. Install dependencies

```bash

npm  install

```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env

NEXT_PUBLIC_API_BE=https://fakestoreapi.com

```

### 4. Start development server

```bash

npm  run  dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build

```bash

npm run build

```

Output will be in the `dist/` folder.

---

## 🚀 Deployment

This project is deployed on **Vercel**. On push to the main branch, Vercel automatically builds and deploys the project.

Live URL: [https://bshr-fe.vercel.app/](https://bshr-fe.vercel.app/)

---

## 🧪 Testing

### ✅ Run Unit & Integration Tests

```

npm run test

```
