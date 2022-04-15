const Sequelize = require('sequelize');
const Contract = require('./Contract');
const Job = require('./Job');
const Profile = require('./Profile');

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

const models = {
  Contract: Contract.model.init(connection, Sequelize),
  Job: Job.model.init(connection, Sequelize),
  Profile: Profile.model.init(connection, Sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

module.exports = {
  models,
  connection,
};
