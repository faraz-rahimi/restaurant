# 🍽️ Foodino — Modern Bilingual Restaurant Web Application

**Foodino** is a modern, responsive, and fully bilingual (**English** & **Persian / فارسی**) restaurant web application built with **React 19**, **TypeScript**, **Vite 8**, and **Tailwind CSS v4**. It provides an interactive dining experience complete with a custom SVG cloche-lid splash animation, dynamic `LTR`/`RTL` layout switching, an interactive food menu, shopping cart and order management, and user authentication powered by a local REST API (`json-server`).

## ✨ Key Features

* **Animated Cloche Intro Splash Screen**: Welcomes first-time visitors with a smooth SVG restaurant cloche-lid reveal animation (`Foodino` branding) and stores playback state in `sessionStorage` so returning navigation remains instant.

* **Full Bilingual Support (English & Persian)**: Powered by `i18next` and `react-i18next`, allowing real-time toggling between English (`en`) and Persian (`fa`) with preference persistence in `localStorage` and automatic document direction switching (`LTR` ↔ `RTL`).

* **Localized Product Catalog**: Dishes in the database include localized names, descriptions, and formatted pricing in both English and Persian, paired with optimized `.webp` food photography.

* **Interactive Shopping Cart & Checkout**: Users can add dishes to their cart, increment or decrement quantities, review automated subtotal, tax, and discount calculations, and submit orders directly to the backend API.

* **Order History Tracking**: Displays previously submitted orders with creation timestamps (`createdAt`), order status badges, itemized breakdowns, and total costs.

* **User Authentication Flow**: Dedicated **Login** (`/login`) and **Sign Up** (`/signUp`) pages integrated with the `/Users` API endpoint and persistent client storage.

* **Responsive Mobile-First UI**: Adapts across desktop, tablet, and mobile viewports using a custom `useIsMobile` hook, animated hamburger navigation (`hamburger-react`), and smooth section scrolling (`Hero`, `About`, `Contact`).

## 🛠️ Tech Stack

| Category | Technologies & Libraries | 
| ----- | ----- | 
| **Core & Languages** | [React 19](https://www.google.com/search?q=https%3A%2F%2Freact.dev%2F), TypeScript (`.ts`, `.tsx`), JavaScript (ES Modules), HTML5, CSS3 | 
| **Build Tool & Compiler** | [Vite 8](https://www.google.com/search?q=https%3A%2F%2Fvite.dev%2F), `@vitejs/plugin-react`, `@rolldown/plugin-babel`, `babel-plugin-react-compiler` | 
| **Styling** | [Tailwind CSS v4](https://www.google.com/search?q=https%3A%2F%2Ftailwindcss.com%2F) (`@tailwindcss/vite`) | 
| **Routing** | [React Router DOM v7](https://www.google.com/search?q=https%3A%2F%2Freactrouter.com%2F) (`react-router-dom`) | 
| **State Management & Hooks** | [Zustand v5](https://www.google.com/search?q=https%3A%2F%2Fzustand-demo.pmnd.rs%2F), Custom Hooks (`useLocalStorage`, `useIsMobile`) | 
| **Internationalization (i18n)** | [i18next](https://www.google.com/search?q=https%3A%2F%2Fwww.i18next.com%2F), `react-i18next` (English & Persian with dynamic `LTR`/`RTL`) | 
| **3D & Canvas Utilities** | [Three.js](https://www.google.com/search?q=https%3A%2F%2Fthreejs.org%2F), `@react-three/fiber`, `@react-three/drei` | 
| **HTTP Client & Mock API** | [Axios](https://www.google.com/search?q=https%3A%2F%2Faxios-http.com%2F), [JSON Server](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Ftypicode%2Fjson-server) (`src/Data/db.json`) | 
| **Icons & UI Components** | [Lucide React](https://www.google.com/search?q=https%3A%2F%2Flucide.dev%2F), [React Icons](https://www.google.com/search?q=https%3A%2F%2Freact-icons.github.io%2Freact-icons%2F), `hamburger-react` | 
| **Linting & Code Quality** | [ESLint 10](https://www.google.com/search?q=https%3A%2F%2Feslint.org%2F), `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` | 

## 📂 Project Structure

```
restaurant/
├── public/
│   └── Assets/                  # Optimized .webp food & hero images
│       ├── Hero.webp
│       ├── Salad.webp
│       ├── burgur.webp
│       ├── cheeseburger.webp
│       ├── chickenSandwich.webp
│       ├── drink.webp
│       ├── fries.webp
│       ├── mrgherity.webp
│       └── peperony.webp
├── src/
│   ├── API/                     # Axios API client modules (localhost:3000)
│   │   ├── orders.ts
│   │   ├── products.ts
│   │   └── users.ts
│   ├── Components/              # Reusable UI & layout components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── FoodCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── LoginIcon.tsx
│   │   └── Logo.tsx
│   ├── Data/
│   │   └── db.json              # Mock database (Users, Products, Orders)
│   ├── Hooks/                   # Custom React hooks
│   │   ├── useIsMobile.ts
│   │   └── useLocalStorage.ts
│   ├── I18n/                    # Bilingual configuration & translation JSONs
│   │   ├── Locales/
│   │   │   ├── en.json
│   │   │   └── fa.json
│   │   └── I18n.js
│   ├── Pages/                   # Application route pages
│   │   ├── Profile/
│   │   │   ├── Login.tsx
│   │   │   └── SignUp.tsx
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   └── Menu.tsx
│   ├── App.tsx                  # Root component, splash screen & route definitions
│   ├── Style.css                # Global styles & Tailwind imports
│   └── main.tsx                 # React DOM entry point
├── eslint.config.js             # ESLint v10 configuration
├── index.html                   # HTML entry template
├── package.json                 # Dependencies and scripts
└── vite.config.js               # Vite, React Compiler & Tailwind v4 config

```

## 🚀 Getting Started (Run Locally)

Follow these steps to set up and run **Foodino** on your local machine.

### 1. Prerequisites

Make sure you have the following installed on your system:

* **Node.js** (v18.0.0 or higher recommended)

* **npm** (comes bundled with Node.js)

* **Git**

### 2. Clone the Repository

```
git clone https://github.com/faraz-rahimi/restaurant.git
cd restaurant

```

### 3. Install Dependencies

```
npm install

```

### 4. Start the Mock Backend Server (`json-server`)

The application uses **Axios** (`src/API/*.ts`) to communicate with a local REST API running on **`http://localhost:3000`**. Start `json-server` watching `src/Data/db.json` in your first terminal window:

```
npx json-server --watch src/Data/db.json --port 3000

```

Once started, the following endpoints will be available:

* `http://localhost:3000/Products` — Bilingual food menu items

* `http://localhost:3000/Users` — User accounts and active cart data

* `http://localhost:3000/Orders` — Submitted customer orders

### 5. Start the Frontend Development Server (Vite)

Open a **second terminal window** in the project root directory and launch the Vite development server:

```
npm run dev

```

### 6. Open in Browser

Navigate to the local URL shown in your terminal (typically **`http://localhost:5173`**) to explore the application.

## 📜 Available Scripts

| Command | Description | 
| ----- | ----- | 
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). | 
| `npm run build` | Bundles the application into optimized static assets in the `dist/` directory. | 
| `npm run preview` | Locally previews the production build generated in `dist/`. | 
| `npm run lint` | Runs ESLint across the codebase to catch syntax and hook issues. | 

## 🔌 API Endpoints Overview

| Resource | Endpoint | Methods | Description | 
| ----- | ----- | ----- | ----- | 
| **Products** | `http://localhost:3000/Products` | `GET` | Fetches the bilingual restaurant menu items, images, descriptions, and prices. | 
| **Users** | `http://localhost:3000/Users` | `GET`, `POST`, `PATCH` | Manages user registration, login authentication, and user cart state. | 
| **Orders** | `http://localhost:3000/Orders` | `GET`, `POST` | Retrieves historical orders and records newly checked-out orders. | 

## 👤 Author

**Faraz Rahimi**

* **GitHub**: [@faraz-rahimi](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Ffaraz-rahimi)

* **Repository**: [github.com/faraz-rahimi/restaurant](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Ffaraz-rahimi%2Frestaurant)

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=https%3A%2F%2Fopensource.org%2Flicenses%2FMIT).
