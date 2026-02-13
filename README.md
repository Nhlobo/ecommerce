# Premium Hair Wigs & Extensions - E-commerce Platform

> A complete e-commerce solution for Premium Hair Wigs & Extensions, built with Node.js, Express, PostgreSQL, and vanilla JavaScript.

## 📋 Overview

This is a **monorepo** containing three integrated components for a complete e-commerce solution:

1. **Backend API** (`backend-ecommerce/`) - RESTful API with 43 endpoints
2. **Frontend Storefront** (`frontend-ecommerce/`) - Customer-facing shopping website
3. **Admin Dashboard** (`admin-ecommerce/`) - Management interface for store operations

## 🏗️ Architecture

```
ecommerce/
├── backend-ecommerce/       # Express.js REST API
│   ├── server.js            # Main server (serves all components)
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth, validation, rate limiting
│   ├── routes/             # API routes
│   └── db/                 # Database connection & schema
│
├── frontend-ecommerce/      # Static HTML/CSS/JS storefront
│   ├── index.html          # Main shopping page
│   ├── js/                 # Frontend JavaScript
│   └── assets/             # Images and static files
│
└── admin-ecommerce/         # Admin dashboard
    ├── index.html          # Dashboard page
    ├── login.html          # Admin login
    └── js/                 # Admin JavaScript
```

### How Components Work Together

The **backend server** (`backend-ecommerce/server.js`) serves all three components:

- **API routes** at `/api/*` - RESTful endpoints for data operations
- **Frontend** at `/` - Customer shopping interface
- **Admin dashboard** at `/admin/*` - Management interface

This unified architecture simplifies deployment while allowing future separation into microservices.

## ✨ Features

### Customer Features (Frontend)
- 🛍️ Product browsing with search and filters
- 🛒 Shopping cart management
- 👤 User authentication and profiles
- ❤️ Wishlist functionality
- 📦 Order tracking
- 💳 Secure PayFast payment integration
- 📱 Responsive design for all devices

### Admin Features (Dashboard)
- 📊 Real-time dashboard with key metrics
- 📦 Product inventory management
- 📋 Order processing and fulfillment
- 👥 Customer management
- 💰 Payment tracking
- 📈 Sales reports and analytics
- 🎫 Discount code management
- 🔄 Returns and refunds processing
- 📜 Activity and security logs
- ⚖️ VAT compliance reporting

### Backend API Features
- 🔒 JWT-based authentication
- 🛡️ Comprehensive security (Helmet, CORS, rate limiting)
- 📝 Request logging with Morgan
- ✅ Input validation and sanitization
- 🗃️ PostgreSQL database with 20+ tables
- 🔐 Bcrypt password hashing
- 🚦 Rate limiting and brute-force protection
- 📊 Activity and security audit logging

## 🚀 Quick Start

### Prerequisites

- **Node.js** 14+ and npm
- **PostgreSQL** 12+
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nhlobo/ecommerce.git
   cd ecommerce
   ```

2. **Set up the backend**:
   ```bash
   cd backend-ecommerce
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run init-db   # Initialize database and create tables
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Access the applications**:
   - **Frontend**: http://localhost:3000
   - **Admin Dashboard**: http://localhost:3000/admin
   - **API**: http://localhost:3000/api

### Default Admin Credentials

```
Email: admin@premiumhairsa.co.za
Password: ChangeThisPassword123!
```

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

## 📚 Documentation

### Component-Specific READMEs

- **Backend API**: [`backend-ecommerce/README.md`](backend-ecommerce/README.md)
- **Frontend**: [`frontend-ecommerce/README.md`](frontend-ecommerce/README.md)
- **Admin Dashboard**: [`admin-ecommerce/README.md`](admin-ecommerce/README.md)

### API Endpoints

The backend provides 43 RESTful API endpoints:

#### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Get current admin
- `POST /api/admin/change-password` - Change password

#### Products (Public & Admin)
- `GET /api/products` - List products (with filters, pagination)
- `GET /api/products/:id` - Get product details
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)

#### Orders
- `GET /api/admin/orders` - List all orders (admin only)
- `GET /api/admin/orders/:id` - Get order details
- `PUT /api/admin/orders/:id` - Update order
- `POST /api/orders` - Create customer order

#### Customers (Admin)
- `GET /api/admin/customers` - List customers
- `GET /api/admin/customers/:id` - Get customer details

#### Dashboard & Reports (Admin)
- `GET /api/admin/dashboard/overview` - Dashboard statistics
- `GET /api/admin/reports/sales` - Sales reports
- `GET /api/admin/reports/products` - Product performance

#### Payments (Admin)
- `GET /api/admin/payments` - List payments

#### Discounts (Admin)
- `GET /api/admin/discounts` - List discount codes
- `POST /api/admin/discounts` - Create discount code

#### Returns & Refunds (Admin)
- `GET /api/admin/returns` - List returns
- `PUT /api/admin/returns/:id` - Update return
- `GET /api/admin/refunds` - List refunds

#### Compliance (Admin)
- `GET /api/admin/compliance/vat` - VAT records
- `GET /api/admin/compliance/policies` - Policy documents

#### Logs (Admin)
- `GET /api/admin/logs/activity` - Activity logs
- `GET /api/admin/logs/security` - Security events

#### Miscellaneous
- `GET /api/health` - Health check endpoint

See [backend-ecommerce/README.md](backend-ecommerce/README.md) for complete API documentation.

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_NAME=premium_hair_ecommerce
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_min_32_chars

# Optional
FRONTEND_URL=http://localhost:8000
ADMIN_URL=http://localhost:8001
VAT_RATE=0.15
PAYFAST_MERCHANT_ID=your_id
PAYFAST_MERCHANT_KEY=your_key
```

See `.env.example` for all available options.

## 🌐 Deployment

### Unified Deployment (Current Setup)

Deploy the entire application as a single service:

**Recommended Platform**: Render.com

1. **Deploy PostgreSQL Database**:
   - Create a new PostgreSQL database on Render
   - Save the connection credentials

2. **Deploy Backend (serves all components)**:
   - Connect your GitHub repository
   - Root directory: `backend-ecommerce`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables from `.env.example`

3. **Access your application**:
   - Frontend: `https://your-app.onrender.com`
   - Admin: `https://your-app.onrender.com/admin`
   - API: `https://your-app.onrender.com/api`

### Separate Deployment (Advanced)

For production scalability, you can deploy components separately:

1. **Backend API**: Render Web Service
2. **Frontend**: GitHub Pages or Vercel
3. **Admin Dashboard**: Render Static Site or Vercel

See [`MIGRATION.md`](MIGRATION.md) for detailed instructions on splitting this monorepo.

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt with 12 rounds
- **Rate Limiting**: 100 requests per 15 minutes
- **Brute-force Protection**: Login attempt tracking
- **Helmet.js**: Security headers
- **CORS**: Configured for specific origins
- **SQL Injection Prevention**: Parameterized queries
- **Input Validation**: Express-validator on all inputs
- **Activity Logging**: Complete audit trail
- **Security Event Tracking**: Monitor suspicious activities

## 📊 Database Schema

The PostgreSQL database includes 20+ tables:

- `admin_users` - Admin accounts
- `customers` - Customer accounts
- `products` - Product catalog
- `orders` - Order records
- `order_items` - Order line items
- `payments` - Payment transactions
- `discount_codes` - Promotional codes
- `returns` - Return requests
- `refunds` - Refund records
- `vat_records` - VAT compliance
- `activity_logs` - Admin activity audit
- `security_events` - Security monitoring
- And more...

## 🧪 Testing

```bash
# Backend tests
cd backend-ecommerce
npm test

# Initialize database (includes sample data)
npm run init-db

# Check database connection
npm run test-db
```

## 🛠️ Development

### Backend Development
```bash
cd backend-ecommerce
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend-ecommerce
npm install
npm run dev  # Serves on http://localhost:8000
```

### Admin Development
```bash
cd admin-ecommerce
npm install
npm run dev  # Serves on http://localhost:8001
```

## 📦 Splitting into Separate Repositories

To split this monorepo into three separate repositories while preserving git history:

See **[MIGRATION.md](MIGRATION.md)** for complete step-by-step instructions.

Quick overview:
1. Create three new repositories: `ecommerce-backend`, `ecommerce-frontend`, `ecommerce-admin`
2. Use `git filter-branch` or `git subtree split` to extract each component
3. Update configuration and CORS settings
4. Deploy each component independently

## 🤝 Contributing

This is a proprietary project. For authorized contributors:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

PROPRIETARY - Premium Hair Wigs & Extensions Pty (Ltd)

All rights reserved. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

## 📞 Support

For technical support or questions:

- **Email**: support@premiumhairsa.co.za
- **Phone**: +27 XX XXX XXXX
- **Website**: https://premiumhairsa.co.za

## 🔄 Version History

### Version 1.0.0 (Current)
- Initial release
- Backend API with 43 endpoints
- Customer storefront
- Admin dashboard
- PostgreSQL database
- Security features implemented
- PayFast integration
- VAT compliance

## 🎯 Roadmap

- [ ] Customer registration and authentication
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Inventory alerts
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] WhatsApp integration for customer support
- [ ] Multi-language support (English, Afrikaans, Zulu)

---

**Built with ❤️ for Premium Hair Wigs & Extensions**
