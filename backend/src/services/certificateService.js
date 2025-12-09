const { getContract } = require('../config/blockchain');

async function issueCertificate({ recipient, cid, dataHash, metadata }) {
  try {
    console.log('\n🚀 Issuing certificate on blockchain...');
    console.log('   Recipient:', recipient);
    console.log('   Data Hash:', dataHash);
    console.log('   CID:', cid);
    
    const contract = getContract();
    console.log('   ✅ Contract loaded successfully');
    
    console.log('   📤 Sending transaction to blockchain...');
    const tx = await contract.issueCertificate(recipient, cid, dataHash, metadata || '');
    console.log('   ✅ Transaction sent!');
    console.log('   📝 Transaction Hash:', tx.hash);
    console.log('   ⏳ Waiting for confirmation (this may take 10-30 seconds)...');
    
    const receipt = await tx.wait();
    
    console.log('   ✅ Transaction confirmed!');
    console.log('   📦 Block Number:', receipt.blockNumber);
    console.log('   ⛽ Gas Used:', receipt.gasUsed.toString());
    console.log('   💰 Gas Price:', receipt.gasPrice ? receipt.gasPrice.toString() : 'N/A');
    console.log('   🔗 View on Etherscan: https://sepolia.etherscan.io/tx/' + tx.hash);
    console.log('');

    // Try to extract the emitted certificateId from the CertificateIssued event
    let certificateId = null;
    try {
      if (receipt.logs && Array.isArray(receipt.logs)) {
        for (const log of receipt.logs) {
          try {
            const parsed = contract.interface.parseLog(log);
            if (parsed && parsed.name === 'CertificateIssued') {
              certificateId = parsed.args.certificateId.toString();
              console.log('   🎓 Certificate ID:', certificateId);
              break;
            }
          } catch (e) {
            // ignore logs that don't match this contract's events
          }
        }
      }
    } catch (e) {
      // non-fatal if we can't parse the event; the tx still succeeded
      certificateId = null;
    }

    // Serialize receipt to avoid BigInt serialization issues (frontend doesn't use receipt, but serialize for safety)
    const serializedReceipt = {
      blockNumber: receipt.blockNumber.toString(),
      gasUsed: receipt.gasUsed.toString(),
      gasPrice: receipt.gasPrice ? receipt.gasPrice.toString() : null,
      status: receipt.status,
    };
    
    return { txHash: tx.hash, receipt: serializedReceipt, certificateId };
  } catch (error) {
    console.error('\n❌ ERROR issuing certificate on blockchain:');
    console.error('   Error Type:', error.constructor.name);
    console.error('   Error Message:', error.message);
    console.error('   Error Code:', error.code);
    console.error('   Error Data:', error.data);
    
    // Check for common errors
    if (error.message && error.message.includes('insufficient funds')) {
      console.error('   💡 SOLUTION: Backend wallet needs Sepolia ETH for gas fees!');
    }
    if (error.message && error.message.includes('nonce')) {
      console.error('   💡 SOLUTION: Transaction nonce issue - try again in a moment');
    }
    if (error.code === 'NETWORK_ERROR' || error.message && error.message.includes('network')) {
      console.error('   💡 SOLUTION: Check ETH_PROVIDER_URL in backend/.env is correct');
    }
    
    console.error('');
    throw error; // Re-throw so controller can handle it
  }
}

async function revokeCertificate(certificateId) {
  const contract = getContract();
  
  console.log('\n🔴 Revoking certificate on blockchain...');
  console.log('   Certificate ID:', certificateId);
  
  const tx = await contract.revokeCertificate(certificateId);
  console.log('   ✅ Transaction sent!');
  console.log('   📝 Transaction Hash:', tx.hash);
  console.log('   ⏳ Waiting for confirmation...');
  
  const receipt = await tx.wait();
  
  console.log('   ✅ Transaction confirmed!');
  console.log('   📦 Block Number:', receipt.blockNumber);
  console.log('   ⛽ Gas Used:', receipt.gasUsed.toString());
  console.log('   🔗 View on Etherscan: https://sepolia.etherscan.io/tx/' + tx.hash);
  console.log('');
  
  // Serialize receipt to avoid BigInt serialization issues (frontend doesn't use receipt, but serialize for safety)
  const serializedReceipt = {
    blockNumber: receipt.blockNumber.toString(),
    gasUsed: receipt.gasUsed.toString(),
    gasPrice: receipt.gasPrice ? receipt.gasPrice.toString() : null,
    status: receipt.status,
  };
  
  return { txHash: tx.hash, receipt: serializedReceipt };
}

async function certificatesOfIssuer(issuer) {
  const contract = getContract();
  const certificateIds = await contract.certificatesOfIssuer(issuer);
  // Convert BigInt array to string array for JSON serialization
  // Handle empty arrays and ensure all values are converted
  if (!Array.isArray(certificateIds)) {
    return [];
  }
  return certificateIds.map(id => {
    // Handle both BigInt and string types
    if (typeof id === 'bigint') {
      return id.toString();
    }
    return String(id);
  });
}

async function certificatesOfRecipient(recipient) {
  const contract = getContract();
  const certificateIds = await contract.certificatesOfRecipient(recipient);
  // Convert BigInt array to string array for JSON serialization
  // Handle empty arrays and ensure all values are converted
  if (!Array.isArray(certificateIds)) {
    return [];
  }
  return certificateIds.map(id => {
    // Handle both BigInt and string types
    if (typeof id === 'bigint') {
      return id.toString();
    }
    return String(id);
  });
}

async function exists(certificateId) {
  const contract = getContract();
  return await contract.exists(certificateId);
}

async function getCertificate(certificateId) {
  const contract = getContract();
  const cert = await contract.getCertificate(certificateId);
  return {
    id: cert.id.toString(),
    issuer: cert.issuer,
    recipient: cert.recipient,
    cid: cert.cid,
    dataHash: cert.dataHash,
    issuedAt: cert.issuedAt.toString(),
    revoked: cert.revoked,
    revokedAt: cert.revokedAt.toString(),
    metadata: cert.metadata
  };
}

module.exports = {
  issueCertificate,
  revokeCertificate,
  certificatesOfIssuer,
  certificatesOfRecipient,
  exists,
  getCertificate,
};
