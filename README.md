1. Project Title
FPV Haven – A Complete FPV Drone Marketplace and Learning Platform
2. Problem Statement
Building and flying FPV (First Person View) drones can be challenging for beginners due to
scattered information, lack of guidance, and limited access to reliable components.
“FPV Haven” aims to provide a one-stop platform where users can buy quality FPV
products, learn to build drones from scratch, and connect with the FPV community for
tutorials and guides.
3. System Architecture
Architecture: Frontend → Backend (API) → Database
Layer Technology / Platform
Frontend React.js with React Router for page navigation
Backend Node.js + Express.js
Database MySql
Authentication JWT-based login/signup
Hosting Frontend: Vercel • Backend: Render • Database: PostgreSQL
5. Key Features
Category Features
Authentication &
Authorization
CRUD Operations Frontend Routing User registration, login, logout, role-based access
(admin/user)
Pages: Home, Login, Products, Tutorials, Cart,
Dashboard, Profile
Pagination Searching Sorting Filtering Hosting Paginate through products and tutorials for smooth
navigation
Search for FPV products, parts, or guides using keywords
Sort products by price, rating, or category
Filter products based on brand, type, or availability
Deploy both backend and frontend to accessible URLs
6. Tech Stack
Layer Technologies
Frontend React.js, React Router, CSS
Backend Node.js, Express.js
Database PostgreSQL
Authentication JWT
Hosting Vercel, Render
7. API Overview
Endpoint Method Description Access
/api/auth/signup POST Register new user Public
/api/auth/login POST Authenticate user Public
/api/tutorials GET Fetch FPV tutorials and
guides
Authenticated
Backend Includes
●
Authentication & Authorization
●
●
●
CRUD Operations
Filtering, Searching, Sorting, Pagination
Hosting (Render / Railway)
Database
Postgresql
Frontend
●
●
●
Routing for multiple pages
Dynamic fetching of data across components
Hosted on Vercel / Netlify
