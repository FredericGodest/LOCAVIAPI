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
       done();
     });
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
})
describe('⚠ Testing error handlers of router', () => {
  test('Handle 404', (done) => {
    return request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  test('Require authorization', (done) => {
    return request(app)
      .get('/estate/all')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
});
