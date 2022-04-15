const { Op } = require('sequelize');
const {
  CONTRACT_STATUS_TERMINATED,
} = require('../models/Contract');

const getContractById = async (req, res) => {
  const { Contract } = req.app.get('models');
  const { id } = req.params;
  const where = {
    id,
    // Since the profile id is unique,
    // this allows the user to be in contracts both as a contractor and as a client.
    [Op.or]: [
      { ClientId: req.profile.id },
      { ContractorId: req.profile.id },
    ],
  };
  const contract = await Contract.findOne({ where, raw: true });
  if (!contract) return res.status(404).json('Contract not found');
  return res.json(contract);
};

const getAllContracts = async (req, res) => {
  const { Contract } = req.app.get('models');
  const where = {
    status: { [Op.ne]: CONTRACT_STATUS_TERMINATED },
    // Since the profile id is unique,
    // this allows the user to be in contracts both as a contractor and as a client.
    [Op.or]: [
      { ClientId: req.profile.id },
      { ContractorId: req.profile.id },
    ],
  };
  const contracts = await Contract.findAll({ where, raw: true });
  return res.json(contracts);
};

module.exports = {
  getContractById,
  getAllContracts,
};
