const express = require('express');

const router = express.Router();
const { getAllUnpaidJobs, payJob } = require('../controllers');

/**
 * @returns Get all unpaid jobs for a user (***either*** a client or contractor),
 * for ***active contracts only***
 */
router.get('/unpaid', getAllUnpaidJobs);

/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay.
 * The amount should be moved from the client's balance to the contractor balance
 */
router.post('/:jobId/pay', payJob);

module.exports = router;
