# Premium Hair Wigs & Extensions - Frontend

This is the customer-facing storefront for Premium Hair Wigs & Extensions e-commerce platform.

## 🚀 Features

- Product catalog with search and filters
- Shopping cart functionality
- User authentication and profiles
- Wishlist management
- Responsive design for all devices
- Integration with backend API

## 📁 Structure

```
frontend-ecommerce/
├── index.html          # Main storefront page
├── styles.css          # Storefront styles
├── assets/             # Images and static assets
└── js/
    ├── config.js       # API configuration
    ├── api.js          # API service layer
    └── app.js          # Main application logic
```

## 🔧 Configuration

Before deploying, update the API endpoints in `js/config.js`:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-backend-url.onrender.com',
    // ... other endpoints
};
```

## 🌐 Deployment to GitHub Pages

### Option 1: Via GitHub Settings (Recommended)

1. **Push this frontend folder to a GitHub repository**:
   ```bash
   # Create a new repository on GitHub named "ecommerce-frontend"
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ecommerce-frontend.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "main" branch and "/" (root) folder
   - Click "Save"
   - Your site will be available at: `https://YOUR_USERNAME.github.io/ecommerce-frontend/`

3. **Update API Configuration**:
   - After deploying backend to Render, update `js/config.js` with the backend URL
   - Commit and push the changes

### Option 2: Via GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🔗 Connecting to Backend

Make sure your backend is deployed and update the following in `js/config.js`:

1. **Backend URL**: Set `API_CONFIG.BASE_URL` to your Render backend URL
2. **CORS**: Ensure backend allows requests from your GitHub Pages domain

Example:
```javascript
const API_CONFIG = {
    BASE_URL: 'https://premium-hair-backend.onrender.com',
    ENDPOINTS: {
        products: 'https://premium-hair-backend.onrender.com/api/products',
        // ... other endpoints
    }
};
```

## 📝 Important Notes

- All API calls use the fetch API
- Authentication tokens are stored in localStorage
- The frontend is fully static and can be hosted anywhere
- Make sure backend CORS allows your GitHub Pages domain
- Update all hardcoded URLs to use your actual backend URL

## 🧪 Testing Locally

Simply open `index.html` in a browser or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (install http-server globally)
npx http-server

# VS Code Live Server extension
# Right-click index.html and select "Open with Live Server"
```

Then visit `http://localhost:8000` in your browser.

## 🔐 Security Notes

- Never commit sensitive API keys or credentials
- Use environment variables for API URLs when possible
- Ensure HTTPS is enabled on GitHub Pages (automatic)
- Validate all user inputs before sending to backend

## 📞 Support

For issues or questions, contact: support@premiumhairsa.co.za
