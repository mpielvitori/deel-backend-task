const {
  Op, fn, col, literal,
} = require('sequelize');

const bestProfession = async (req, res) => {
  const { Contract, Profile, Job } = req.app.get('models');
  const { start, end } = req.query;

  const paidJobs = await Job.findAll({
    where: {
      paid: true,
      createdAt: { // Considering contactor that worked by using contract creation time
        [Op.between]: [new Date(start), new Date(end)], // YYYY-MM-DD format
      },
    },
    include: [
      {
        attributes: ['id'],
        model: Contract,
        include: [
          {
            model: Profile,
            as: 'Contractor',
            attributes: ['profession'],
          },
        ],
      },
    ],
    attributes: [[fn('sum', col('price')), 'totalPaid']],
    order: [[literal('totalPaid'), 'DESC']],
    group: ['Contract.Contractor.profession'],
    limit: 1,
  });

  if (paidJobs.length === 0) {
    return res.status(404).end('No paid jobs performed in specific period of time');
  }

  const bestResult = paidJobs[0].get({ plain: true });

  return res.json({
    profession: bestResult.Contract.Contractor.profession,
    totalPaid: bestResult.totalPaid,
  });
};

const bestClients = async (req, res) => {
  const { Contract, Profile, Job } = req.app.get('models');
  const { start, end } = req.query;
  const limit = req.query.limit || 2;

  const jobsByClients = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)], // YYYY-MM-DD format
      },
    },
    include: [
      {
        model: Contract,
        attributes: ['id'],
        include: [
          {
            model: Profile,
            as: 'Client',
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
    ],
    attributes: [[fn('sum', col('price')), 'paid']],
    order: [[literal('paid'), 'DESC']],
    group: ['Contract.Client.id'],
    limit,
  });

  return res.json(jobsByClients.map((groupedJobs) => ({
    id: groupedJobs.Contract.Client.id,
    fullName: `${groupedJobs.Contract.Client.firstName} ${groupedJobs.Contract.Client.lastName}`,
    paid: groupedJobs.paid,
  })));
};

module.exports = {
  bestProfession,
  bestClients,
};
