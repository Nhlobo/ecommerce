# Premium Hair Wigs & Extensions - Deployment Guide

This guide explains how to deploy the separated ecommerce application to different hosting services.

## 📋 Architecture Overview

The application is now separated into three components:

```
ecommerce/
├── frontend-ecommerce/     → Deploy to GitHub Pages
├── backend-ecommerce/      → Deploy to Render (with PostgreSQL)
└── admin-ecommerce/        → Deploy to Render
```

### Component Connections

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [Frontend - GitHub Pages]                                   │
│  Customer-facing storefront                                  │
│  https://username.github.io/ecommerce-frontend               │
│                                                               │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ Fetch API
                       ├──────────────────────────────────────┐
                       ▼                                      ▼
┌──────────────────────────────────────────┐   ┌──────────────────────────────────────┐
│                                          │   │                                      │
│  [Backend API - Render]                  │◄──│  [Admin Dashboard - Render]          │
│  Express + PostgreSQL                    │   │  Admin management interface          │
│  https://backend.onrender.com            │   │  https://admin.onrender.com          │
│                                          │   │                                      │
│  ┌────────────────────────────────────┐ │   └──────────────────────────────────────┘
│  │  PostgreSQL Database - Render      │ │
│  │  Customer data, orders, products   │ │
│  └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

## 🚀 Deployment Steps

### Step 1: Prepare Separate Repositories

You need to create three separate GitHub repositories:

#### 1.1 Frontend Repository

```bash
cd frontend-ecommerce
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-frontend.git
git push -u origin main
```

#### 1.2 Backend Repository

```bash
cd backend-ecommerce
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-backend.git
git push -u origin main
```

#### 1.3 Admin Repository

```bash
cd admin-ecommerce
git init
git add .
git commit -m "Initial admin dashboard commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-admin.git
git push -u origin main
```

### Step 2: Deploy Backend + Database to Render

Follow these steps in order:

#### 2.1 Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `premium-hair-db`
   - **Database**: `premium_hair_ecommerce`
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: 15 or 16
   - **Plan**: Free or paid plan
4. Click **"Create Database"**
5. **Save these credentials** (you'll need them):
   - Internal Database URL
   - External Database URL (for testing)
   - Username
   - Password
   - Host
   - Port

#### 2.2 Deploy Backend API

1. Click **"New +"** → **"Web Service"**
2. Connect your `ecommerce-backend` repository
3. Configure:
   - **Name**: `premium-hair-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or paid plan

4. **Add Environment Variables** (click "Advanced"):

```env
NODE_ENV=production
PORT=10000

# Database - Use Internal Database URL from Step 2.1
DATABASE_URL=postgresql://user:password@host:5432/database

# OR configure individually:
DB_HOST=dpg-xxxxxxxxxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=premium_hair_ecommerce
DB_USER=premium_hair_admin
DB_PASSWORD=your_secure_password

# JWT Secret - Generate a strong random string
JWT_SECRET=your_very_secure_random_jwt_secret_32_chars_minimum
JWT_EXPIRES_IN=24h

# Admin Account - Change these!
ADMIN_EMAIL=admin@premiumhairsa.co.za
ADMIN_PASSWORD=ChangeThisStrongPassword123!

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOGIN_RATE_LIMIT_MAX=5
BCRYPT_ROUNDS=12

# CORS Origins - Will be updated after deploying frontend and admin
FRONTEND_URL=https://YOUR_USERNAME.github.io/ecommerce-frontend
ADMIN_URL=https://premium-hair-admin.onrender.com

# Business
COMPANY_NAME=Premium Hair Wigs & Extensions Pty (Ltd)
SUPPORT_EMAIL=support@premiumhairsa.co.za
VAT_RATE=0.15

# PayFast (Optional - for payment processing)
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASSPHRASE=your_passphrase
PAYFAST_URL=https://www.payfast.co.za/eng/process
```

5. Click **"Create Web Service"**
6. Wait for deployment to complete

#### 2.3 Initialize Database

After backend is deployed:

1. Go to your backend web service in Render
2. Click **"Shell"** tab
3. Run: `npm run init-db`
4. Verify tables are created successfully

### Step 3: Deploy Admin Dashboard to Render

1. Click **"New +"** → **"Web Service"**
2. Connect your `ecommerce-admin` repository
3. Configure:
   - **Name**: `premium-hair-admin`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or paid plan

4. **Add Environment Variables**:

```env
NODE_ENV=production
PORT=10000
BACKEND_URL=https://premium-hair-backend.onrender.com
```

5. Click **"Create Web Service"**
6. Your admin will be at: `https://premium-hair-admin.onrender.com`

#### 3.1 Update Admin Configuration

After deployment, update the backend URL in admin:

Edit `admin-ecommerce/js/config.js`:
```javascript
const ADMIN_CONFIG = {
    API_BASE_URL: 'https://premium-hair-backend.onrender.com',
    // ... rest of config
};
```

Commit and push changes - Render will auto-deploy.

### Step 4: Deploy Frontend to GitHub Pages

#### 4.1 Update Frontend Configuration

Before deploying, update the backend URL in frontend:

Edit `frontend-ecommerce/js/config.js`:
```javascript
const getBackendUrl = () => {
    // ... existing code ...
    
    // For production, use your deployed backend URL
    return 'https://premium-hair-backend.onrender.com';
};
```

Commit and push changes.

#### 4.2 Enable GitHub Pages

1. Go to your `ecommerce-frontend` repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **"Save"**
5. Your site will be at: `https://YOUR_USERNAME.github.io/ecommerce-frontend/`

Wait 2-5 minutes for deployment.

### Step 5: Update CORS Configuration

After all deployments are complete, update backend CORS:

#### 5.1 Update Backend Environment Variables

In Render backend dashboard, update these environment variables:

```env
FRONTEND_URL=https://YOUR_USERNAME.github.io/ecommerce-frontend
ADMIN_URL=https://premium-hair-admin.onrender.com
```

#### 5.2 Restart Backend Service

After updating environment variables, Render will automatically restart the backend.

### Step 6: Test Everything

#### 6.1 Test Backend

Visit: `https://premium-hair-backend.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-..."
}
```

#### 6.2 Test Admin Dashboard

1. Visit: `https://premium-hair-admin.onrender.com`
2. Login with admin credentials
3. Verify all panels load correctly
4. Check dashboard metrics
5. Test creating/editing a product

#### 6.3 Test Frontend

1. Visit: `https://YOUR_USERNAME.github.io/ecommerce-frontend/`
2. Browse products
3. Test search functionality
4. Test adding items to cart
5. Test wishlist
6. Verify all images load

#### 6.4 Test API Connections

Open browser console (F12) and check:
- No CORS errors
- API requests succeed
- Data loads properly

## 🔧 Configuration Summary

### URLs After Deployment

| Component | URL | Configuration File |
|-----------|-----|-------------------|
| Frontend | `https://YOUR_USERNAME.github.io/ecommerce-frontend/` | `js/config.js` |
| Backend API | `https://premium-hair-backend.onrender.com` | `.env` |
| Admin Dashboard | `https://premium-hair-admin.onrender.com` | `js/config.js` |
| Database | Internal Render URL | Backend `.env` |

### Environment Variables Checklist

Backend `.env`:
- [ ] `DATABASE_URL` or `DB_*` credentials
- [ ] `JWT_SECRET` (strong random string)
- [ ] `ADMIN_EMAIL` and `ADMIN_PASSWORD` (changed from default)
- [ ] `FRONTEND_URL` (GitHub Pages URL)
- [ ] `ADMIN_URL` (Render admin URL)
- [ ] `NODE_ENV=production`

Frontend `js/config.js`:
- [ ] `BACKEND_URL` points to Render backend

Admin `js/config.js`:
- [ ] `API_BASE_URL` points to Render backend

## 🔐 Security Post-Deployment

1. **Change Admin Password**:
   - Login to admin dashboard
   - Change password immediately
   - Update backend `.env` accordingly

2. **Secure Database**:
   - Use strong database password
   - Keep credentials secure
   - Enable regular backups

3. **Monitor Logs**:
   - Check Render logs regularly
   - Monitor for errors
   - Review security events

4. **Keep Updated**:
   - Update dependencies regularly
   - Monitor security advisories
   - Apply patches promptly

## 📝 Maintenance

### Updating Backend

```bash
# Make changes
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys
```

### Updating Frontend

```bash
# Make changes
git add .
git commit -m "Update frontend"
git push origin main
# GitHub Pages auto-deploys
```

### Updating Admin

```bash
# Make changes
git add .
git commit -m "Update admin"
git push origin main
# Render auto-deploys
```

### Database Backups

Render provides automatic backups for paid plans. For manual backup:

```bash
# In Render Shell
pg_dump $DATABASE_URL > backup.sql
```

## ⚠️ Free Tier Limitations

**Render Free Tier**:
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30+ seconds
- 750 hours/month included
- Database has storage limits

**GitHub Pages**:
- 100GB bandwidth/month
- 1GB storage
- Public repositories only (free tier)

**Recommendations**:
- Use paid plans for production
- Free tier is good for testing/development
- Consider upgrading before launch

## 🆘 Troubleshooting

### CORS Errors

**Problem**: `Access-Control-Allow-Origin` errors

**Solution**:
1. Check backend CORS configuration
2. Verify `FRONTEND_URL` and `ADMIN_URL` in backend `.env`
3. Ensure URLs match exactly (no trailing slashes unless in .env)
4. Restart backend service

### Database Connection Failed

**Problem**: Backend can't connect to database

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check database is running in Render
3. Ensure database and backend in same region
4. Test connection in Render Shell: `psql $DATABASE_URL`

### Admin Can't Login

**Problem**: Admin authentication fails

**Solution**:
1. Verify backend is running
2. Check `API_BASE_URL` in admin config.js
3. Verify admin credentials in backend `.env`
4. Check browser console for errors
5. Test backend login endpoint directly

### Frontend Not Loading Data

**Problem**: Products/data not displaying

**Solution**:
1. Check backend URL in frontend config.js
2. Verify backend is running
3. Check browser console for errors
4. Test API endpoints directly
5. Verify CORS is configured

### Service Spinning Down (Free Tier)

**Problem**: First request very slow

**Solution**:
- This is normal for Render free tier
- Upgrade to paid plan for always-on service
- Or use a ping service to keep it alive

## 📞 Support

For deployment issues:
- **Render Support**: https://render.com/docs
- **GitHub Pages**: https://docs.github.com/en/pages
- **Application Support**: support@premiumhairsa.co.za

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express.js Documentation](https://expressjs.com/)

---

**Deployment Date**: _______________  
**Deployed By**: _______________  
**Verified By**: _______________  

✅ All services deployed and tested successfully!
