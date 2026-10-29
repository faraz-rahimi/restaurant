# 🍽️ Foodino — Modern Multi-Language Restaurant Web Application

🌐 **Live Website:** [https://foodino.onrender.com](https://foodino.onrender.com)

**Foodino** is a modern, responsive, and bilingual (English & Persian) single-page restaurant web application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Designed and developed by [**Faraz Rahimi**](https://github.com/faraz-rahimi), Foodino delivers an interactive online food ordering experience featuring a custom animated intro screen, dynamic menu browsing, real-time shopping cart synchronization with a remote REST API, order history tracking, 3D graphics readiness, and automatic RTL/LTR layout switching.

## ✨ Complete Features & Capabilities

1. **Bilingual Internationalization (i18n) & Automatic RTL/LTR Switching:**
   * Powered by `i18next` and `react-i18next` with complete translation dictionaries in `src/I18n/Locales/en.json` (English) and `src/I18n/Locales/fa.json` (Persian/Farsi).
   * Dynamically switches document direction (`dir="rtl"` for Persian and `dir="ltr"` for English) and persists the user's selected language in browser storage via the custom `useLocalStorage` hook.

2. **Interactive Landing Page & Cloche Intro Animation:**
   * Greets visitors with a signature animated restaurant cloche/bell splash screen upon initial application load in [src/App.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/App.tsx).
   * Features a high-impact Hero section ([src/Components/Hero.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Components/Hero.tsx)) with a direct call-to-action button leading to the full menu.
   * Includes a horizontally scrollable **"Best foods of the week"** carousel on the Home page ([src/Pages/Home.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Pages/Home.tsx)) with smooth left/right directional navigation controls, alongside dedicated **About** (`About.tsx`), **Contact Us** (`Contact.tsx`), and **Footer** (`Footer.tsx`) sections.

3. **Dynamic Menu Catalog & Localized Food Cards:**
   * Fetches food items asynchronously from the remote `/Products` API endpoint inside [src/Pages/Menu.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Pages/Menu.tsx).
   * Renders optimized `.webp` food photography (`public/Assets/`), localized dish titles and descriptions, price badges, and one-click **"Add to Cart"** actions inside reusable [src/Components/FoodCard.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Components/FoodCard.tsx) components.

4. **Cloud-Synced Shopping Cart Management:**
   * Supports adding dishes, incrementing/decrementing item quantities, removing items, and calculating live subtotals and grand totals in [src/Pages/Cart.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Pages/Cart.tsx).
   * Synchronizes every cart modification directly with the logged-in user's remote record (`user.cart` in `/Users`) via `axios` requests.

5. **Order Checkout & Order History Tracking:**
   * Allows authenticated users to submit their active shopping cart as a new order record in `/Orders`, linked to their `userId`.
   * Automatically clears the user's active cart after checkout, triggers real-time toast notifications using `react-hot-toast`, and displays a complete list of previous orders on the Cart page.

6. **User Registration & Sign-In Flow:**
   * Provides dedicated [Login.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Pages/Profile/Login.tsx) and [SignUp.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Pages/Profile/SignUp.tsx) pages with client-side validation (minimum 5 characters for usernames, minimum 8 characters for passwords, password confirmation matching, and duplicate username checks).
   * Persists active user sessions in `localStorage` (`userId`) and dynamically updates the header navigation icon (`LoginIcon.tsx`).

7. **Responsive Mobile-First Design:**
   * Detects viewport breakpoints dynamically via the custom `useIsMobile.ts` hook, smoothly transitioning between the full desktop navigation bar and a collapsible mobile hamburger drawer (`hamburger-react`).

## 🛠️ Tech Stack & Libraries

Based on [package.json](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/package.json), the project is built with the following technologies and dependencies:

| Category | Technology / Package | Version | Role in Project |
| :--- | :--- | :--- | :--- |
| **Core Framework** | `react` / `react-dom` | `^19.2.8` | Component-based UI architecture and rendering |
| **Language** | `typescript` | `~5.8.3` | Static type checking and developer tooling |
| **Build Tool & Bundler** | `vite` | `^6.3.5` | Fast HMR development server and production bundler |
| **Styling** | `tailwindcss` / `@tailwindcss/vite` | `^4.3.3` | Utility-first responsive styling and RTL/LTR layout utilities |
| **Routing** | `react-router-dom` | `^7.18.4` | Client-side SPA routing (`/`, `/menu`, `/cart`, `/login`, `/signup`) |
| **State Management** | `zustand` | `^5.0.15` | Lightweight global state management |
| **HTTP Client** | `axios` | `^1.20.0` | REST API communication with Cloudflare Workers backend |
| **Internationalization** | `i18next` / `react-i18next` | `^26.4.2` / `^17.0.15` | Bilingual localization (English & Persian) |
| **3D Graphics** | `three` / `@react-three/fiber` / `@react-three/drei` | `^0.186.0` / `^9.8.0` / `^10.7.8` | WebGL and 3D scene rendering in React |
| **Notifications & Icons** | `react-hot-toast` / `lucide-react` / `react-icons` | `^2.6.1` / `^1.47.0` / `^5.7.0` | Toast alerts and vector iconography |
| **Mobile Navigation** | `hamburger-react` | `^2.5.2` | Animated mobile menu toggle button |

## 🔓 API Architecture, Login & Sign-Up Flow (Not Secure)

The application communicates with a REST API hosted on **Cloudflare Workers** at `https://restaurunt-api.fwebstack.workers.dev` (modeled after `json-server`), organized into three Axios client modules under `src/API/`:

| API Module | Source File | Base Endpoint | Responsibility |
| :--- | :--- | :--- | :--- |
| **Users API** | [src/API/users.ts](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/API/users.ts) | `https://restaurunt-api.fwebstack.workers.dev/Users` | Retrieve user accounts, register new users, and update user `cart` arrays |
| **Products API** | [src/API/products.ts](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/API/products.ts) | `https://restaurunt-api.fwebstack.workers.dev/Products` | Fetch food catalog items, prices, descriptions, and image paths |
| **Orders API** | [src/API/orders.ts](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/API/orders.ts) | `https://restaurunt-api.fwebstack.workers.dev/Orders` | Submit completed orders and fetch historical orders by `userId` |

### 1. How Sign-In / Login Works ([src/Pages/Profile/Login.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Pages/Profile/Login.tsx))

When a user submits the login form:
1. The frontend sends a `GET /Users` request via `api.get("/")`, downloading the **entire array of registered users** (including their passwords) to the browser.
2. Credential verification is performed on the client side using `Array.prototype.find`:
   ```typescript
   const ValidUser = allUsers.find(
     (u) => u.username === username && u.password === password
   );
   ```
3. If a matching user object is found, the application stores the user's ID in `localStorage` (`localStorage.setItem("userId", ValidUser.id)`) and redirects to the Home page (`/`).

### 2. How Sign-Up / Registration Works ([src/Pages/Profile/SignUp.tsx](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/src/Pages/Profile/SignUp.tsx))

When a new user registers an account:
1. The client validates that `username.length >= 5`, `password.length >= 8`, and `password === confirmPassword`.
2. It fetches all existing users via `GET /Users` (`api.get("/")`) to check whether the chosen `username` is already taken.
3. If the username is unique, it sends a `POST /Users` request containing the user's raw credentials:
   ```json
   {
     "id": "1730160000000",
     "username": "example_user",
     "password": "plain_text_password",
     "cart": []
   }
   ```

### ⚠️ Why This Authentication Implementation Is Not Secure

This authentication flow is built strictly for **educational, portfolio, and frontend prototyping purposes** and is **not secure** for production environments due to the following vulnerabilities:

* **Full User Database Exposure on the Client:** Every login or registration attempt calls `GET /Users`, exposing the usernames, passwords, and cart contents of all registered users in the browser's Network inspector.
* **Plaintext Password Storage & Transmission:** Passwords are stored in the database and transmitted in plain text without any cryptographic hashing or salting (such as `bcrypt`, `scrypt`, or `Argon2`).
* **Unverified `localStorage` Session State (No JWT / Cookies):** User sessions rely solely on an unsigned `userId` string saved in `localStorage`. Because the backend does not issue or verify signed tokens (JWT) or `HttpOnly` session cookies, anyone can modify `localStorage.getItem("userId")` in browser DevTools to impersonate another user and access their cart or order history.
* **Unprotected Public CRUD Endpoints:** The `/Users` and `/Orders` endpoints lack server-side authentication middleware or access control, allowing arbitrary read/write operations from any HTTP client.

> **Security Notice:** Do not use real or sensitive passwords when testing the live application at [foodino.onrender.com](https://foodino.onrender.com).

## 📂 Project Architecture & Directory Structure

```text
restaurant/
├── public/
│   ├── Assets/                 # Optimized .webp food & hero images
│   └── sitemap.xml             # Site map for SEO indexing
├── src/
│   ├── API/                    # Axios instances for REST API endpoints
│   │   ├── orders.ts           # /Orders endpoint client
│   │   ├── products.ts         # /Products endpoint client
│   │   └── users.ts            # /Users endpoint client
│   ├── Components/             # Reusable UI components
│   │   ├── About.tsx           # About Foodino section
│   │   ├── Contact.tsx         # Contact cards section
│   │   ├── FoodCard.tsx        # Dish card with price badge & Add-to-Cart button
│   │   ├── Footer.tsx          # Site-wide footer
│   │   ├── Header.tsx          # Responsive navbar, language switcher & links
│   │   ├── Hero.tsx            # Landing page Hero banner
│   │   ├── LoginIcon.tsx       # User profile / auth status indicator
│   │   └── Logo.tsx            # Brand cloche logo component
│   ├── Hooks/                  # Custom React hooks
│   │   ├── useIsMobile.ts      # Responsive viewport breakpoint detection hook
│   │   └── useLocalStorage.ts  # Persistent localStorage state hook
│   ├── I18n/                   # Internationalization setup
│   │   ├── Locales/
│   │   │   ├── en.json         # English translation dictionary
│   │   │   └── fa.json         # Persian (Farsi) translation dictionary
│   │   └── I18n.ts             # i18next initialization & configuration
│   ├── Pages/                  # Route-level page views
│   │   ├── Profile/
│   │   │   ├── Login.tsx       # User sign-in page
│   │   │   └── SignUp.tsx      # User registration page
│   │   ├── Cart.tsx            # Shopping cart & order history page
│   │   ├── Home.tsx            # Landing page with popular foods carousel
│   │   └── Menu.tsx            # Full restaurant menu catalog
│   ├── App.css                 # Global styles
│   ├── App.tsx                 # Main router, layout wrapper & intro animation
│   └── main.tsx                # React 19 DOM entry point
├── eslint.config.ts            # ESLint configuration
├── index.html                  # HTML entry template
├── package.json                # Project dependencies and scripts
└── vite.config.ts              # Vite + Tailwind CSS v4 configuration
```

## ⚙️ Installation & Local Development

Follow these steps to clone and run **Foodino** on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/faraz-rahimi/restaurant.git

# 2. Navigate into the project directory
cd restaurant

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev
```

### Available NPM Scripts ([package.json](https://www.google.com/search?q=https://github.com/faraz-rahimi/restaurant/blob/main/package.json))
* `npm run dev` — Launches the Vite development server with Hot Module Replacement (HMR).
* `npm run build` — Bundles and optimizes the application for production deployment.
* `npm run lint` — Runs ESLint across all TypeScript and React source files.
* `npm run preview` — Serves the production build locally for verification.

## 👨‍💻 Author

**Faraz Rahimi**
* **GitHub Profile:** [@faraz-rahimi](https://github.com/faraz-rahimi)
* **GitHub Repository:** [github.com/faraz-rahimi/restaurant](https://github.com/faraz-rahimi/restaurant)
* **Live Website:** [foodino.onrender.com](https://foodino.onrender.com)
