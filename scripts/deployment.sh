#!/bin/bash

# Certificate Registry Deployment Script
# This script helps deploy the contract to Sepolia testnet

echo "🚀 Certificate Registry Deployment"
echo "=================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found in root directory"
    echo "Please create a .env file with:"
    echo "  - ETH_PROVIDER_URL (Sepolia RPC endpoint)"
    echo "  - PRIVATE_KEY (Your wallet private key)"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Compile contracts
echo "🔨 Compiling contracts..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi

# Deploy to Sepolia
echo ""
echo "🌐 Deploying to Sepolia testnet..."
npm run deploy:sepolia

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Copy the contract address from above"
    echo "2. Update backend/.env with CONTRACT_ADDRESS=<address>"
    echo "3. Continue with frontend integration"
else
    echo "❌ Deployment failed!"
    exit 1
fi
