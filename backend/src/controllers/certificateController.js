const certificateService = require('../services/certificateService');

exports.issueCertificate = async (req, res, next) => {
  try {
    const { recipient, cid, dataHash, metadata } = req.body;
    if (!recipient || !cid || !dataHash) {
      return res.status(400).json({ error: 'recipient, cid and dataHash are required' });
    }
    
    console.log('\n📨 API Request received: POST /certificates/issue');
    console.log('   Request body:', { recipient, cid: cid?.substring(0, 20) + '...', dataHash: dataHash?.substring(0, 20) + '...' });
    
    const result = await certificateService.issueCertificate({ recipient, cid, dataHash, metadata });
    
    console.log('✅ API Response: Certificate issued successfully');
    console.log('   Transaction Hash:', result.txHash);
    console.log('   Certificate ID:', result.certificateId);
    
    res.json(result);
  } catch (err) {
    console.error('\n❌ API Error in issueCertificate controller:');
    console.error('   Error:', err.message);
    console.error('   Stack:', err.stack);
    next(err);
  }
};

exports.revokeCertificate = async (req, res, next) => {
  try {
    const { certificateId } = req.body;
    if (!certificateId) return res.status(400).json({ error: 'certificateId is required' });
    const result = await certificateService.revokeCertificate(certificateId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCertificatesByIssuer = async (req, res, next) => {
  try {
    const { issuer } = req.params;
    const list = await certificateService.certificatesOfIssuer(issuer);
    res.json({ certificates: list });
  } catch (err) {
    next(err);
  }
};

exports.getCertificatesByRecipient = async (req, res, next) => {
  try {
    const { recipient } = req.params;
    const list = await certificateService.certificatesOfRecipient(recipient);
    res.json({ certificates: list });
  } catch (err) {
    next(err);
  }
};

exports.exists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exists = await certificateService.exists(id);
    res.json({ exists });
  } catch (err) {
    next(err);
  }
};

exports.getCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certificate = await certificateService.getCertificate(id);
    res.json({ certificate });
  } catch (err) {
    next(err);
  }
};