const contractsController = require('./contracts.controller');
const jobsController = require('./jobs.controller');
const balancesController = require('./balances.controller');
const adminController = require('./admin.controller');

module.exports = {
  ...contractsController,
  ...jobsController,
  ...balancesController,
  ...adminController,
};
