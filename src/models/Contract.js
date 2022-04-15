const Sequelize = require('sequelize');

const CONTRACT_STATUS_IN_PROGRESS = 'in_progress';
const CONTRACT_STATUS_NEW = 'new';
const CONTRACT_STATUS_TERMINATED = 'terminated';

class Contract extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        terms: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(
            CONTRACT_STATUS_NEW,
            CONTRACT_STATUS_IN_PROGRESS,
            CONTRACT_STATUS_TERMINATED,
          ),
        },
      },
      {
        sequelize,
        modelName: 'Contract',
      },
    );
  }

  static associate(models) {
    Contract.belongsTo(models.Profile, { as: 'Contractor' });
    Contract.belongsTo(models.Profile, { as: 'Client' });
    Contract.hasMany(models.Job);
  }
}

module.exports = {
  model: Contract,
  CONTRACT_STATUS_IN_PROGRESS,
  CONTRACT_STATUS_NEW,
  CONTRACT_STATUS_TERMINATED,
};
