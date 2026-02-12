/**
 * Configuration for Premium Hair Wigs & Extensions E-commerce Platform
 */

// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://api.premiumhairsa.co.za',
    ENDPOINTS: {
        // Products
        products: 'https://api.premiumhairsa.co.za/api/products',
        productById: (id) => `https://api.premiumhairsa.co.za/api/products/${id}`,
        productsByCategory: (category) => `https://api.premiumhairsa.co.za/api/products?category=${category}`,
        searchProducts: (query) => `https://api.premiumhairsa.co.za/api/products/search?q=${query}`,
        
        // Authentication
        register: 'https://api.premiumhairsa.co.za/api/auth/register',
        login: 'https://api.premiumhairsa.co.za/api/auth/login',
        logout: 'https://api.premiumhairsa.co.za/api/auth/logout',
        user: 'https://api.premiumhairsa.co.za/api/auth/user',
        
        // Orders
        orders: 'https://api.premiumhairsa.co.za/api/orders',
        orderById: (id) => `https://api.premiumhairsa.co.za/api/orders/${id}`,
        trackOrder: (orderNumber) => `https://api.premiumhairsa.co.za/api/orders/track/${orderNumber}`,
        
        // Wishlist
        wishlist: 'https://api.premiumhairsa.co.za/api/wishlist',
        wishlistItem: (id) => `https://api.premiumhairsa.co.za/api/wishlist/${id}`,
        
        // Contact & Newsletter
        contact: 'https://api.premiumhairsa.co.za/api/contact',
        newsletter: 'https://api.premiumhairsa.co.za/api/newsletter'
    }
};

// Application Configuration
const APP_CONFIG = {
    currency: 'R',
    currencySymbol: 'R',
    VAT_RATE: 0.15, // 15% VAT
    SHIPPING: {
        FREE_THRESHOLD: 1500, // Free shipping on orders above R1,500
        STANDARD_COST: 150,
        EXPRESS_COST: 250
    },
    DELIVERY_DAYS: {
        STANDARD: '2-5 business days',
        EXPRESS: '1-2 business days'
    },
    RETURN_POLICY_DAYS: 7,
    PAYMENT_METHODS: ['PayFast', 'Credit Card', 'Debit Card', 'EFT']
};

// Business Information
const BUSINESS_INFO = {
    companyName: 'Premium Hair Wigs & Extensions Pty (Ltd)',
    tradingName: 'Premium Hair Wigs & Extensions',
    registrationNumber: 'CIPC Registered',
    vatNumber: 'VAT Registered',
    address: {
        street: '123 Luxury Lane',
        suburb: 'Protea Glen',
        city: 'Soweto',
        province: 'Johannesburg, Gauteng',
        postalCode: '1818',
        country: 'South Africa',
        full: '123 Luxury Lane, Protea Glen, Soweto, Johannesburg, Gauteng, 1818'
    },
    contact: {
        phone: '+27 71 555 1234',
        email: 'info@premiumhairsa.co.za',
        supportEmail: 'support@premiumhairsa.co.za',
        salesEmail: 'sales@premiumhairsa.co.za'
    },
    hours: {
        weekdays: 'Monday - Friday: 09:00 - 18:00',
        saturday: 'Saturday: 09:00 - 14:00',
        sunday: 'Sunday: Closed',
        publicHolidays: 'Public Holidays: Closed'
    },
    social: {
        facebook: 'https://facebook.com/premiumhairsa',
        instagram: 'https://instagram.com/premiumhairsa',
        twitter: 'https://twitter.com/premiumhairsa',
        whatsapp: 'https://wa.me/27715551234'
    },
    legal: {
        popiaCompliant: true,
        terms: '/terms-and-conditions',
        privacy: '/privacy-policy',
        returns: '/returns-policy'
    }
};

// Export configurations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, APP_CONFIG, BUSINESS_INFO };
}