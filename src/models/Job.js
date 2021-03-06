const Sequelize = require('sequelize');

class Job extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false,
        },
        paid: {
          type: Sequelize.BOOLEAN,
          default: false,
        },
        paymentDate: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        modelName: 'Job',
      },
    );
  }

  static associate(models) {
    Job.belongsTo(models.Contract);
  }
}

module.exports = {
  model: Job,
};
