#!/bin/bash

# Quick Start Script for Premium Hair Admin Dashboard
# This script helps quickly set up and start the admin dashboard

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Premium Hair Wigs & Extensions - Admin Dashboard Setup   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js installed: $(node --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL command line tool not found."
    echo "   Make sure PostgreSQL is installed and psql is in your PATH."
    echo "   Visit: https://www.postgresql.org/download/"
fi

echo ""
echo "Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✓ Dependencies installed successfully"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Step 2: Setting up environment variables..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✓ Created .env file from .env.example"
        echo ""
        echo "⚠️  IMPORTANT: Please edit .env file and configure:"
        echo "   - Database credentials (DB_HOST, DB_USER, DB_PASSWORD, etc.)"
        echo "   - JWT_SECRET (generate a strong random string)"
        echo "   - Admin credentials (ADMIN_EMAIL, ADMIN_PASSWORD)"
        echo ""
        echo "Would you like to edit .env now? (y/n)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            ${EDITOR:-nano} .env
        fi
    else
        echo "❌ .env.example file not found"
        exit 1
    fi
else
    echo "✓ .env file already exists"
fi

echo ""
echo "Step 3: Database setup"
echo "Would you like to initialize the database now? (y/n)"
echo "Note: Make sure PostgreSQL is running and you've created the database."
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo "Initializing database..."
    npm run init-db
    
    if [ $? -ne 0 ]; then
        echo "❌ Database initialization failed"
        echo "   Please check your database configuration in .env"
        exit 1
    fi
    
    echo "✓ Database initialized successfully"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                     Setup Complete!                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 To start the server:"
echo "   Development mode:  npm run dev"
echo "   Production mode:   npm start"
echo ""
echo "🔐 Admin Dashboard URL:"
echo "   http://localhost:3000/admin"
echo ""
echo "📚 For detailed documentation, see:"
echo "   - ADMIN_SETUP.md - Complete setup guide"
echo "   - README.md - Project overview"
echo ""
echo "⚠️  SECURITY REMINDERS:"
echo "   1. Change the default admin password after first login"
echo "   2. Generate a strong JWT_SECRET in .env"
echo "   3. Never commit .env file to version control"
echo "   4. Enable HTTPS in production"
echo ""
