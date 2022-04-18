const request = require('supertest');
const seed = require('../../scripts/seedDb');
const app = require('../../src/app');

describe('Balances', () => {
  beforeEach(async () => {
    await seed();
  });

  it('Should update client balance by 50', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/balances/deposit/1').send({ amount: 50 })
      .set('profile_id', 1);

    expect(statusCode).toBe(200);
    expect(body).toBe('New client balance: 1200');
  });

  it('Should return 406 since deposit is more than 25% client total of jobs to pay', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/balances/deposit/1')
      .send({ amount: 300 })
      .set('profile_id', 1);

    expect(statusCode).toEqual(406);
    expect(body).toBe('Cannot deposit more than 25% client total of jobs to pay');
  });

  it('Should return 404 if client is not found', async () => {
    const { statusCode } = await request(app)
      .post('/api/balances/deposit/23')
      .send({ amount: 100 })
      .set('profile_id', 1);

    expect(statusCode).toEqual(404);
  });

  it('Should return 404 if given user is not a client', async () => {
    const { statusCode } = await request(app)
      .post('/api/balances/deposit/6')
      .send({ amount: 100 });

    expect(statusCode).toEqual(401);
  });
});
