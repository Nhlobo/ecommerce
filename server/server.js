/**
 * Main Server File
 * Premium Hair Wigs & Extensions Admin Dashboard
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import middleware
const { apiLimiter, loginLimiter, checkLoginAttempts } = require('./middleware/rateLimiter');
const { authenticateAdmin } = require('./middleware/auth');
const { validateLogin } = require('./middleware/validator');

// Import controllers
const authController = require('./controllers/authController');

// Import routes
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// =====================================================
// SECURITY MIDDLEWARE
// =====================================================

// Helmet for security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : '*',
    credentials: true
}));

// Request logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// =====================================================
// STATIC FILES
// =====================================================

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// Serve admin dashboard
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// =====================================================
// API ROUTES
// =====================================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Authentication routes
app.post('/api/admin/login', loginLimiter, checkLoginAttempts, validateLogin, authController.login);
app.post('/api/admin/logout', authenticateAdmin, authController.logout);
app.get('/api/admin/me', authenticateAdmin, authController.getCurrentAdmin);
app.post('/api/admin/change-password', authenticateAdmin, authController.changePassword);

// Admin routes (protected)
app.use('/api/admin', authenticateAdmin, adminRoutes);

// =====================================================
// ERROR HANDLING
// =====================================================

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Serve index.html for non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  Premium Hair Wigs & Extensions - Admin Dashboard Server  ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('');
    console.log('📍 URLs:');
    console.log(`   Frontend:  http://localhost:${PORT}`);
    console.log(`   Admin:     http://localhost:${PORT}/admin`);
    console.log(`   API:       http://localhost:${PORT}/api`);
    console.log('');
    console.log('🔒 Security Features:');
    console.log('   ✓ Helmet (Security Headers)');
    console.log('   ✓ Rate Limiting');
    console.log('   ✓ JWT Authentication');
    console.log('   ✓ Brute-force Protection');
    console.log('   ✓ Activity Logging');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n⚠️  SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

module.exports = app;
