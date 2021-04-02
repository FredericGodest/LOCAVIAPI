const request = require('supertest');
const app = require('../server')
let mongoose = require('mongoose');

beforeAll(done => {
  request(app)
    .post('/login')
    .send({
      email: "unit-test@locavi.fr",
      password: "azerty",
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})

describe('🏠 Testing estates routes', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', (done) => {
    return request(app)
      .get('/advice/all')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
  // send the token - should respond with a 200
  test('It should get all estates', (done) => {
    return request(app)
      .get('/estate/all')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      });
  });
});
