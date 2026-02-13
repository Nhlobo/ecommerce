# Repository Migration Guide

## Splitting Monorepo into Separate Repositories

This guide explains how to split the current monorepo into three separate repositories while preserving git history.

## 📋 Overview

**Current Structure (Monorepo)**:
```
Nhlobo/ecommerce
├── backend-ecommerce/
├── frontend-ecommerce/
└── admin-ecommerce/
```

**Target Structure (3 Separate Repos)**:
```
Nhlobo/ecommerce-backend     (Backend API)
Nhlobo/ecommerce-frontend    (Customer Storefront)
Nhlobo/ecommerce-admin       (Admin Dashboard)
```

## ⚠️ Before You Begin

### Prerequisites
- Git 2.23+ installed
- GitHub account with repo creation access
- Backup of current repository
- All changes committed and pushed

### Important Notes
- This process **preserves git history** for each component
- Commits will only show changes relevant to each subdirectory
- GitHub Actions and other workflows may need adjustment
- Update all cross-references between repositories

## 🔧 Step-by-Step Migration

### Step 1: Create New GitHub Repositories

Go to GitHub and create three new repositories:

1. **Backend**: `Nhlobo/ecommerce-backend`
   - Description: "Backend API for Premium Hair E-commerce"
   - Private/Public: Choose based on your needs
   - Don't initialize with README (we'll push our own)

2. **Frontend**: `Nhlobo/ecommerce-frontend`
   - Description: "Customer storefront for Premium Hair E-commerce"
   - Private/Public: Choose based on your needs
   - Don't initialize with README

3. **Admin**: `Nhlobo/ecommerce-admin`
   - Description: "Admin dashboard for Premium Hair E-commerce"
   - Private/Public: Choose based on your needs
   - Don't initialize with README

### Step 2: Prepare Your Local Environment

```bash
# Clone the monorepo fresh (or use your existing local copy)
cd ~
git clone https://github.com/Nhlobo/ecommerce.git ecommerce-original
cd ecommerce-original

# Create working directories
mkdir ~/split-repos
```

### Step 3: Extract Backend Repository

#### Option A: Using git filter-repo (Recommended)

```bash
# Install git-filter-repo if not already installed
# On Ubuntu/Debian:
sudo apt install git-filter-repo

# On macOS with Homebrew:
brew install git-filter-repo

# On Windows, download from: https://github.com/newren/git-filter-repo

# Extract backend
cd ~/ecommerce-original
git filter-repo --path backend-ecommerce/ --path-rename backend-ecommerce/:

# Verify the result
git log --oneline
ls -la

# Push to new repository
git remote add origin https://github.com/Nhlobo/ecommerce-backend.git
git branch -M main
git push -u origin main
```

#### Option B: Using git subtree split (Alternative)

```bash
# Extract backend using subtree
cd ~/ecommerce-original
git subtree split --prefix=backend-ecommerce -b backend-split

# Create new repo
cd ~/split-repos
git clone ~/ecommerce-original backend
cd backend
git checkout backend-split
git checkout -b main

# Clean up
git branch -D backend-split

# Move files from backend-ecommerce/ to root
# (if git subtree didn't already do this)
if [ -d "backend-ecommerce" ]; then
  mv backend-ecommerce/* .
  mv backend-ecommerce/.* . 2>/dev/null || true
  rmdir backend-ecommerce
fi

# Commit and push
git add .
git commit -m "Restructure: Move files to repository root"
git remote add origin https://github.com/Nhlobo/ecommerce-backend.git
git push -u origin main
```

### Step 4: Extract Frontend Repository

#### Option A: Using git filter-repo (Recommended)

```bash
# Fresh clone for frontend
cd ~
git clone https://github.com/Nhlobo/ecommerce.git ecommerce-frontend-temp
cd ecommerce-frontend-temp

# Extract frontend
git filter-repo --path frontend-ecommerce/ --path-rename frontend-ecommerce/:

# Push to new repository
git remote add origin https://github.com/Nhlobo/ecommerce-frontend.git
git branch -M main
git push -u origin main
```

#### Option B: Using git subtree split (Alternative)

```bash
cd ~/ecommerce-original
git subtree split --prefix=frontend-ecommerce -b frontend-split

cd ~/split-repos
git clone ~/ecommerce-original frontend
cd frontend
git checkout frontend-split
git checkout -b main
git branch -D frontend-split

# Move files to root if needed
if [ -d "frontend-ecommerce" ]; then
  mv frontend-ecommerce/* .
  mv frontend-ecommerce/.* . 2>/dev/null || true
  rmdir frontend-ecommerce
fi

git add .
git commit -m "Restructure: Move files to repository root"
git remote add origin https://github.com/Nhlobo/ecommerce-frontend.git
git push -u origin main
```

### Step 5: Extract Admin Repository

#### Option A: Using git filter-repo (Recommended)

```bash
# Fresh clone for admin
cd ~
git clone https://github.com/Nhlobo/ecommerce.git ecommerce-admin-temp
cd ecommerce-admin-temp

# Extract admin
git filter-repo --path admin-ecommerce/ --path-rename admin-ecommerce/:

# Push to new repository
git remote add origin https://github.com/Nhlobo/ecommerce-admin.git
git branch -M main
git push -u origin main
```

#### Option B: Using git subtree split (Alternative)

```bash
cd ~/ecommerce-original
git subtree split --prefix=admin-ecommerce -b admin-split

cd ~/split-repos
git clone ~/ecommerce-original admin
cd admin
git checkout admin-split
git checkout -b main
git branch -D admin-split

# Move files to root if needed
if [ -d "admin-ecommerce" ]; then
  mv admin-ecommerce/* .
  mv admin-ecommerce/.* . 2>/dev/null || true
  rmdir admin-ecommerce
fi

git add .
git commit -m "Restructure: Move files to repository root"
git remote add origin https://github.com/Nhlobo/ecommerce-admin.git
git push -u origin main
```

### Step 6: Update Configuration in Each Repository

#### Backend (ecommerce-backend)

```bash
cd ~/split-repos/backend  # or wherever your backend repo is

# Update .env.example
# Add FRONTEND_URL and ADMIN_URL for production

# Update CORS configuration in server.js if needed
# Ensure FRONTEND_URL and ADMIN_URL are used

# Update package.json repository URL
# Update README.md to reflect standalone deployment

git add .
git commit -m "Update configuration for standalone deployment"
git push
```

**Update `server.js` CORS settings**:
```javascript
// Remove static file serving for frontend and admin
// Keep only API routes

// Remove these lines:
// app.use(express.static(path.join(__dirname, '../frontend-ecommerce')));
// app.use('/admin', express.static(path.join(__dirname, '../admin-ecommerce')));

// Remove catch-all route that serves index.html
// Keep only API routes
```

#### Frontend (ecommerce-frontend)

```bash
cd ~/split-repos/frontend  # or wherever your frontend repo is

# Update js/config.js with production API URL
# Update README.md with standalone deployment instructions

# Example config.js update:
cat > js/config.js << 'EOF'
const API_CONFIG = {
    BASE_URL: process.env.VITE_API_BASE_URL || 'https://premium-hair-backend.onrender.com/api',
    // ... other config
};
EOF

git add .
git commit -m "Update configuration for standalone deployment"
git push
```

#### Admin Dashboard (ecommerce-admin)

```bash
cd ~/split-repos/admin  # or wherever your admin repo is

# Update js/config.js with production API URL
# Update README.md with standalone deployment instructions
# Update server.js if you want to serve admin separately

git add .
git commit -m "Update configuration for standalone deployment"
git push
```

### Step 7: Update Deployment Configuration

#### Backend Deployment (Render)

Create `render.yaml` in backend repo:

```yaml
services:
  - type: web
    name: premium-hair-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: premium-hair-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: FRONTEND_URL
        value: https://nhlobo.github.io/ecommerce-frontend
      - key: ADMIN_URL
        value: https://premium-hair-admin.onrender.com

databases:
  - name: premium-hair-db
    plan: starter
```

#### Frontend Deployment (GitHub Pages)

Create `.github/workflows/deploy.yml` in frontend repo:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

Then enable GitHub Pages in repository settings.

#### Admin Deployment (Render Static Site or Separate Server)

Option 1: Deploy as static site on Render
Option 2: Deploy with its own Express server on Render

### Step 8: Update Original Monorepo

You can either:

**Option A: Archive the monorepo**
```bash
# Add notice to README
cd ~/ecommerce-original
cat > MOVED.md << 'EOF'
# Repository Moved

This monorepo has been split into three separate repositories:

- Backend API: https://github.com/Nhlobo/ecommerce-backend
- Frontend: https://github.com/Nhlobo/ecommerce-frontend  
- Admin Dashboard: https://github.com/Nhlobo/ecommerce-admin

Please use the individual repositories for development.
EOF

git add MOVED.md
git commit -m "Add migration notice"
git push

# Archive on GitHub (Settings → Archive this repository)
```

**Option B: Convert to documentation hub**
```bash
# Keep the repo but remove code, add links to new repos
# Use it as a central documentation and architecture overview
```

## 🔄 Post-Migration Tasks

### 1. Update CI/CD Pipelines
- Set up GitHub Actions for each repository
- Configure deployment pipelines
- Update environment variables in CI

### 2. Update Dependencies
Each repo now needs its own dependency management:

```bash
# Backend
cd backend && npm install && npm audit fix

# Frontend  
cd frontend && npm install

# Admin
cd admin && npm install
```

### 3. Update Cross-Repository References

- Update API URLs in frontend config
- Update API URLs in admin config
- Update CORS origins in backend
- Update documentation links

### 4. Test Everything

```bash
# Backend
cd backend
npm install
npm run init-db
npm start
# Test: curl http://localhost:3000/api/health

# Frontend
cd frontend
npm install
npm run serve
# Test: Open http://localhost:8000

# Admin
cd admin
npm install
npm start
# Test: Open http://localhost:8001
```

### 5. Update Documentation

- Update README files in each repo
- Update API documentation
- Update deployment guides
- Document new repository structure

### 6. Deploy to Production

Deploy in this order:
1. Database (PostgreSQL)
2. Backend API
3. Frontend
4. Admin Dashboard

## 🔒 Security Checklist After Migration

- [ ] Update CORS origins in backend
- [ ] Rotate JWT secrets
- [ ] Update API keys and credentials
- [ ] Review access controls
- [ ] Update firewall rules
- [ ] Test authentication flows
- [ ] Review environment variables
- [ ] Enable branch protection rules
- [ ] Set up security scanning (Dependabot, CodeQL)

## 📊 Verification Checklist

- [ ] All three repositories created on GitHub
- [ ] Git history preserved in each repo
- [ ] Files at correct paths (root level, not in subdirectories)
- [ ] Configuration files updated with new URLs
- [ ] Dependencies installed in each repo
- [ ] Backend API starts successfully
- [ ] Frontend serves and connects to backend
- [ ] Admin dashboard serves and connects to backend
- [ ] All API endpoints working
- [ ] Authentication working across frontend and admin
- [ ] Database migrations run successfully
- [ ] CI/CD pipelines configured
- [ ] Documentation updated
- [ ] Original monorepo archived or marked as deprecated

## 🆘 Troubleshooting

### Issue: "Files still in subdirectories after split"

```bash
# Manually move files to root
mv subdir/* .
mv subdir/.* . 2>/dev/null || true
rmdir subdir
git add .
git commit -m "Move files to repository root"
```

### Issue: "Lost git history after split"

Make sure you used `--path-rename` with git-filter-repo or properly extracted with git subtree split.

### Issue: "CORS errors after migration"

Update backend CORS configuration:
```javascript
const allowedOrigins = [
  'https://nhlobo.github.io',  // Frontend on GitHub Pages
  'https://premium-hair-admin.onrender.com'  // Admin on Render
];
```

### Issue: "API not connecting"

Update API URLs in:
- `frontend/js/config.js`
- `admin/js/config.js`

## 📚 Additional Resources

- [Git Filter-Repo Documentation](https://github.com/newren/git-filter-repo)
- [Git Subtree Split Guide](https://docs.github.com/en/get-started/using-git/splitting-a-subfolder-out-into-a-new-repository)
- [Render Deployment Guide](https://render.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 💬 Support

If you encounter issues during migration:
- Review the troubleshooting section above
- Check git logs for any anomalies
- Consult team members familiar with the codebase
- Email: support@premiumhairsa.co.za

---

**Migration Guide Version 1.0**  
Last Updated: February 2026
