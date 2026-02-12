# Premium Hair Wigs & Extensions - E-commerce Platform

A complete, production-ready full-stack e-commerce platform for Premium Hair Wigs & Extensions business, separated into three deployable components.

## 🏗️ Repository Structure

This monorepo contains three separate applications that work together:

```
ecommerce/
│
├── frontend-ecommerce/      # Customer-facing storefront
│   ├── index.html          # Main storefront page
│   ├── styles.css          # Storefront styles
│   ├── assets/             # Images and static files
│   └── js/                 # Frontend JavaScript
│       ├── config.js       # API configuration
│       ├── api.js          # API service layer
│       └── app.js          # Main application logic
│
├── backend-ecommerce/       # Backend API Server
│   ├── server.js           # Express server entry point
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   ├── controllers/        # API controllers
│   ├── middleware/         # Auth, validation, rate limiting
│   ├── routes/             # API routes
│   └── db/                 # Database connection and schema
│
├── admin-ecommerce/         # Admin Dashboard
│   ├── server.js           # Admin server (serves static files)
│   ├── package.json        # Admin dependencies
│   ├── index.html          # Admin dashboard
│   ├── login.html          # Admin login page
│   ├── css/                # Admin styles
│   └── js/                 # Admin JavaScript
│       ├── config.js       # Admin API configuration
│       ├── login.js        # Login logic
│       └── admin.js        # Dashboard logic
│
└── DEPLOYMENT_GUIDE.md      # Complete deployment instructions
```

## 🚀 Quick Start

### Option 1: Deploy Separately (Recommended for Production)

Each component is designed to be deployed independently:

1. **Frontend** → GitHub Pages (or any static hosting)
2. **Backend** → Render, Heroku, or any Node.js hosting
3. **Admin** → Render, Heroku, or any Node.js hosting
4. **Database** → Render PostgreSQL, AWS RDS, or any PostgreSQL hosting

📖 **See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete deployment instructions.**

### Option 2: Run Locally for Development

#### 1. Start Backend + Database

```bash
cd backend-ecommerce

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Initialize database (PostgreSQL must be running)
npm run init-db

# Start backend server
npm run dev
# Backend runs on http://localhost:3000
```

#### 2. Start Admin Dashboard

```bash
cd admin-ecommerce

# Install dependencies
npm install

# Start admin server
npm start
# Admin runs on http://localhost:3001 (or next available port)

# Open browser
# Visit: http://localhost:3001/login.html
```

#### 3. Start Frontend

```bash
cd frontend-ecommerce

# Option 1: Python 3
python -m http.server 8000

# Option 2: Node.js http-server
npx http-server

# Option 3: VS Code Live Server
# Right-click index.html → "Open with Live Server"

# Open browser
# Visit: http://localhost:8000
```

## 🌐 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     FRONTEND                                 │
│              (GitHub Pages / Static Host)                    │
│          Customer-facing E-commerce Storefront               │
│                                                              │
│  - Product Catalog          - Shopping Cart                  │
│  - User Authentication      - Wishlist                       │
│  - Order Tracking           - Checkout                       │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   │ Fetch API (REST)
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                   BACKEND API                                │
│                 (Render / Node.js Host)                      │
│              Express.js + PostgreSQL                         │
│                                                              │
│  REST API Endpoints:                                         │
│  - /api/products           - Product management             │
│  - /api/orders             - Order processing               │
│  - /api/auth               - Authentication                 │
│  - /api/customers          - Customer management            │
│  - /api/payments           - Payment processing             │
│  - /api/admin/*            - Admin operations               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         PostgreSQL Database                         │    │
│  │     (Render PostgreSQL / Cloud Database)           │    │
│  │  - Products  - Orders   - Customers                │    │
│  │  - Payments  - Logs     - Admin Users              │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────┬───────────────────────────────────────────┘
                   ▲
                   │ Fetch API (REST)
                   │
┌──────────────────┴───────────────────────────────────────────┐
│                 ADMIN DASHBOARD                              │
│                 (Render / Node.js Host)                      │
│           Secure Admin Management Interface                  │
│                                                              │
│  - Dashboard Overview       - Order Management              │
│  - Product Management       - Customer Management           │
│  - Payment Tracking         - Reports & Analytics           │
│  - Security Logs            - Compliance Tools              │
└──────────────────────────────────────────────────────────────┘
```

## ✨ Features

### 🛒 Frontend (Customer Storefront)
- Product catalog with search and filters
- Shopping cart with real-time updates
- User authentication and profiles
- Wishlist functionality
- Secure checkout process
- Order tracking
- Responsive design for all devices
- Newsletter subscription
- Contact form

### 🔐 Admin Dashboard
- **10 Management Panels**:
  1. Overview Dashboard - Real-time metrics
  2. Orders Management - Process and track orders
  3. Payments - Track payments and refunds
  4. Customers - Manage customer data (POPIA compliant)
  5. Products & Inventory - Product catalog management
  6. Discounts & Promotions - Create discount codes
  7. Returns & Refunds - Handle returns (CPA compliant)
  8. Reports & Analytics - Sales and performance reports
  9. Compliance & Legal - VAT records, POPIA controls
  10. Security & Logs - Activity logs and security events

- **Security Features**:
  - JWT token authentication
  - Bcrypt password hashing
  - Rate limiting and brute-force protection
  - Session management
  - Activity logging
  - Security event tracking

### ⚙️ Backend API
- RESTful API with 30+ endpoints
- PostgreSQL database with 20+ tables
- JWT authentication system
- Input validation and sanitization
- SQL injection prevention
- Rate limiting
- CORS configuration
- Comprehensive error handling
- Activity and security logging

## 🔧 Configuration

### Frontend Configuration

Edit `frontend-ecommerce/js/config.js`:

```javascript
const getBackendUrl = () => {
    // For local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }
    
    // For production - UPDATE THIS!
    return 'https://your-backend-url.onrender.com';
};
```

### Admin Configuration

Edit `admin-ecommerce/js/config.js`:

```javascript
const ADMIN_CONFIG = {
    // UPDATE THIS with your backend URL!
    API_BASE_URL: window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://your-backend-url.onrender.com',
    // ... rest of config
};
```

### Backend Configuration

Copy `backend-ecommerce/.env.example` to `backend-ecommerce/.env`:

```env
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@host:5432/database
# or configure individually:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=premium_hair_ecommerce
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secure_random_jwt_secret_32_chars_min
JWT_EXPIRES_IN=24h

# Admin Account
ADMIN_EMAIL=admin@premiumhairsa.co.za
ADMIN_PASSWORD=ChangeThisPassword123!

# CORS
FRONTEND_URL=https://username.github.io/ecommerce-frontend
ADMIN_URL=https://admin-dashboard.onrender.com

# Business
VAT_RATE=0.15
```

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "pg": "^8.11.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "express-rate-limit": "^7.1.5",
  "helmet": "^7.1.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1",
  "morgan": "^1.10.0"
}
```

### Admin Dependencies
```json
{
  "express": "^4.18.2"
}
```

### Frontend
No build dependencies - pure HTML/CSS/JavaScript

## 🔒 Security Features

- **Authentication**: JWT token-based authentication
- **Password Security**: Bcrypt hashing with 12 rounds
- **Rate Limiting**: Prevents brute-force attacks
- **CORS**: Controlled cross-origin access
- **Input Validation**: All inputs validated and sanitized
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy headers
- **Session Management**: Automatic token expiration
- **Activity Logging**: Complete audit trail
- **Security Monitoring**: Real-time security event tracking

## 📊 Database Schema

The PostgreSQL database includes:

- **admins** - Admin user accounts
- **products** - Product catalog
- **customers** - Customer accounts
- **orders** - Order records
- **order_items** - Order line items
- **payments** - Payment transactions
- **discounts** - Discount codes
- **returns** - Return requests
- **activity_logs** - Admin activity tracking
- **security_events** - Security event logs
- And more...

## 🧪 Testing

### Backend API Testing

```bash
cd backend-ecommerce

# Test health endpoint
curl http://localhost:3000/api/health

# Test products endpoint
curl http://localhost:3000/api/products

# Test admin login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@premiumhairsa.co.za","password":"your_password"}'
```

### Frontend Testing

1. Open browser to frontend URL
2. Browse products
3. Test search and filters
4. Add items to cart
5. Test user registration and login
6. Check browser console for errors

### Admin Testing

1. Open browser to admin URL
2. Login with admin credentials
3. Test all 10 dashboard panels
4. Create/edit a product
5. View orders and customers
6. Check all functionality

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [frontend-ecommerce/README.md](./frontend-ecommerce/README.md) - Frontend details
- [backend-ecommerce/README.md](./backend-ecommerce/README.md) - Backend API docs
- [admin-ecommerce/README.md](./admin-ecommerce/README.md) - Admin dashboard docs
- [ADMIN_SETUP.md](./ADMIN_SETUP.md) - Admin setup guide
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Production checklist

## 🚀 Deployment

### Recommended Deployment Stack

| Component | Service | URL Pattern |
|-----------|---------|-------------|
| Frontend | GitHub Pages | `https://username.github.io/ecommerce-frontend` |
| Backend | Render | `https://backend-name.onrender.com` |
| Database | Render PostgreSQL | Internal Render URL |
| Admin | Render | `https://admin-name.onrender.com` |

### Quick Deployment Links

- **Render**: https://render.com/ (Backend + Database + Admin)
- **GitHub Pages**: Settings → Pages in your repository

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions.

## 🔄 Development Workflow

### Making Changes

1. **Frontend Changes**:
   ```bash
   cd frontend-ecommerce
   # Edit files
   git add .
   git commit -m "Update frontend"
   git push
   # GitHub Pages auto-deploys
   ```

2. **Backend Changes**:
   ```bash
   cd backend-ecommerce
   # Edit files
   npm run dev  # Test locally
   git add .
   git commit -m "Update backend"
   git push
   # Render auto-deploys
   ```

3. **Admin Changes**:
   ```bash
   cd admin-ecommerce
   # Edit files
   npm start  # Test locally
   git add .
   git commit -m "Update admin"
   git push
   # Render auto-deploys
   ```

## 📞 Support

- **Email**: support@premiumhairsa.co.za
- **Phone**: +27 71 555 1234
- **Business Hours**: Monday-Friday 09:00-18:00 SAST

## 📄 License

PROPRIETARY - Premium Hair Wigs & Extensions Pty (Ltd)

All rights reserved. This software and associated documentation files are proprietary and confidential.

## 🙏 About Premium Hair Wigs & Extensions

**Premium Hair Wigs & Extensions Pty (Ltd)** is a luxury hair products retailer based in Protea Glen, Soweto, Johannesburg, South Africa.

- **Location**: 123 Luxury Lane, Protea Glen, Soweto
- **Registration**: CIPC & VAT Registered
- **Compliance**: POPIA Compliant
- **Contact**: +27 71 555 1234 | info@premiumhairsa.co.za

---

**Built with ❤️ for Premium Hair Wigs & Extensions**

*Empowering beauty through quality and innovation*
