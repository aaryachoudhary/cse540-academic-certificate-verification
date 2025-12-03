# 🎓 Academic Certificate Verification System

A fully functional blockchain-based system to **issue, verify, and manage academic certificates** using **Ethereum (Sepolia testnet)** and **IPFS**.

## ✨ Features

- ✅ **Smart Contract**: Fully implemented `CertificateRegistry` contract with Role-Based Access Control (RBAC)
- ✅ **Backend API**: Node.js/Express server for blockchain interactions
- ✅ **Frontend UI**: React + Vite application with role-based dashboards
- ✅ **Blockchain Integration**: Real-time transaction tracking with Etherscan verification
- ✅ **Certificate Lifecycle**: Issue, revoke, update, and verify certificates on-chain

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │  React + Vite + TailwindCSS
│   (Port 5173)   │  Three dashboards: Student, Issuer, Verifier
└────────┬────────┘
         │ HTTP API
┌────────▼────────┐
│   Backend       │  Node.js + Express
│   (Port 3000)   │  RESTful API for certificate operations
└────────┬────────┘
         │ Ethers.js
┌────────▼────────┐
│   Blockchain    │  Ethereum Sepolia Testnet
│   Smart Contract│  CertificateRegistry.sol
└─────────────────┘
```

---

## 📁 Repository Structure

```
├── contracts/
│   ├── CertificateRegistry.sol        # Main smart contract implementation
│   └── interfaces/
│       └── ICertificateRegistry.sol   # Contract interface
├── backend/
│   ├── src/
│   │   ├── app.js                     # Express server
│   │   ├── config/
│   │   │   └── blockchain.js          # Ethers.js configuration
│   │   ├── controllers/
│   │   │   └── certificateController.js
│   │   ├── routes/
│   │   │   └── certificateRoutes.js
│   │   └── services/
│   │       └── certificateService.js  # Blockchain interaction logic
│   └── package.json
├── cert-verification-system-frontend/
│   ├── src/
│   │   ├── App.jsx                    # Main React component
│   │   ├── config/
│   │   │   └── constants.js           # Environment configuration
│   │   └── services/
│   │       └── api.js                 # Backend API client
│   └── package.json
├── scripts/
│   ├── deploy.js                      # Hardhat deployment script
│   └── deployment.sh                  # Deployment automation
├── hardhat.config.js                  # Hardhat configuration
├── package.json                       # Hardhat dependencies
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ (v20.19+ or v22.12+ recommended for Vite compatibility)
- **npm** or **yarn**
- **MetaMask** browser extension
- **Sepolia ETH** (for gas fees) - Get free testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
- **Sepolia RPC URL** from [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/)

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd cse540-academic-certificate-verification

# Install Hardhat dependencies (root)
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd cert-verification-system-frontend
npm install
cd ..
```

### Step 2: Deploy Smart Contract

1. **Create root `.env` file**:
```bash
ETH_PROVIDER_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_with_sepolia_eth
```

2. **Compile the contract**:
```bash
npm run compile
```

3. **Deploy to Sepolia**:
```bash
npm run deploy:sepolia
```

4. **Save the deployed contract address** from the output (you'll need it for backend/frontend config)

### Step 3: Configure Backend

1. **Create `backend/.env` file**:
```env
ETH_PROVIDER_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_with_sepolia_eth
CONTRACT_ADDRESS=0x...your_deployed_contract_address...
CONTRACT_ABI_PATH=../artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json
PORT=3000
```

2. **Start the backend server**:
```bash
cd backend
npm start
```

The backend will listen on `http://localhost:3000`

### Step 4: Configure Frontend

1. **Create `cert-verification-system-frontend/.env` file**:
```env
VITE_API_URL=http://localhost:3000
VITE_CONTRACT_ADDRESS=0x...your_deployed_contract_address...
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

2. **Start the frontend**:
```bash
cd cert-verification-system-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Step 5: Initialize Contract Roles

Before issuing certificates, you need to add an issuer role:

1. Use the deployed contract address on [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Connect with MetaMask (using the admin/deployer wallet)
3. Call `addIssuer(address)` function with your issuer wallet address

Or, if you have the contract ABI, you can call it programmatically.

---

## 🎮 Usage

### Student Dashboard
- View all certificates issued to your wallet address
- See certificate details: course name, grade, issue date, credential hash
- Check revocation status

### Issuer Dashboard
- Issue new certificates with:
  - Student name and wallet address
  - Course name
  - Grade
- Revoke certificates
- View all issued certificates in a table
- Loading indicators during blockchain transactions

### Verifier Dashboard
- Verify certificate authenticity by certificate ID
- View complete certificate details
- Check revocation status
- Verify on-chain data

---

## 📡 API Endpoints

### Backend (Port 3000)

- `POST /api/certificates/issue` - Issue a new certificate
- `POST /api/certificates/:id/revoke` - Revoke a certificate
- `GET /api/certificates/:id` - Get certificate by ID
- `GET /api/certificates/issuer/:address` - Get all certificates by issuer
- `GET /api/certificates/recipient/:address` - Get all certificates by recipient
- `GET /api/certificates/:id/exists` - Check if certificate exists

---

## 🔐 Smart Contract

### `CertificateRegistry.sol`

**Implemented Features:**
- ✅ Issue certificates with IPFS CID and data hash
- ✅ Revoke certificates
- ✅ Update certificate metadata
- ✅ Role-based access control (Admin, Issuer)
- ✅ Query certificates by issuer, recipient, or ID
- ✅ Event emissions for all operations

**Key Functions:**
```solidity
function issueCertificate(
    address recipient,
    string calldata cid,
    bytes32 dataHash,
    string calldata metadata
) external returns (uint256 certificateId);

function revokeCertificate(uint256 certificateId) external;

function getCertificate(uint256 certificateId)
    external view returns (Certificate memory);

function certificatesOfIssuer(address issuer)
    external view returns (uint256[] memory);

function certificatesOfRecipient(address recipient)
    external view returns (uint256[] memory);
```

**Events:**
- `CertificateIssued(uint256 indexed certificateId, address indexed issuer, address indexed recipient, string cid, bytes32 dataHash)`
- `CertificateRevoked(uint256 indexed certificateId, address indexed issuer, uint256 revokedAt)`
- `CertificateUpdated(uint256 indexed certificateId, address indexed issuer, string newCid, bytes32 newDataHash)`

---

## 🔍 Verifying Blockchain Activity

### Transaction Verification

1. **Backend Logs**: When you issue or revoke a certificate, the backend logs will show:
   - Transaction hash
   - Block number
   - Gas used
   - Etherscan link

2. **Etherscan**: Visit the transaction hash link (e.g., `https://sepolia.etherscan.io/tx/0x...`) to see:
   - Transaction status (Success/Failed)
   - Gas fees paid
   - Contract interaction details
   - Events emitted

3. **MetaMask**: Check your wallet's transaction history to see Sepolia ETH deductions for gas fees

---

## 🛠️ Development

### Compile Contracts
```bash
npm run compile
```

### Run Tests (if available)
```bash
npx hardhat test
```

### Deploy to Local Network
```bash
npx hardhat node
npm run deploy:local
```

---

## 📦 Technology Stack

- **Smart Contracts**: Solidity ^0.8.20, OpenZeppelin Contracts
- **Blockchain**: Ethereum Sepolia Testnet
- **Development**: Hardhat
- **Backend**: Node.js, Express, Ethers.js v6
- **Frontend**: React, Vite, TailwindCSS, Axios
- **Crypto**: SHA-256 hashing for certificate integrity

---

## 🔒 Security Features

- **Integrity**: SHA-256 hash verification of certificate data
- **Decentralization**: Immutable records on Ethereum blockchain
- **RBAC**: Admin/Issuer role separation
- **Auditability**: All operations emit events for on-chain audit trail
- **Tamper-proof**: Certificate data stored as immutable on-chain records

---

## 📝 Environment Variables

### Root `.env` (for Hardhat deployment)
```
ETH_PROVIDER_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_here
```

### `backend/.env`
```
ETH_PROVIDER_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=0x...
CONTRACT_ABI_PATH=../artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json
PORT=3000
```

### `cert-verification-system-frontend/.env`
```
VITE_API_URL=http://localhost:3000
VITE_CONTRACT_ADDRESS=0x...
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

---

## 🚧 Future Enhancements

- IPFS integration for PDF certificate storage
- Email notifications for certificate issuance
- QR code generation for quick verification
- Multi-chain support (Polygon, Base)
- NFT representation of certificates
- Decentralized Identity (DID) integration
- Bulk certificate upload
- Advanced search and filtering

---

## 📄 License

MIT — free to use and modify with attribution.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues or questions, please open an issue on the repository.
