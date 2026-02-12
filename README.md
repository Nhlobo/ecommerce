# Premium Hair Wigs & Extensions E-commerce Platform

A complete, production-ready **full-stack** e-commerce platform for a premium hair wigs and extensions business. **Now separated into three independent deployable components**: customer-facing storefront (GitHub Pages), backend API with database (Render), and secure admin dashboard (Render).

## 🎯 New Architecture - Separated Components

This repository is now organized into **three separate applications** that can be deployed independently:

```
ecommerce/
├── frontend-ecommerce/      → Deploy to GitHub Pages
├── backend-ecommerce/       → Deploy to Render (with PostgreSQL)
└── admin-ecommerce/         → Deploy to Render
```

### Quick Links
- 📖 **[QUICK_START.md](./QUICK_START.md)** - 30-minute deployment guide
- 📚 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- 🏗️ **[REPOSITORY_README.md](./REPOSITORY_README.md)** - Detailed architecture documentation

## 🚀 Quick Deployment

### Step 1: Create Three GitHub Repositories
```bash
# Frontend
cd frontend-ecommerce && git init && git add . && git commit -m "Initial commit"

# Backend
cd ../backend-ecommerce && git init && git add . && git commit -m "Initial commit"

# Admin
cd ../admin-ecommerce && git init && git add . && git commit -m "Initial commit"
```

### Step 2: Deploy to Hosting Services

| Component | Deploy To | Time |
|-----------|-----------|------|
| 🗄️ Database | Render PostgreSQL | 3 min |
| ⚙️ Backend API | Render Web Service | 5 min |
| 🔐 Admin Dashboard | Render Web Service | 5 min |
| 🛒 Frontend Store | GitHub Pages | 3 min |

**Total deployment time: ~30 minutes**

👉 Follow **[QUICK_START.md](./QUICK_START.md)** for step-by-step instructions.

## 🚀 About Premium Hair Wigs & Extensions

**Premium Hair Wigs & Extensions Pty (Ltd)** is a luxury hair products retailer based in Protea Glen, Soweto, Johannesburg, South Africa. We specialize in:

- Premium quality wigs (100% human hair)
- Hair extensions (clip-in, tape-in, silk)
- Hair care accessories
- Professional styling products

### Company Information

- **Registered Name:** Premium Hair Wigs & Extensions Pty (Ltd)
- **Registration:** CIPC & VAT Registered
- **Compliance:** POPIA Compliant
- **Location:** 123 Luxury Lane, Protea Glen, Soweto, Johannesburg, Gauteng, 1818
- **Contact:** +27 71 555 1234 | info@premiumhairsa.co.za
- **Business Hours:** 
  - Monday - Friday: 09:00 - 18:00
  - Saturday: 09:00 - 14:00
  - Sunday: Closed

## ✨ Features

### Customer-Facing Storefront
- 🛍️ **Product Catalog** - Browse wigs, extensions, and accessories
- 🔍 **Search & Filter** - Find products by category and search terms
- 🛒 **Shopping Cart** - Add, update, and remove items
- ❤️ **Wishlist** - Save favorite products for later
- 💳 **Secure Checkout** - PayFast integration with multiple payment options
- 📦 **Order Tracking** - Track your orders in real-time
- 👤 **User Accounts** - Register, login, and manage your profile
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔔 **Notifications** - Real-time feedback for all actions

### 🔐 **ADMIN DASHBOARD** (Production-Grade)

#### Security & Authentication
- 🔒 **JWT Token Authentication** - Secure token-based auth
- 🔑 **Password Hashing** - bcrypt with 12 rounds
- 🛡️ **Brute-Force Protection** - Rate limiting & login attempt tracking
- 📊 **Session Management** - Secure session handling with expiration
- 🚨 **Security Monitoring** - Real-time security event tracking
- 📝 **Activity Logging** - Complete audit trail of all admin actions
- 🔐 **Role-Based Access Control** - Admin role management

#### Business Management Panels (10 Panels)
1. **📊 Overview/Dashboard** - Real-time metrics, sales, alerts, quick actions
2. **📦 Orders Management** - View, filter, update orders, tracking numbers
3. **💳 Payments** - PayFast integration, payment tracking, refund processing
4. **👥 Customers** - Customer profiles, order history, POPIA compliant
5. **📦 Products & Inventory** - Add/edit products, stock management, VAT pricing
6. **🎟️ Discounts & Promotions** - Create discount codes, manage campaigns
7. **↩️ Returns & Refunds** - CPA compliant return workflows, inspection tracking
8. **📈 Reports & Analytics** - Sales reports, product performance, revenue trends
9. **📋 Compliance & Legal** - VAT records, POPIA controls, policy management
10. **🔐 Security & Logs** - Activity logs, security events, audit trails

#### Compliance & Legal
- 💰 **VAT Record-Keeping** - Automatic 15% VAT calculation & archiving
- 🛡️ **POPIA Compliance** - Data protection, access logging, privacy controls
- ⚖️ **Consumer Protection Act** - Return workflows, refund processing
- 📄 **Policy Management** - Terms, Privacy, Returns policy documents
- 📊 **Audit Trails** - Complete activity and data access logging

### Business Features
- 💰 **Pricing with VAT** - Automatic 15% VAT calculation
- 🚚 **Smart Shipping** - Free shipping on orders above R1,500
- ⏰ **Flash Sales** - Countdown timer for limited-time offers
- 📧 **Newsletter** - Email subscription for updates and promotions
- 📞 **Contact Form** - Direct communication channel
- 🔒 **Data Protection** - POPIA compliant data handling

## 📁 Project Structure

This repository contains three separate, deployable applications:

```
ecommerce/
│
├── frontend-ecommerce/          # 🛒 Customer Storefront
│   ├── index.html              # Main storefront page
│   ├── styles.css              # Storefront styles
│   ├── assets/                 # Images and static files
│   ├── js/
│   │   ├── config.js          # API configuration (update backend URL here)
│   │   ├── api.js             # API service layer
│   │   └── app.js             # Main application logic
│   └── README.md              # Frontend deployment guide
│
├── backend-ecommerce/           # ⚙️ Backend API Server
│   ├── server.js               # Express server entry point
│   ├── package.json            # Backend dependencies
│   ├── .env.example            # Environment variables template
│   ├── controllers/            # API controllers
│   ├── middleware/             # Auth, validation, rate limiting
│   ├── routes/                 # API routes
│   ├── db/                     # Database connection and schema
│   └── README.md              # Backend deployment guide
│
├── admin-ecommerce/             # 🔐 Admin Dashboard
│   ├── server.js               # Admin server (serves static files)
│   ├── package.json            # Admin dependencies
│   ├── index.html              # Admin dashboard
│   ├── login.html              # Admin login page
│   ├── css/                    # Admin styles
│   ├── js/
│   │   ├── config.js          # Admin API configuration (update backend URL)
│   │   ├── login.js           # Login logic
│   │   └── admin.js           # Dashboard logic
│   └── README.md              # Admin deployment guide
│
├── QUICK_START.md              # 30-minute deployment guide
├── DEPLOYMENT_GUIDE.md         # Complete deployment instructions
├── REPOSITORY_README.md        # Detailed architecture docs
└── README.md                   # This file
```

## 🌐 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     FRONTEND (GitHub Pages)                  │
│          Customer-facing E-commerce Storefront               │
│   https://YOUR_USERNAME.github.io/ecommerce-frontend         │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ Fetch API (REST)
                       ▼
┌──────────────────────────────────────────────────────────────┐
│              BACKEND API (Render - Node.js)                  │
│          Express.js + PostgreSQL Database                    │
│        https://premium-hair-backend.onrender.com             │
│                                                              │
│  REST API: /api/products, /api/orders, /api/auth...         │
└──────────────────────┬───────────────────────────────────────┘
                       ▲
                       │ Fetch API (REST)
                       │
┌──────────────────────┴───────────────────────────────────────┐
│              ADMIN DASHBOARD (Render - Node.js)              │
│           Secure Admin Management Interface                  │
│        https://premium-hair-admin.onrender.com               │
└──────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure (Legacy)
├── index.html                     # Customer-facing storefront
├── styles.css                     # Storefront styles
├── js/
│   ├── config.js                  # Configuration (API endpoints, business info)
│   ├── api.js                     # API service layer
│   └── app.js                     # Main application logic
│
├── admin/                         # 🔐 ADMIN DASHBOARD
│   ├── login.html                 # Secure admin login
│   ├── index.html                 # Admin dashboard (10 panels)
│   ├── css/
│   │   └── admin.css             # Admin dashboard styles
│   └── js/
│       ├── login.js              # Login authentication
│       └── admin.js              # Dashboard functionality
│
├── server/                        # 🔧 BACKEND SERVER
│   ├── server.js                  # Express server
│   ├── controllers/
│   │   └── authController.js     # Authentication logic
│   ├── db/
│   │   ├── connection.js         # PostgreSQL connection
│   │   ├── init.js               # Database initialization
│   │   └── schema.sql            # Complete database schema
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── rateLimiter.js        # Rate limiting & brute-force protection
│   │   ├── logger.js             # Activity & data access logging
│   │   └── validator.js          # Input validation & sanitization
│   └── routes/
│       └── adminRoutes.js        # All admin API endpoints
│
├── .env.example                   # Environment variables template
├── package.json                   # Node.js dependencies
├── README.md                      # This file
├── ADMIN_SETUP.md                 # 📖 Admin Dashboard Setup Guide
└── .gitignore                     # Git ignore rules
```

## 🛠️ Deployment & Setup

### 🚀 Production Deployment (Recommended)

Deploy each component separately for best performance and scalability:

#### Option 1: Quick Deployment (30 minutes)
Follow the **[QUICK_START.md](./QUICK_START.md)** guide:
- Create 3 GitHub repositories
- Deploy database to Render PostgreSQL (3 min)
- Deploy backend to Render (5 min)
- Deploy admin to Render (5 min)
- Deploy frontend to GitHub Pages (3 min)
- Configure connections (5 min)

#### Option 2: Detailed Deployment
Follow the **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for comprehensive step-by-step instructions.

### 💻 Local Development

For local development and testing:

#### 1. Backend + Database

```bash
cd backend-ecommerce

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your local database credentials

# Initialize database (PostgreSQL must be running)
npm run init-db

# Start backend server
npm run dev
# Runs on http://localhost:3000
```

#### 2. Admin Dashboard

```bash
cd admin-ecommerce

# Install dependencies
npm install

# Update config to use local backend
# Edit js/config.js: API_BASE_URL should be 'http://localhost:3000'

# Start admin server
npm start
# Runs on http://localhost:3001

# Open browser: http://localhost:3001/login.html
```

#### 3. Frontend Storefront

```bash
cd frontend-ecommerce

# Update config to use local backend
# Edit js/config.js: return 'http://localhost:3000' in getBackendUrl()

# Start local server (choose one):

# Python
python -m http.server 8000

# Node.js
npx http-server

# VS Code Live Server
# Right-click index.html → "Open with Live Server"

# Open browser: http://localhost:8000
```

### 🔧 Configuration

Each component requires configuration to connect to the backend:

**Frontend** (`frontend-ecommerce/js/config.js`):
```javascript
return 'https://your-backend-url.onrender.com';
```

**Admin** (`admin-ecommerce/js/config.js`):
```javascript
API_BASE_URL: 'https://your-backend-url.onrender.com'
```

**Backend** (`.env`):
```env
DATABASE_URL=postgresql://...
FRONTEND_URL=https://username.github.io/ecommerce-frontend
ADMIN_URL=https://admin.onrender.com
```

---

## 🛠️ Legacy Setup Instructions (Old Monolithic Structure)
   ```

5. **Access admin dashboard**
   ```
   URL: http://localhost:3000/admin
   Email: admin@premiumhairsa.co.za
   Password: ChangeThisPassword123!
   ```

#### 📖 **Full Admin Setup Guide**
For complete setup instructions, security configuration, and deployment:
**See [ADMIN_SETUP.md](./ADMIN_SETUP.md)**

## ⚙️ Configuration

### API Configuration

Edit `js/config.js` to configure API endpoints:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://api.premiumhairsa.co.za',
    ENDPOINTS: {
        products: 'https://api.premiumhairsa.co.za/api/products',
        // ... other endpoints
    }
};
```

### Business Information

Update business details in `js/config.js`:

```javascript
const BUSINESS_INFO = {
    companyName: 'Premium Hair Wigs & Extensions Pty (Ltd)',
    address: { /* ... */ },
    contact: { /* ... */ }
};
```

### Application Settings

Customize app behavior in `js/config.js`:

```javascript
const APP_CONFIG = {
    currency: 'R',
    VAT_RATE: 0.15,
    SHIPPING: {
        FREE_THRESHOLD: 1500,
        STANDARD_COST: 150
    }
};
```

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #8B4513;      /* Brand primary color */
    --secondary: #5C4033;    /* Brand secondary color */
    --accent: #D2B48C;       /* Accent color */
    /* ... */
}
```

### Fonts

The application uses:
- **Headings:** Cormorant Garamond (serif)
- **Body:** Poppins (sans-serif)

Change in the `<head>` section of `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

## 🛡️ Security & Compliance

### Admin Dashboard Security Features

#### Authentication & Authorization
- ✅ JWT token-based authentication
- ✅ bcrypt password hashing (12 rounds)
- ✅ Secure session management
- ✅ Role-based access control (RBAC)

#### Protection Mechanisms
- ✅ Rate limiting (100 req/15 min)
- ✅ Login rate limiting (5 attempts/15 min)
- ✅ Brute-force protection
- ✅ Failed login attempt tracking
- ✅ Account lockout after excessive failures
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation & sanitization
- ✅ SQL injection prevention

#### Monitoring & Logging
- ✅ Complete activity audit trails
- ✅ Security event tracking
- ✅ IP address & user agent logging
- ✅ Data access logging (POPIA compliance)

### POPIA Compliance
- ✅ User data handled securely
- ✅ Data access logging and monitoring
- ✅ Customer privacy controls
- ✅ Clear privacy policy
- ✅ User consent for data collection
- ✅ Audit trails for data access

### Consumer Protection Act (CPA)
- ✅ 7-day return policy support
- ✅ Return request workflows
- ✅ Refund processing
- ✅ Inspection tracking

### VAT Compliance
- ✅ Automatic 15% VAT calculation
- ✅ VAT-inclusive pricing
- ✅ VAT record archiving
- ✅ Invoice generation support

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings > Pages
3. Select branch and root folder
4. Your site will be live at `https://username.github.io/ecommerce`

### Netlify

1. Connect your repository
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

### Vercel

```bash
npm install -g vercel
vercel
```

### Traditional Web Hosting

1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Point your domain to the hosting directory

## 🔧 Development

### File Organization

- **index.html** - Complete HTML structure with all pages
- **styles.css** - All styling with mobile-first responsive design
- **js/config.js** - Configuration and constants
- **js/api.js** - API communication layer
- **js/app.js** - Application logic and UI interactions

### Adding New Features

1. **New Page**
   - Add page HTML in `index.html`
   - Add styles in `styles.css`
   - Add navigation logic in `js/app.js`

2. **New API Endpoint**
   - Add endpoint to `js/config.js`
   - Add method to `APIService` class in `js/api.js`
   - Call from `js/app.js`

3. **New Product Category**
   - Update filter buttons in `index.html`
   - Add filter logic in `filterProducts()` function

## 🛡️ Security & Compliance

### Admin Dashboard Security Features

#### Authentication & Authorization
- ✅ JWT token-based authentication
- ✅ bcrypt password hashing (12 rounds)
- ✅ Secure session management
- ✅ Role-based access control (RBAC)

#### Protection Mechanisms
- ✅ Rate limiting (100 req/15 min)
- ✅ Login rate limiting (5 attempts/15 min)
- ✅ Brute-force protection
- ✅ Failed login attempt tracking
- ✅ Account lockout after excessive failures
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation & sanitization
- ✅ SQL injection prevention

#### Monitoring & Logging
- ✅ Complete activity audit trails
- ✅ Security event tracking
- ✅ IP address & user agent logging
- ✅ Data access logging (POPIA)

### POPIA Compliance
- User data is handled securely
- Data access is logged and monitored
- Customer privacy controls
- Clear privacy policy
- User consent for data collection
- Audit trails for data access

### Security Best Practices
- Input validation on all forms
- Secure payment gateway (PayFast)
- HTTPS recommended for production
- XSS protection through proper escaping
- Regular security audits recommended

## 🛡️ Security & Compliance

### POPIA Compliance
- User data is stored locally (localStorage)
- No unauthorized data sharing
- Clear privacy policy
- User consent for data collection

### Security Best Practices
- Input validation on all forms
- Secure payment gateway (PayFast)
- HTTPS recommended for production
- XSS protection through proper escaping

## 📊 Analytics & Monitoring

To add analytics, include in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

Copyright © 2024 Premium Hair Wigs & Extensions Pty (Ltd). All rights reserved.

This is proprietary software. Unauthorized copying, distribution, or modification is prohibited.

## 📞 Support

For support or inquiries:

- **Email:** info@premiumhairsa.co.za
- **Phone:** +27 71 555 1234
- **Address:** 123 Luxury Lane, Protea Glen, Soweto, Johannesburg, Gauteng, 1818
- **Hours:** Monday-Friday 09:00-18:00, Saturday 09:00-14:00

## 🙏 Acknowledgments

- **Design Inspiration:** Modern e-commerce best practices
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Cormorant Garamond, Poppins)
- **Images:** Unsplash (product images)
- **Payment Gateway:** PayFast

---

**Made with ❤️ in Soweto, Johannesburg, South Africa**
