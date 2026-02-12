// API Configuration
const config = {
    baseURL: {
        products: 'https://api.premiumhairwigs.com/products',
        auth: 'https://api.premiumhairwigs.com/auth',
        orders: 'https://api.premiumhairwigs.com/orders',
        wishlist: 'https://api.premiumhairwigs.com/wishlist',
        contact: 'https://api.premiumhairwigs.com/contact',
        newsletter: 'https://api.premiumhairwigs.com/newsletter'
    },
    app: {
        currency: 'R',
        VAT_rate: 15,
        shipping_thresholds: {
            free_shipping: 750,
            standard_shipping: 150
        }
    }
};

// Business Information
const businessInfo = {
    name: 'Premium Hair Wigs & Extensions Pty Ltd',
    address: 'Protea Glen, Soweto',
    contact: {
        phone: '+27 11 123 4567',
        email: 'info@premiumhairwigs.com'
    },
    hours: {
        weekdays: '09:00 - 17:00',
        weekends: 'Closed'
    }
};

export { config, businessInfo };