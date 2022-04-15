const { Op } = require('sequelize');
const { connection } = require('../models');
const { CONTRACT_STATUS_IN_PROGRESS } = require('../models/Contract');
const { PROFILE_TYPE_CLIENT } = require('../models/Profile');

const getAllUnpaidJobs = async (req, res) => {
  const { Contract, Job } = req.app.get('models');

  const contractWhere = {
    status: CONTRACT_STATUS_IN_PROGRESS,
    // Since the profile id is unique,
    // this allows the user to be in contracts both as a contractor and as a client.
    [Op.or]: [
      { ClientId: req.profile.id },
      { ContractorId: req.profile.id },
    ],
  };

  const jobs = await Job.findAll({
    where: {
      [Op.or]: [
        { paid: false },
        { paid: null },
      ],
    },
    include: [
      {
        model: Contract,
        where: contractWhere,
      },
    ],
  });

  return res.json(jobs);
};

const payJob = async (req, res) => {
  const { Contract, Job, Profile } = req.app.get('models');
  const { jobId } = req.params;
  const client = req.profile;
  if (client.type !== PROFILE_TYPE_CLIENT) {
    return res.status(405).json('Only clients can pay for a Job');
  }

  const job = await Job.findOne({
    where: {
      id: jobId,
      [Op.or]: [
        { paid: false },
        { paid: null },
      ],
    },
    include: [
      {
        model: Contract,
        where: { ClientId: client.id },
        required: true,
        include: [
          {
            model: Profile,
            as: 'Contractor',
            required: true,
          },
        ],
      },
    ],
  });
  if (!job) {
    return res.status(404).json('Job not found for client or it is already paid');
  }
  if (client.balance < job.price) return res.status(406).json('Insufficient funds');

  const contractor = job.Contract.Contractor;

  const transaction = await connection.transaction();
  try {
    await client.decrement('balance', { by: job.price }, { transaction });
    await contractor.increment('balance', { by: job.price }, { transaction });
    await job.update({ paid: true, paymentDate: Date.now() }, { transaction });

    await transaction.commit();
    return res.send('The payment was successful');
  } catch (error) {
    console.error(`Error paying for the Job ${job.id}`, error);
    await transaction.rollback();
    return res.status(500).json('There was an error paying for the job');
  }
};

module.exports = {
  getAllUnpaidJobs,
  payJob,
};
