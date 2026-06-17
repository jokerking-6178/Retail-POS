<div align="center">

# 🛒 Retail POS

### A Full-Stack Point-of-Sale & Inventory Management System

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![AWS S3](https://img.shields.io/badge/AWS_S3-Storage-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-02042B?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Retail POS** is a complete, production-style point-of-sale and inventory management system built for retail businesses. It handles category and item management, cart-based billing, customer details, order history, and dashboard analytics — backed by a secure Spring Boot REST API and a responsive React frontend.

[Features](#-features) · [Tech Stack](#%EF%B8%8F-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [API Reference](#-api-reference) · [Billing Flow](#-billing--order-flow) · [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** — Stateless token-based login via Spring Security
- **Custom `UserDetailsService`** — `AppUserDetailsService` loads users for authentication
- **Password Encoding** — `PasswordEncoder` bean used for both registration and a dedicated `/encode` utility endpoint
- **Admin-Protected Routes** — Category, item, and user management endpoints scoped under `/admin/**`
- **Centralized Error Handling** — Clean `ResponseStatusException` usage across controllers for consistent HTTP error responses

### 📦 Category & Item Management
- **CRUD for Categories** — Create, list, and delete product categories, each with an image
- **CRUD for Items** — Create, list, and delete inventory items, each linked to a category and image
- **Multipart Uploads** — Category/item details sent as JSON alongside an image file in a single multipart request
- **AWS S3 Image Storage** — Category and item images uploaded directly to S3
- **Search & Filter** — Search box and filtering across the item catalog on the storefront

### 🛍️ Cart & Billing
- **Cart Management** — Add, update, and remove items from the active cart (`CartItems`, `CartSummary`)
- **Customer Details Form** — Capture customer information before checkout
- **Receipt Generation** — Auto-generated, printable receipt popup after a successful order (`ReceiptPopup` + dedicated print stylesheet)
- **Order History** — Browse past orders with full line-item detail

### 💳 Payments
- **Razorpay Integration** — Order creation and checkout handled via the Razorpay Java SDK and Checkout.js
- **Server-Side Verification** — Payment signatures verified on the backend before an order is persisted
- **Order Lifecycle** — Orders created only after successful, verified payment

### 📊 Dashboard
- **Daily Sales Summary** — Today's total sales and order count computed server-side
- **Recent Orders Feed** — Latest orders surfaced directly on the dashboard
- **Admin Insights** — Central view for store performance at a glance

### 🖥️ Frontend
- **React 18 + Vite** — Fast dev server with instant HMR
- **Bootstrap UI** — Responsive, component-driven styling across the storefront and admin views
- **Context-Based State** — Global app state managed via `AppContext`
- **Page-Based Routing** — Dedicated pages for Explore, Login, Dashboard, Manage Categories/Items/Users, Order History, and a `NotFound` fallback
- **Service Layer** — Centralized API modules (`AuthService`, `CategoryService`, `ItemService`, `OrderService`, `PaymentService`) on top of a shared Axios config

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3.x |
| Security | Spring Security 6 + JWT |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL 8 |
| Cloud Storage | AWS S3 |
| Payment | Razorpay Java SDK |
| Build | Apache Maven (`mvnw` wrapper included) |
| Testing | JUnit 5 + Spring Boot Test |
| Deployment | Railway (`railway.json`, `nixpacks.toml` included) |

### Frontend
| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Build Tool | Vite |
| Styling | Bootstrap |
| State | React Context API (`AppContext`) |
| HTTP Client | Axios (via `apiConfig.js`) |
| Payment UI | Razorpay Checkout.js |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Notes |
|---|---|---|
| JDK | 17+ | [Temurin](https://adoptium.net/) or [Amazon Corretto](https://aws.amazon.com/corretto/) |
| Maven | 3.9+ | Bundled `mvnw` wrapper included |
| Node.js | 18 LTS+ | Required for the Vite frontend |
| MySQL | 8.x | Local instance or managed (e.g. Railway, PlanetScale) |
| AWS Account | — | S3 bucket + IAM user with S3 permissions |
| Razorpay Account | — | Test mode keys work fine for development |

---

### 1. Clone the Repository

```bash
git clone https://github.com/jokerking-6178/Retail-POS.git
cd Retail-POS
```

---

### 2. Set Up MySQL

```sql
CREATE DATABASE billing_app;
```

> Spring Boot will auto-create all required tables on first startup via `spring.jpa.hibernate.ddl-auto=update`.

---

### 3. Configure the Backend

Navigate to the backend module:

```bash
cd RetailingAndInventoryManager
```

Create or edit `src/main/resources/application-local.properties` (or set the equivalent environment variables):

```properties
# ── Application ───────────────────────────────────────────────────────
spring.application.name=RetailingAndInventoryManager
server.port=${PORT:8080}
server.servlet.context-path=/api/v1.0

# ── Database ──────────────────────────────────────────────────────────
spring.datasource.url=${DATABASE_URL:jdbc:mysql://localhost:3306/billing_app}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update

# ── AWS S3 ────────────────────────────────────────────────────────────
aws.access.key=${AWS_ACCESS_KEY}
aws.secret.key=${AWS_SECRET_KEY}
aws.region=${AWS_REGION:ap-south-1}
aws.bucket.name=${AWS_BUCKET_NAME:retail-inventory-solution}

# ── JWT ───────────────────────────────────────────────────────────────
jwt.secret.key=${JWT_SECRET_KEY}

# ── Razorpay ──────────────────────────────────────────────────────────
razorpay.key.id=${RAZORPAY_KEY_ID}
razorpay.key.secret=${RAZORPAY_KEY_SECRET}

# ── CORS ──────────────────────────────────────────────────────────────
cors.allowed.origins=${CORS_ORIGINS:http://localhost:5173,http://localhost:3000}
```

> **Security tip:** Never commit real credentials. Use environment variables or a local-only properties file excluded via `.gitignore`.

---

### 4. Run the Backend

```bash
# From the RetailingAndInventoryManager directory
./mvnw spring-boot:run

# Or build and run the JAR
./mvnw clean package -DskipTests
java -jar target/RetailingAndInventoryManager-*.jar
```

The API will start on **http://localhost:8080/api/v1.0**

---

### 5. Configure and Run the Frontend

```bash
# Navigate to the frontend project
cd client

# Install dependencies
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1.0
```

```bash
# Start the development server
npm run dev
```

The React SPA will start on **http://localhost:5173**

---

## 📁 Project Structure

```
Retail-POS/
├── RetailingAndInventoryManager/                  # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/backend/part/RetailingAndInventoryManager/
│   │   │   │   ├── config/
│   │   │   │   │   ├── AwsConfig.java              # S3 client bean
│   │   │   │   │   └── SecurityConfig.java         # Filter chain, CORS, JWT
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java         # /login, /encode
│   │   │   │   │   ├── CategoryController.java     # /categories, /admin/categories
│   │   │   │   │   ├── DashboardController.java    # /dashboard
│   │   │   │   │   ├── ItemController.java         # /items, /admin/items
│   │   │   │   │   ├── OrderController.java        # /orders
│   │   │   │   │   ├── PaymentController.java      # /payments/**
│   │   │   │   │   └── UserController.java         # /admin/register, /admin/users
│   │   │   │   ├── entity/
│   │   │   │   │   ├── CategoryEntity.java
│   │   │   │   │   ├── ItemEntity.java
│   │   │   │   │   ├── OrderEntity.java
│   │   │   │   │   ├── OrderItemEntity.java
│   │   │   │   │   └── UserEntity.java
│   │   │   │   ├── filter/
│   │   │   │   │   └── JwtRequestFilter.java       # JWT validation filter
│   │   │   │   ├── io/                             # Request/response DTOs (16 files)
│   │   │   │   ├── repository/
│   │   │   │   │   ├── CategoryRepository.java
│   │   │   │   │   ├── ItemRepository.java
│   │   │   │   │   ├── OrderEntityRepository.java
│   │   │   │   │   ├── OrderItemEntityRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── impl/                       # 7 implementation classes
│   │   │   │   │   │   ├── AppUserDetailsService.java
│   │   │   │   │   │   ├── CategoryServiceImpl.java
│   │   │   │   │   │   ├── FileUploadServiceImpl.java
│   │   │   │   │   │   ├── ItemServiceImpl.java
│   │   │   │   │   │   ├── OrderServiceImpl.java
│   │   │   │   │   │   ├── RazorpayServiceImpl.java
│   │   │   │   │   │   └── UserServiceImpl.java
│   │   │   │   │   └── ...                         # 6 service interfaces
│   │   │   │   ├── util/
│   │   │   │   │   └── JwtUtil.java                # Token generation and validation
│   │   │   │   └── RetailingAndInventoryManagerApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-local.properties
│   │   └── test/
│   │       └── java/backend/part/RetailingAndInventoryManager/
│   │           └── RetailingAndInventoryManagerApplicationTests.java
│   ├── .gitattributes
│   ├── .gitignore
│   ├── HELP.md
│   ├── mvnw / mvnw.cmd
│   ├── nixpacks.toml                               # Railway build config
│   ├── pom.xml
│   └── railway.json                                # Railway deployment config
├── client/                                          # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItems/CartItems.jsx
│   │   │   ├── CartSummary/CartSummary.jsx
│   │   │   ├── Category/Category.jsx
│   │   │   ├── CategoryForm/CategoryForm.jsx
│   │   │   ├── CategoryList/CategoryList.jsx
│   │   │   ├── CustomerForm/CustomerForm.jsx
│   │   │   ├── DisplayCategory/DisplayCategory.jsx
│   │   │   ├── DisplayItems/DisplayItems.jsx
│   │   │   ├── Item/Item.jsx
│   │   │   ├── ItemForm/ItemForm.jsx
│   │   │   ├── ItemList/ItemList.jsx
│   │   │   ├── Menubar/Menubar.jsx
│   │   │   ├── ReceiptPopup/                       # ReceiptPopup.jsx + Print.css
│   │   │   ├── SearchBox/SearchBox.jsx
│   │   │   ├── UserForm/UserForm.jsx
│   │   │   └── UsersList/UsersList.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx                      # Global auth/app state
│   │   ├── pages/
│   │   │   ├── Dashboard/Dashboard.jsx
│   │   │   ├── Explore/Explore.jsx                 # Storefront / browsing page
│   │   │   ├── Login/Login.jsx
│   │   │   ├── ManageCategory/ManageCategory.jsx
│   │   │   ├── ManageItems/ManageItems.jsx
│   │   │   ├── ManageUsers/ManageUsers.jsx
│   │   │   ├── NotFound/NotFound.jsx
│   │   │   └── OrderHistory/OrderHistory.jsx
│   │   └── Service/
│   │       ├── apiConfig.js                        # Axios instance + base config
│   │       ├── AuthService.js
│   │       ├── CategoryService.js
│   │       ├── Dashboard.js
│   │       ├── ItemService.js
│   │       ├── OrderService.js
│   │       └── PaymentService.js
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 📡 API Reference

Base URL: `http://localhost:8080/api/v1.0`

### Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/login` | Public | Authenticate and receive a JWT |
| `POST` | `/encode` | Public | Encode a raw password (utility endpoint) |

### Categories
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/categories` | Public | List all categories |
| `POST` | `/admin/categories` | Admin | Create a category (multipart: JSON + image) |
| `DELETE` | `/admin/categories/{categoryId}` | Admin | Delete a category |

### Items
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/items` | Public | List all items |
| `POST` | `/admin/items` | Admin | Create an item (multipart: JSON + image) |
| `DELETE` | `/admin/items/{itemId}` | Admin | Delete an item |

### Orders
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/orders` | JWT | Create a new order |
| `GET` | `/orders/latest` | JWT | Get the most recent orders |
| `DELETE` | `/orders/{orderId}` | JWT | Delete an order |

### Payments
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/payments/create-order` | JWT | Create a Razorpay order |
| `POST` | `/payments/verify` | JWT | Verify payment signature and finalize the order |

### Dashboard
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/dashboard` | JWT | Today's sales total, order count, and recent orders |

### Users (Admin)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/admin/register` | Admin | Register a new user |
| `GET` | `/admin/users` | Admin | List all users |
| `DELETE` | `/admin/users/{id}` | Admin | Delete a user |

---

### Example Requests

**Login and get JWT**
```bash
curl -X POST http://localhost:8080/api/v1.0/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"securepassword"}'
```

**Create a category (multipart)**
```bash
curl -X POST http://localhost:8080/api/v1.0/admin/categories \
  -H "Authorization: Bearer <your_jwt_token>" \
  -F 'category={"name":"Beverages"};type=application/json' \
  -F "file=@/path/to/category-image.jpg"
```

**Create an order**
```bash
curl -X POST http://localhost:8080/api/v1.0/orders \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"customerName":"John Doe","items":[{"itemId":"1","quantity":2}]}'
```

**Create a Razorpay order**
```bash
curl -X POST http://localhost:8080/api/v1.0/payments/create-order \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":499,"currency":"INR"}'
```

---

## 🔄 Billing & Order Flow

```
Browse Categories & Items (Explore page)
              │
              ▼
        Add to Cart (CartItems)
              │
              ▼
   Cart Summary + Customer Details
        (CartSummary, CustomerForm)
              │
              ▼
   Create Razorpay Order
   (POST /payments/create-order)
              │
              ▼
     Razorpay Checkout (frontend)
              │
              ▼
   Verify Payment Signature
   (POST /payments/verify)
              │
              ▼
   Persist Order + Order Items
            (MySQL)
              │
              ▼
   Generate Receipt (ReceiptPopup)
```

---

## 🧪 Running Tests

```bash
# From the RetailingAndInventoryManager directory
./mvnw test

# Run a specific test class
./mvnw test -Dtest=RetailingAndInventoryManagerApplicationTests
```

---

## 🌐 Environment Variables Reference

For production deployments (e.g. Railway), inject all secrets as environment variables:

| Variable | Description |
|---|---|
| `PORT` | Server port (Railway assigns this automatically) |
| `DATABASE_URL` | MySQL JDBC connection URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `AWS_ACCESS_KEY` | AWS access key ID |
| `AWS_SECRET_KEY` | AWS secret access key |
| `AWS_REGION` | AWS region (e.g. `ap-south-1`) |
| `AWS_BUCKET_NAME` | S3 bucket name |
| `JWT_SECRET_KEY` | JWT signing secret |
| `RAZORPAY_KEY_ID` | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret |
| `CORS_ORIGINS` | Comma-separated list of allowed frontend origins |

---

## 🔒 Security

- ✅ **JWT-based authentication** via a custom `JwtRequestFilter` and `JwtUtil`
- ✅ **Admin-protected endpoints** — category, item, and user management scoped under `/admin/**`
- ✅ **Server-side payment verification** — Razorpay signature checked before any order is finalized
- ✅ **Parameterized JPA queries** — no raw SQL, no SQL injection surface
- ✅ **CORS whitelist** — only configured origins accepted

To report a security vulnerability, please open a private GitHub Security Advisory rather than a public issue.

---

## 🚧 Known Limitations

- No real-time stock updates across concurrent sessions (no WebSocket layer)
- Single-currency support (INR, via Razorpay)
- No barcode scanner integration
- No PDF export for receipts — print-only via browser print dialog
- No native mobile app (web-only SPA)

---

## 🗺️ Roadmap

- [ ] Low-stock alerts and inventory thresholds
- [ ] Barcode scanning support for faster checkout
- [ ] PDF receipt generation and email delivery
- [ ] Multi-store / multi-branch support
- [ ] Role-based dashboards (cashier vs. admin views)
- [ ] WebSocket-based real-time inventory sync
- [ ] Docker Compose setup for one-command local deployment

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a feature branch** — `git checkout -b feature/your-feature-name`
3. **Make your changes** and write tests for new functionality
4. **Run the test suite** — `./mvnw test`
5. **Commit your changes** — `git commit -m 'feat: add your feature'`
6. **Push to your fork** — `git push origin feature/your-feature-name`
7. **Open a Pull Request** against `main`

Please follow the existing code style (Java: standard Spring Boot conventions; React: functional components with hooks).

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shubham Garg**
- GitHub: [@jokerking-6178](https://github.com/jokerking-6178)
- Project: [Retail-POS](https://github.com/jokerking-6178/Retail-POS)

---

<div align="center">

Built with ❤️ using Spring Boot, React, and Razorpay

⭐ Star this repo if you found it useful!

</div>
