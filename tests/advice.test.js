const request = require('supertest');
const app = require('../server')
let mongoose = require('mongoose');

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})

describe('📄 Testing advices routes', () => {
  it('should get all advices', async () => {
    const res = await request(app).get('/advice/all')
    expect(res.statusCode).toEqual(200)
  })
})
