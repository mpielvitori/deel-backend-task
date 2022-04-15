const express = require('express');

const router = express.Router();
const { bestProfession, bestClients } = require('../controllers');

/**
 * @returns the profession that earned the most money (sum of jobs paid)
 * for any contactor that worked in the query time range.
 */
router.get('/best-profession', bestProfession);

/**
 * @returns the clients that paid the most for jobs in the query time period.
 * Limit query parameter should be applied, default limit is 2
 */
router.get('/best-clients', bestClients);


module.exports = router;
