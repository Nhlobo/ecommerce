# Admin Dashboard Setup Guide

## 🏗️ Architecture Overview

The admin dashboard is a **production-grade, secure system** with:

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt password hashing
- **Security**: Rate limiting, brute-force protection, HTTPS enforcement
- **Frontend**: Vanilla JavaScript with responsive design

## 📋 Prerequisites

Before setting up the admin dashboard, ensure you have:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a PostgreSQL database:

```sql
CREATE DATABASE premium_hair_ecommerce;
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=premium_hair_ecommerce
DB_USER=postgres
DB_PASSWORD=your_secure_password

# JWT Secret (CHANGE THIS!)
JWT_SECRET=generate_a_strong_random_secret_here

# Admin Account
ADMIN_EMAIL=admin@premiumhairsa.co.za
ADMIN_PASSWORD=ChangeThisPassword123!
```

**⚠️ IMPORTANT**: Change the JWT_SECRET and ADMIN_PASSWORD before deployment!

### 4. Initialize Database

Run the database initialization script:

```bash
npm run init-db
```

This will:
- Create all necessary database tables
- Set up indexes for performance
- Create the initial admin user
- Insert sample data

### 5. Start the Server

**Development mode** (with auto-restart):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 🔐 Accessing the Admin Dashboard

### Login URL
```
http://localhost:3000/admin
```

### Default Credentials
- **Email**: `admin@premiumhairsa.co.za`
- **Password**: `ChangeThisPassword123!`

**⚠️ CRITICAL**: Change the default password immediately after first login!

## 📊 Dashboard Features

### 1. **Overview Panel**
- Real-time business metrics
- Today's orders and revenue
- Pending orders count
- Low stock alerts
- Recent transactions

### 2. **Orders Management**
- View all orders
- Filter by status (pending, shipped, delivered, cancelled)
- Search orders
- Update fulfillment status
- Add tracking numbers

### 3. **Payments Panel**
- View all payments
- Filter by status
- Track PayFast transactions
- View failed payments
- Refund history

### 4. **Customers Panel**
- Customer list with POPIA compliance
- View customer profiles
- Order history
- Contact information
- Account management

### 5. **Products & Inventory**
- Add/edit/remove products
- Stock level management
- Low-stock warnings
- VAT-inclusive pricing
- Category management

### 6. **Discounts & Promotions**
- Create discount codes
- Set expiry dates
- Usage limits
- Percentage or fixed discounts
- Track usage

### 7. **Returns & Refunds**
- View return requests
- Approve/reject returns
- Inspection notes
- Process refunds
- Consumer Protection Act compliance

### 8. **Reports & Analytics**
- Sales reports
- Revenue trends
- Product performance
- Best-selling products

### 9. **Compliance & Legal**
- VAT records archive
- Invoice management
- POPIA data controls
- Policy document management

### 10. **Security & Activity Logs**
- Admin activity tracking
- Security event monitoring
- Audit trails
- Login history

## 🔒 Security Features

### Authentication
- ✅ JWT token-based authentication
- ✅ bcrypt password hashing (12 rounds)
- ✅ Session management with expiration
- ✅ Secure token storage

### Protection Mechanisms
- ✅ Rate limiting (100 requests per 15 min)
- ✅ Login rate limiting (5 attempts per 15 min)
- ✅ Brute-force protection
- ✅ Failed login attempt tracking
- ✅ Account lockout after excessive failures

### Security Headers
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ XSS protection
- ✅ Content Security Policy

### Activity Monitoring
- ✅ All admin actions logged
- ✅ Security events tracking
- ✅ IP address logging
- ✅ User agent tracking

### Data Protection (POPIA Compliance)
- ✅ Data access logging
- ✅ Customer data protection
- ✅ Audit trails
- ✅ Secure data handling

## 🛡️ Production Deployment Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Change default admin password
- [ ] Enable HTTPS/SSL (required for production)
- [ ] Configure proper database backups
- [ ] Set NODE_ENV=production
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerts
- [ ] Review and update CORS origins
- [ ] Configure proper logging
- [ ] Set up database connection pooling
- [ ] Review rate limiting settings
- [ ] Enable database encryption at rest
- [ ] Set up regular security audits

## 📁 Project Structure

```
ecommerce/
├── server/
│   ├── controllers/
│   │   └── authController.js      # Authentication logic
│   ├── db/
│   │   ├── connection.js          # Database connection
│   │   ├── init.js                # Database initialization
│   │   └── schema.sql             # Database schema
│   ├── middleware/
│   │   ├── auth.js                # JWT authentication
│   │   ├── logger.js              # Activity logging
│   │   ├── rateLimiter.js         # Rate limiting
│   │   └── validator.js           # Input validation
│   ├── routes/
│   │   └── adminRoutes.js         # Admin API routes
│   └── server.js                  # Main server file
├── admin/
│   ├── css/
│   │   └── admin.css              # Admin dashboard styles
│   ├── js/
│   │   ├── admin.js               # Main dashboard logic
│   │   └── login.js               # Login page logic
│   ├── index.html                 # Dashboard interface
│   └── login.html                 # Login page
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
└── README.md                      # Main documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Get current admin info
- `POST /api/admin/change-password` - Change password

### Dashboard
- `GET /api/admin/dashboard/overview` - Dashboard statistics

### Orders
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/orders/:id` - Get order details
- `PUT /api/admin/orders/:id` - Update order

### Payments
- `GET /api/admin/payments` - List all payments

### Customers
- `GET /api/admin/customers` - List all customers
- `GET /api/admin/customers/:id` - Get customer details

### Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Discounts
- `GET /api/admin/discounts` - List discount codes
- `POST /api/admin/discounts` - Create discount code

### Returns & Refunds
- `GET /api/admin/returns` - List returns
- `PUT /api/admin/returns/:id` - Update return
- `GET /api/admin/refunds` - List refunds

### Reports
- `GET /api/admin/reports/sales` - Sales report
- `GET /api/admin/reports/products` - Product performance

### Compliance
- `GET /api/admin/compliance/vat` - VAT records
- `GET /api/admin/compliance/policies` - Policy documents

### Logs
- `GET /api/admin/logs/activity` - Activity logs
- `GET /api/admin/logs/security` - Security events

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check database exists
psql -U postgres -l
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Authentication Errors
- Clear browser local storage
- Check JWT_SECRET in .env
- Verify database session table

## 📞 Support

For issues or questions:
- Email: support@premiumhairsa.co.za
- Phone: +27 71 555 1234

## 📄 License

Copyright © 2024 Premium Hair Wigs & Extensions Pty (Ltd). All rights reserved.

This is proprietary software. Unauthorized copying, distribution, or modification is prohibited.
