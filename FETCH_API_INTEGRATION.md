# Fetch API Integration - Technical Overview

This document explains how the three components communicate using the Fetch API.

## 🔗 Connection Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Browser)                           │
│                 GitHub Pages / Static Host                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  JavaScript (Fetch API)                                         │
│  ├── GET /api/products                                          │
│  ├── POST /api/auth/login                                       │
│  ├── POST /api/orders                                           │
│  └── GET /api/orders/track/:orderNumber                         │
│                                                                 │
│  Config: js/config.js                                           │
│  const BACKEND_URL = 'https://backend.onrender.com'             │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS/JSON
                             │ Fetch API Calls
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND API (Node.js)                         │
│                       Render                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Express.js REST API                                            │
│  ├── Routes: /api/*                                             │
│  ├── Authentication: JWT                                        │
│  ├── Database: PostgreSQL                                       │
│  └── CORS: Allows frontend + admin                             │
│                                                                 │
│  Config: .env                                                   │
│  FRONTEND_URL=https://username.github.io/frontend               │
│  ADMIN_URL=https://admin.onrender.com                           │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             ▲
                             │ HTTPS/JSON
                             │ Fetch API Calls
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                   ADMIN DASHBOARD (Browser)                     │
│                          Render                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  JavaScript (Fetch API)                                         │
│  ├── POST /api/admin/login                                      │
│  ├── GET /api/admin/dashboard                                   │
│  ├── GET /api/admin/orders                                      │
│  ├── PUT /api/admin/products/:id                                │
│  └── GET /api/admin/reports/sales                               │
│                                                                 │
│  Config: js/config.js                                           │
│  API_BASE_URL = 'https://backend.onrender.com'                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📡 Frontend Fetch API Examples

### 1. Get Products
```javascript
// File: frontend-ecommerce/js/api.js

async function getProducts() {
    const response = await fetch(`${API_CONFIG.ENDPOINTS.products}`);
    const data = await response.json();
    return data;
}

// Usage:
const products = await getProducts();
```

### 2. User Login
```javascript
async function login(email, password) {
    const response = await fetch(API_CONFIG.ENDPOINTS.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
}
```

### 3. Create Order
```javascript
async function createOrder(orderData) {
    const token = localStorage.getItem('token');
    
    const response = await fetch(API_CONFIG.ENDPOINTS.orders, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
    });
    
    return response.json();
}
```

## 🔐 Admin Fetch API Examples

### 1. Admin Login
```javascript
// File: admin-ecommerce/js/login.js

async function adminLogin(email, password) {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('adminToken', data.token);
    }
    return data;
}
```

### 2. Get Dashboard Metrics
```javascript
// File: admin-ecommerce/js/admin.js

async function getDashboardMetrics() {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE}/api/admin/dashboard`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.json();
}
```

### 3. Update Product
```javascript
async function updateProduct(productId, productData) {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE}/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    });
    
    return response.json();
}
```

## ⚙️ Backend API Endpoints

### Public Endpoints (No Auth Required)

```javascript
// Products
GET    /api/products              // Get all products
GET    /api/products/:id           // Get product by ID
GET    /api/products/search        // Search products

// Contact
POST   /api/contact                // Send contact message
POST   /api/newsletter             // Subscribe to newsletter
```

### Customer Endpoints (User Auth Required)

```javascript
// Authentication
POST   /api/auth/register          // Register new user
POST   /api/auth/login             // User login
GET    /api/auth/user              // Get current user
POST   /api/auth/logout            // User logout

// Orders
GET    /api/orders                 // Get user's orders
POST   /api/orders                 // Create order
GET    /api/orders/:id             // Get order by ID
GET    /api/orders/track/:number   // Track order

// Wishlist
GET    /api/wishlist               // Get user's wishlist
POST   /api/wishlist               // Add to wishlist
DELETE /api/wishlist/:id           // Remove from wishlist
```

### Admin Endpoints (Admin Auth Required)

```javascript
// Admin Authentication
POST   /api/admin/login            // Admin login
POST   /api/admin/logout           // Admin logout
GET    /api/admin/verify           // Verify admin token

// Dashboard
GET    /api/admin/dashboard        // Dashboard metrics

// Orders Management
GET    /api/admin/orders           // Get all orders
GET    /api/admin/orders/:id       // Get order by ID
PUT    /api/admin/orders/:id       // Update order

// Products Management
GET    /api/admin/products         // Get all products
POST   /api/admin/products         // Create product
PUT    /api/admin/products/:id     // Update product
DELETE /api/admin/products/:id     // Delete product

// Customers Management
GET    /api/admin/customers        // Get all customers
GET    /api/admin/customers/:id    // Get customer by ID

// Payments
GET    /api/admin/payments         // Get all payments
GET    /api/admin/payments/:id     // Get payment by ID

// Discounts
GET    /api/admin/discounts        // Get all discounts
POST   /api/admin/discounts        // Create discount
PUT    /api/admin/discounts/:id    // Update discount
DELETE /api/admin/discounts/:id    // Delete discount

// Returns
GET    /api/admin/returns          // Get all returns
PUT    /api/admin/returns/:id      // Update return status

// Reports
GET    /api/admin/reports/sales    // Sales report
GET    /api/admin/reports/analytics // Analytics data

// Compliance
GET    /api/admin/compliance/vat   // VAT records
GET    /api/admin/compliance/logs  // Activity logs

// Security
GET    /api/admin/security/events  // Security events
GET    /api/admin/security/logs    // Security logs
```

## 🔒 CORS Configuration

The backend is configured to allow requests only from specific origins:

```javascript
// backend-ecommerce/server.js

const allowedOrigins = [
    process.env.FRONTEND_URL,  // Frontend URL
    process.env.ADMIN_URL      // Admin URL
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Required Environment Variables

Backend `.env`:
```env
FRONTEND_URL=https://username.github.io/ecommerce-frontend
ADMIN_URL=https://admin-name.onrender.com
```

## 🔐 Authentication Flow

### Frontend User Authentication

```
1. User enters email/password
2. Frontend: POST /api/auth/login with credentials
3. Backend: Validates credentials, generates JWT token
4. Backend: Returns { token, user }
5. Frontend: Stores token in localStorage
6. Frontend: Includes token in subsequent requests
   Header: Authorization: Bearer <token>
```

### Admin Authentication

```
1. Admin enters email/password
2. Admin: POST /api/admin/login with credentials
3. Backend: Validates admin credentials
4. Backend: Generates JWT token with admin role
5. Backend: Returns { token, admin }
6. Admin: Stores token in localStorage (key: 'adminToken')
7. Admin: Includes token in all admin API requests
   Header: Authorization: Bearer <token>
```

## 📊 Data Flow Example: Creating an Order

```
1. Frontend: User adds items to cart
2. Frontend: User clicks "Checkout"
3. Frontend: Collects shipping/payment info
4. Frontend: POST /api/orders with order data + auth token
5. Backend: Validates token
6. Backend: Validates order data
7. Backend: Creates order in database
8. Backend: Creates order_items in database
9. Backend: Creates payment record
10. Backend: Returns order details
11. Frontend: Displays order confirmation
12. Frontend: Stores order ID for tracking
```

## 🔧 Error Handling

### Frontend Error Handling

```javascript
async function fetchWithErrorHandling(url, options) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
        
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        // Show user-friendly error message
        showNotification(error.message, 'error');
        throw error;
    }
}
```

### Admin Error Handling

```javascript
async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
        window.location.href = '/login.html';
        throw new Error('No authentication token');
    }
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('adminToken');
            window.location.href = '/login.html';
            throw new Error('Unauthorized');
        }
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
        
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
```

## ✅ Testing API Connections

### Test Backend Health

```bash
curl https://backend-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-02-12T21:45:00.000Z"
}
```

### Test CORS from Browser Console

```javascript
// In frontend console:
fetch('https://backend-name.onrender.com/api/products')
    .then(r => r.json())
    .then(console.log)
    .catch(console.error);

// Should return products if CORS is configured correctly
// Should show CORS error if not configured
```

### Test Authentication

```javascript
// Test admin login
fetch('https://backend-name.onrender.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'admin@premiumhairsa.co.za',
        password: 'your_password'
    })
})
.then(r => r.json())
.then(console.log);

// Should return { token, admin } if credentials correct
```

## 📝 Summary

- **Frontend → Backend**: Uses Fetch API for all data operations
- **Admin → Backend**: Uses Fetch API with JWT authentication
- **Backend**: Validates CORS origins, authenticates requests, serves data
- **All communication**: HTTPS with JSON payloads
- **Security**: JWT tokens, CORS restrictions, rate limiting

---

**For more details, see:**
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [SEPARATION_SUMMARY.md](./SEPARATION_SUMMARY.md)
- Component READMEs in each directory
