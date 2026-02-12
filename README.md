# Premium Hair Wigs & Extensions E-commerce Platform

A complete, production-ready frontend for a premium hair wigs and extensions e-commerce platform. Built with vanilla JavaScript, CSS, and HTML for optimal performance and simplicity.

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

### Customer Features
- 🛍️ **Product Catalog** - Browse wigs, extensions, and accessories
- 🔍 **Search & Filter** - Find products by category and search terms
- 🛒 **Shopping Cart** - Add, update, and remove items
- ❤️ **Wishlist** - Save favorite products for later
- 💳 **Secure Checkout** - PayFast integration with multiple payment options
- 📦 **Order Tracking** - Track your orders in real-time
- 👤 **User Accounts** - Register, login, and manage your profile
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔔 **Notifications** - Real-time feedback for all actions

### Business Features
- 💰 **Pricing with VAT** - Automatic 15% VAT calculation
- 🚚 **Smart Shipping** - Free shipping on orders above R1,500
- ⏰ **Flash Sales** - Countdown timer for limited-time offers
- 📧 **Newsletter** - Email subscription for updates and promotions
- 📞 **Contact Form** - Direct communication channel
- 🔒 **Data Protection** - POPIA compliant data handling

## 📁 Project Structure

```
ecommerce/
├── index.html              # Main HTML file with all pages and modals
├── styles.css              # Complete stylesheet with responsive design
├── js/
│   ├── config.js          # Configuration (API endpoints, business info)
│   ├── api.js             # API service layer
│   └── app.js             # Main application logic
├── README.md              # Project documentation (this file)
└── .gitignore             # Git ignore rules
```

## 🛠️ Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for testing)
- Text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nhlobo/ecommerce.git
   cd ecommerce
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js
     npx serve
     
     # PHP
     php -S localhost:8000
     ```

3. **Access the application**
   - Direct file: `file:///path/to/ecommerce/index.html`
   - Local server: `http://localhost:8000`

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
