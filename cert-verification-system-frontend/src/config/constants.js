// Frontend Configuration Constants

export const CONFIG = {
  // Backend API URL
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Smart Contract Configuration
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS || '0x8B5276fEBFA31F42DF40618f9CF989a5555c04Ee',
  
  // Sepolia Chain ID
  CHAIN_ID: parseInt(import.meta.env.VITE_CHAIN_ID || '11155111', 10),
  
  // RPC URL (optional, for direct contract reads)
  RPC_URL: import.meta.env.VITE_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/GyGWL4pLpvwFJi0ctPc8P',
};

export default CONFIG;

