const express = require('express');

const router = express.Router();
const { getContractById, getAllContracts } = require('../controllers');

/**
 * @returns the contract only if it belongs to the profile calling
 */
router.get('/:id', getContractById);

/**
 * @returns a list of contracts belonging to a user (client or contractor),
 * the list should only contain non terminated contracts
 */
router.get('/', getAllContracts);

module.exports = router;
