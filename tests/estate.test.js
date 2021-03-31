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

describe('🏠 Testing estates routes', () => {
  it('should get all estates', async () => {
    const res = await request(app).get('/estate/all')
    expect(res.statusCode).toEqual(200)
  })
})
