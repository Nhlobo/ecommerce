# Premium Hair Wigs & Extensions - Backend API

This is the backend API server for Premium Hair Wigs & Extensions e-commerce platform.

## 🚀 Features

- RESTful API with 30+ endpoints
- JWT authentication and authorization
- PostgreSQL database integration
- Secure password hashing with bcrypt
- Rate limiting and brute-force protection
- CORS configuration for frontend and admin
- Comprehensive logging and monitoring
- POPIA and VAT compliance

## 📁 Structure

```
backend-ecommerce/
├── server.js           # Main Express server
├── controllers/        # Route controllers
├── middleware/         # Authentication, validation, rate limiting
├── routes/            # API routes
├── db/                # Database connection and initialization
└── .env.example       # Environment variables template
```

## 🔧 Prerequisites

- Node.js 14+ and npm
- PostgreSQL 12+

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize the database**:
   ```bash
   npm run init-db
   ```

4. **Start the server**:
   ```bash
   # Production
   npm start

   # Development (with auto-reload)
   npm run dev
   ```

## 🌐 Deployment to Render

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository** for the backend:
   ```bash
   # In the backend-ecommerce directory
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ecommerce-backend.git
   git push -u origin main
   ```

### Step 2: Deploy PostgreSQL Database on Render

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +"** and select **"PostgreSQL"**
3. **Configure Database**:
   - Name: `premium-hair-ecommerce-db`
   - Database: `premium_hair_ecommerce`
   - User: `premium_hair_admin` (auto-generated)
   - Region: Choose closest to your users
   - PostgreSQL Version: 12 or higher
   - Plan: Choose appropriate plan (Free tier available for testing)
4. **Click "Create Database"**
5. **Save Database Credentials**:
   - Internal Database URL (use this for your backend)
   - External Database URL (for external connections)
   - Username
   - Password
   - Host
   - Port

### Step 3: Deploy Backend Web Service on Render

1. **Click "New +"** and select **"Web Service"**
2. **Connect Your Repository**:
   - Select your `ecommerce-backend` repository
   - Click "Connect"
3. **Configure Web Service**:
   - **Name**: `premium-hair-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: Leave empty or set to `.`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose appropriate plan (Free tier available)
4. **Add Environment Variables**:
   Click "Advanced" and add these environment variables:

   ```
   NODE_ENV=production
   PORT=10000
   
   # Database (use Internal Database URL from Step 2)
   DATABASE_URL=<your_internal_database_url>
   
   # Or configure individually:
   DB_HOST=<your_db_host>
   DB_PORT=5432
   DB_NAME=premium_hair_ecommerce
   DB_USER=<your_db_user>
   DB_PASSWORD=<your_db_password>
   
   # JWT Secret (generate a strong random string)
   JWT_SECRET=<generate_strong_random_32char_string>
   JWT_EXPIRES_IN=24h
   
   # Admin Account
   ADMIN_EMAIL=admin@premiumhairsa.co.za
   ADMIN_PASSWORD=<set_strong_password>
   
   # Security
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   LOGIN_RATE_LIMIT_MAX=5
   BCRYPT_ROUNDS=12
   
   # CORS - Add your frontend and admin URLs
   FRONTEND_URL=https://YOUR_USERNAME.github.io/ecommerce-frontend
   ADMIN_URL=https://premium-hair-admin.onrender.com
   
   # Business
   COMPANY_NAME=Premium Hair Wigs & Extensions Pty (Ltd)
   SUPPORT_EMAIL=support@premiumhairsa.co.za
   VAT_RATE=0.15
   
   # PayFast (Production)
   PAYFAST_MERCHANT_ID=<your_merchant_id>
   PAYFAST_MERCHANT_KEY=<your_merchant_key>
   PAYFAST_PASSPHRASE=<your_passphrase>
   PAYFAST_URL=https://www.payfast.co.za/eng/process
   ```

5. **Click "Create Web Service"**
6. **Wait for Deployment**: Render will build and deploy your backend
7. **Your API will be available at**: `https://premium-hair-backend.onrender.com`

### Step 4: Initialize Database

After the backend is deployed, you need to initialize the database:

1. **Go to your Web Service** in Render Dashboard
2. **Click "Shell"** tab to access the server shell
3. **Run the initialization script**:
   ```bash
   npm run init-db
   ```

This will create all necessary tables, indexes, and seed initial data.

### Step 5: Update Frontend and Admin

Update the API URLs in:
- **Frontend**: `frontend-ecommerce/js/config.js`
- **Admin**: `admin-ecommerce/js/config.js` (or wherever admin config is)

Set `BASE_URL` to your Render backend URL:
```javascript
const API_CONFIG = {
    BASE_URL: 'https://premium-hair-backend.onrender.com',
    // ...
};
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order (admin)

### Customers
- `GET /api/customers` - Get all customers (admin)
- `GET /api/customers/:id` - Get customer by ID (admin)

### Payments
- `GET /api/payments` - Get all payments (admin)
- `POST /api/payments/webhook` - PayFast webhook

### Reports
- `GET /api/reports/sales` - Sales reports (admin)
- `GET /api/reports/analytics` - Analytics (admin)

*See full API documentation for all 30+ endpoints*

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000, Render uses 10000)
- `DATABASE_URL` or `DB_*` - Database connection
- `JWT_SECRET` - Secret for JWT tokens
- `ADMIN_EMAIL` & `ADMIN_PASSWORD` - Default admin credentials
- `FRONTEND_URL` - Frontend URL for CORS
- `ADMIN_URL` - Admin URL for CORS

## 🛡️ Security Features

- JWT token authentication
- Password hashing with bcrypt (12 rounds)
- Rate limiting (100 requests per 15 minutes)
- Login attempt tracking and lockout
- Helmet.js security headers
- CORS configuration
- SQL injection prevention
- Input validation and sanitization

## 📊 Database Schema

The database includes 20+ tables:
- `admins` - Admin users
- `products` - Product catalog
- `customers` - Customer accounts
- `orders` - Order records
- `order_items` - Order line items
- `payments` - Payment transactions
- `discounts` - Discount codes
- `returns` - Return requests
- `activity_logs` - Admin activity logs
- `security_events` - Security event logs
- And more...

## 🔧 Maintenance

### Database Backups
Render provides automatic daily backups for paid plans. For manual backup:
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Logs
View logs in Render Dashboard under the "Logs" tab.

### Monitoring
- Monitor CPU and memory usage in Render Dashboard
- Set up alerts for critical errors
- Review activity and security logs regularly

## 📝 Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is running
- Ensure firewall allows connections

### CORS Errors
- Add frontend and admin URLs to CORS whitelist
- Update `FRONTEND_URL` and `ADMIN_URL` environment variables

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration settings
- Review admin credentials

## 🔄 Free Tier Limitations (Render)

- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30+ seconds
- 750 hours per month included
- Consider upgrading for production use

## 📞 Support

For issues or questions, contact: support@premiumhairsa.co.za

## 📄 License

PROPRIETARY - Premium Hair Wigs & Extensions Pty (Ltd)
