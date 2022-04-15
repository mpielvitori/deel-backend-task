const express = require('express');

const contracts = require('./contracts.route');
const jobs = require('./jobs.route');
const balances = require('./balances.route');
const admin = require('./admin.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API 👋',
  });
});

router.use('/contracts', contracts);
router.use('/jobs', jobs);
router.use('/balances', balances);
router.use('/admin', admin);

module.exports = router;
