const express = require('express');

const router = express.Router();
const { depositByClientId } = require('../controllers');

/**
 * Deposits money into the the the balance of a client,
 * a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
 */
router.post('/deposit/:userId', depositByClientId);

module.exports = router;
