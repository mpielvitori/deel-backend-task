const { Op } = require('sequelize');

const { PROFILE_TYPE_CLIENT } = require('../models/Profile');

const depositByClientId = async (req, res) => {
  const { Profile, Job, Contract } = req.app.get('models');
  const { userId } = req.params;
  const { amount } = req.body;

  const client = await Profile.findByPk(userId);

  if (!client || client.type !== PROFILE_TYPE_CLIENT) {
    return res.status(404).json('Client not found');
  }

  const unpaidJobs = await Job.sum('price', {
    where: {
      [Op.or]: [
        { paid: false },
        { paid: null },
      ],
    },
    include: [
      {
        model: Contract,
        where: {
          ClientId: client.id,
        },
      },
    ],
  });

  const depositLimit = unpaidJobs * 0.25;

  if (amount > depositLimit) {
    return res.status(406).json('Cannot deposit more than 25% client total of jobs to pay');
  }
  await client.increment('balance', { by: amount });

  return res.json(`New client balance: ${client.balance + amount}`);
};

module.exports = { depositByClientId };
