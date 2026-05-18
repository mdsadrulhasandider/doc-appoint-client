# 🩺 DocAppoint — Premium Doctor Appointment & Healthcare Manager

Welcome to **DocAppoint**, a premium, state-of-the-art full-stack Doctor Appointment Management web application. Built with high-end modern visual aesthetics, smooth micro-animations, and database integration, DocAppoint bridges the gap between patients and specialized healthcare practitioners.

🔗 **Client GitHub Repo:** [https://github.com/mdsadrulhasandider/doc-appoint-client](https://github.com/mdsadrulhasandider/doc-appoint-client)  
🔗 **Server GitHub Repo:** [https://github.com/mdsadrulhasandider/doc-appoint-server](https://github.com/mdsadrulhasandider/doc-appoint-server)  
🌐 **Live Website Link:** `[YOUR_VERCEL_LIVE_SITE_URL_HERE]` *(e.g., https://docappoint-client.vercel.app)*

---

## 🌟 Core Features & Highlights

- **🩺 Dynamic Specialties & Advanced Filtering:** Explore multiple certified medical categories (Cardiology, Neurology, Pediatrics, Orthopedic, Gynecology, Dermatology) with real-time text-based search queries and ascending/descending sorting based on doctor consultation fees.
- **🔒 Highly Secure Full-Stack Authentication:** Implements a custom robust registration and login system. Features **cryptographic password hashing** via `bcryptjs` on the server and secure, persistent user sessions using **JSON Web Tokens (JWT)** delivered through secure, cross-origin cookies.
- **📅 Real-Time Interactive Appointment Booking:** Instant visual doctor availability schedules with a sleek, interactive Booking Modal. Logged-in patients can book specific slots, manage existing checkups, update patient detail records, or cancel bookings in real-time.
- **📊 Personalized User Dashboard (Private Routes):** Highly premium and responsive dashboard allowing users to track active consultations under "My Bookings" with immediate status tracking (Pending/Approved) and manage profile information securely.
- **⭐ Interactive Reviews & Doctor Ratings:** Users can leave custom, persistent doctor reviews and star ratings directly from the Doctor Details page, empowering patients with honest community feedback.
- **✨ Premium Responsive UI/UX Aesthetics:** Designed with custom rich HSL colors, sophisticated dark/light card variations, glassmorphism, responsive grid layouts for all devices (mobile, tablet, desktop), and smooth carousel hero banners using `Swiper.js`.

---

## 🛠️ Technology Stack Used

### **Frontend (Client Side):**
*   **Vite + React.js** (Ultra-fast, modular SPA structure)
*   **Tailwind CSS + DaisyUI** (Sophisticated, premium glassmorphism & components)
*   **React Router DOM** (Single Page Application routing with Secure Private Routes)
*   **Axios** (Configured with dynamic global `baseURL` support for seamless local & live deployment)
*   **Swiper.js** (Elegant, swipe-friendly responsive banner slider)
*   **React Icons** (Modern, consistent visual iconography)
*   **React Hot Toast** (Polished, non-blocking toast notifications)

### **Backend (Server Side):**
*   **Node.js & Express.js** (Fast, unopinionated RESTful API backend)
*   **MongoDB & Mongoose** (Robust object data modeling for cloud database integration)
*   **jsonwebtoken (JWT)** (Secure token generation and verification)
*   **cookie-parser** (Handling secure HttpOnly session cookies)
*   **bcryptjs** (Advanced cryptographic password hashing)
*   **CORS** (Dynamic, host-adaptive Cross-Origin Resource Sharing)

---

## 🚀 Easy Local Setup & Installation

Follow these steps to run DocAppoint locally in under 2 minutes:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mdsadrulhasandider/doc-appoint-client.git
   cd doc-appoint-client
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variable:**
   Create a `.env` file in the root of the client directory and add your backend API URL (optional, defaults to `http://localhost:5000`):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```
