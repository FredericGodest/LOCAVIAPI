const request = require('supertest');
const app = require('../server')

describe('📄 Testing advices routes', () => {
  it('should get all advices', async () => {
    const res = await request(app).get('/advice/all')
    expect(res.statusCode).toEqual(200)
  })
})
describe('🏠 Testing estates routes', () => {
  it('should get all estates', async () => {
    const res = await request(app).get('/estate/all')
    expect(res.statusCode).toEqual(200)
  })
})
