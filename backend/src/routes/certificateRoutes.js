const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificateController');

router.post('/issue', controller.issueCertificate);
router.post('/revoke', controller.revokeCertificate);

router.get('/issuer/:issuer', controller.getCertificatesByIssuer);
router.get('/recipient/:recipient', controller.getCertificatesByRecipient);
router.get('/exists/:id', controller.exists);
router.get('/:id', controller.getCertificate);

module.exports = router;
