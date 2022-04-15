const Sequelize = require('sequelize');

const PROFILE_TYPE_CLIENT = 'client';
const PROFILE_TYPE_CONTRACTOR = 'contractor';

class Profile extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        profession: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL(12, 2),
        },
        type: {
          type: Sequelize.ENUM(PROFILE_TYPE_CLIENT, PROFILE_TYPE_CONTRACTOR),
        },
      },
      {
        sequelize,
        modelName: 'Profile',
      },
    );
  }
}

module.exports = {
  model: Profile,
  PROFILE_TYPE_CLIENT,
  PROFILE_TYPE_CONTRACTOR,
};
