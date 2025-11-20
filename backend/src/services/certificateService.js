const { getContract } = require('../config/blockchain');

async function issueCertificate({ recipient, cid, dataHash, metadata }) {
  const contract = getContract();
  const tx = await contract.issueCertificate(recipient, cid, dataHash, metadata || '');
  const receipt = await tx.wait();
  return { txHash: tx.hash, receipt };
}

async function revokeCertificate(certificateId) {
  const contract = getContract();
  const tx = await contract.revokeCertificate(certificateId);
  const receipt = await tx.wait();
  return { txHash: tx.hash, receipt };
}

async function certificatesOfIssuer(issuer) {
  const contract = getContract();
  return await contract.certificatesOfIssuer(issuer);
}

async function certificatesOfRecipient(recipient) {
  const contract = getContract();
  return await contract.certificatesOfRecipient(recipient);
}

async function exists(certificateId) {
  const contract = getContract();
  return await contract.exists(certificateId);
}

module.exports = {
  issueCertificate,
  revokeCertificate,
  certificatesOfIssuer,
  certificatesOfRecipient,
  exists,
};
