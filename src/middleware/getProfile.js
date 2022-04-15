/* eslint-disable consistent-return */

const getProfile = async (req, res, next) => {
  const { Profile } = req.app.get('models');
  const profile = await Profile.findByPk(req.get('profile_id') || 0);
  if (!profile) return res.status(401).end();
  console.info('PROFILE: ', profile.id, profile.type);
  req.profile = profile;
  next();
};
module.exports = { getProfile };
