# Quick Start Guide - Separated Repository Deployment

This guide will help you quickly deploy the separated ecommerce application.

## 📋 Prerequisites

Before you begin, make sure you have:

- [ ] GitHub account
- [ ] Render account (https://render.com - free tier available)
- [ ] Git installed locally
- [ ] Node.js 14+ installed (for local testing)
- [ ] PostgreSQL installed (for local testing) or Render PostgreSQL

## 🚀 Deployment Steps (30 minutes)

### Step 1: Create Three GitHub Repositories (5 min)

Create three new **empty** repositories on GitHub:

1. `ecommerce-frontend`
2. `ecommerce-backend`
3. `ecommerce-admin`

**Don't initialize with README, .gitignore, or license - keep them empty!**

### Step 2: Push Frontend (2 min)

```bash
cd frontend-ecommerce

git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-frontend.git
git push -u origin main
```

✅ Frontend repository is ready!

### Step 3: Push Backend (2 min)

```bash
cd ../backend-ecommerce

git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-backend.git
git push -u origin main
```

✅ Backend repository is ready!

### Step 4: Push Admin (2 min)

```bash
cd ../admin-ecommerce

git init
git add .
git commit -m "Initial admin commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-admin.git
git push -u origin main
```

✅ Admin repository is ready!

### Step 5: Deploy Database on Render (3 min)

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - Name: `premium-hair-db`
   - Database: `premium_hair_ecommerce`
   - Region: Choose closest
   - Plan: Free
4. Click **"Create Database"**
5. **SAVE THESE** (you'll need them):
   - Internal Database URL (starts with `postgresql://`)
   - Username
   - Password

✅ Database is provisioning (takes 2-3 minutes)

### Step 6: Deploy Backend on Render (5 min)

1. Click **"New +"** → **"Web Service"**
2. Click **"Connect account"** if needed, select GitHub
3. Find and select `ecommerce-backend` repository
4. Fill in:
   - **Name**: `premium-hair-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Click **"Advanced"** and add environment variables:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=<paste_internal_database_url_from_step5>
JWT_SECRET=MySecureRandomJWTSecret123456789012345
ADMIN_EMAIL=admin@premiumhairsa.co.za
ADMIN_PASSWORD=ChangeThisPassword123!
FRONTEND_URL=will_update_later
ADMIN_URL=will_update_later
VAT_RATE=0.15
```

6. Click **"Create Web Service"**
7. **SAVE THIS URL**: `https://premium-hair-backend.onrender.com`

✅ Backend is deploying (takes 3-5 minutes)

### Step 7: Initialize Database (2 min)

Wait for backend deployment to complete, then:

1. Go to your backend service in Render
2. Click **"Shell"** tab (top right)
3. Wait for shell to connect
4. Run: `npm run init-db`
5. You should see: ✅ Database initialized successfully!

✅ Database is initialized with all tables!

### Step 8: Deploy Admin on Render (5 min)

1. Click **"New +"** → **"Web Service"**
2. Select `ecommerce-admin` repository
3. Fill in:
   - **Name**: `premium-hair-admin`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. Click **"Advanced"** and add environment variables:

```env
NODE_ENV=production
PORT=10000
BACKEND_URL=https://premium-hair-backend.onrender.com
```

5. Click **"Create Web Service"**
6. **SAVE THIS URL**: `https://premium-hair-admin.onrender.com`

✅ Admin is deploying (takes 2-3 minutes)

### Step 9: Update Admin Configuration (3 min)

Update admin to use the correct backend URL:

```bash
cd admin-ecommerce

# Edit js/config.js
# Change the API_BASE_URL production value to your backend URL:
# API_BASE_URL: 'https://premium-hair-backend.onrender.com'
```

Then push the change:

```bash
git add js/config.js
git commit -m "Update backend URL"
git push origin main
```

Render will automatically redeploy admin.

### Step 10: Deploy Frontend on GitHub Pages (3 min)

#### 10.1 Update Frontend Configuration

```bash
cd frontend-ecommerce

# Edit js/config.js
# Update the production return value to your backend URL:
# return 'https://premium-hair-backend.onrender.com';
```

Push the change:

```bash
git add js/config.js
git commit -m "Update backend URL"
git push origin main
```

#### 10.2 Enable GitHub Pages

1. Go to your `ecommerce-frontend` repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **"Save"**
5. Wait 2-3 minutes
6. Your site will be at: `https://YOUR_USERNAME.github.io/ecommerce-frontend/`

✅ Frontend is live!

### Step 11: Update CORS Configuration (2 min)

Now update backend to allow requests from frontend and admin:

1. Go to Render Dashboard → Backend Service
2. Click **"Environment"** tab
3. Edit these variables:

```env
FRONTEND_URL=https://YOUR_USERNAME.github.io/ecommerce-frontend
ADMIN_URL=https://premium-hair-admin.onrender.com
```

4. Click **"Save Changes"**
5. Backend will automatically restart

✅ CORS configured!

## 🎉 Done! Test Your Deployment

### Test Backend
Visit: `https://premium-hair-backend.onrender.com/api/health`

Should see: `{"status":"ok"}`

### Test Admin
1. Visit: `https://premium-hair-admin.onrender.com`
2. Login:
   - Email: `admin@premiumhairsa.co.za`
   - Password: `ChangeThisPassword123!`
3. ✅ Should see admin dashboard

### Test Frontend
1. Visit: `https://YOUR_USERNAME.github.io/ecommerce-frontend/`
2. ✅ Should see storefront with products loading

## 📝 Your Deployment URLs

Write these down:

| Component | URL |
|-----------|-----|
| Frontend | `https://YOUR_USERNAME.github.io/ecommerce-frontend/` |
| Backend | `https://premium-hair-backend.onrender.com` |
| Admin | `https://premium-hair-admin.onrender.com` |
| Database | Internal Render URL (in backend env vars) |

## 🔐 Important Security Steps

### 1. Change Admin Password (IMMEDIATELY!)

After first login to admin:
1. Go to admin dashboard
2. Change the default password
3. Update `ADMIN_PASSWORD` in backend environment variables

### 2. Use Strong JWT Secret

Generate a strong JWT secret:

```bash
# On Linux/Mac
openssl rand -base64 32

# Or use an online generator
# https://randomkeygen.com/
```

Update `JWT_SECRET` in backend environment variables.

### 3. Secure Database Password

If you created database manually, ensure it has a strong password.

## ⚠️ Free Tier Limitations

**Render Free Tier**:
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30+ seconds (cold start)
- This is NORMAL behavior

**Solutions**:
- Upgrade to paid plan ($7/month) for always-on
- Or use a ping service to keep it alive
- Or accept cold starts for development/testing

**GitHub Pages**:
- No limitations for public repos
- 100GB bandwidth/month
- 1GB storage

## 🆘 Troubleshooting

### Backend won't start
- Check logs in Render Dashboard
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

### Admin can't connect to backend
- Verify backend URL in admin config.js
- Check backend is running (visit /api/health)
- Check CORS configuration in backend

### Frontend not loading data
- Verify backend URL in frontend config.js
- Check browser console for errors
- Ensure CORS is configured correctly

### CORS errors
- Update FRONTEND_URL and ADMIN_URL in backend
- Restart backend service
- Clear browser cache

## 📞 Need Help?

- 📖 Full docs: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- 📧 Email: support@premiumhairsa.co.za
- 📚 Render docs: https://render.com/docs

## ✅ Checklist

- [ ] Three GitHub repositories created and pushed
- [ ] Database deployed on Render
- [ ] Backend deployed on Render
- [ ] Database initialized with `npm run init-db`
- [ ] Admin deployed on Render
- [ ] Frontend deployed on GitHub Pages
- [ ] Admin config updated with backend URL
- [ ] Frontend config updated with backend URL
- [ ] Backend CORS updated with frontend and admin URLs
- [ ] Tested all three services
- [ ] Changed default admin password
- [ ] Saved all URLs and credentials securely

---

**Congratulations! 🎉 Your ecommerce platform is now live!**

Next steps:
- Customize branding and colors
- Add your products
- Test the complete checkout flow
- Set up PayFast for payments
- Monitor logs and performance
