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
      .get('/estate/all')
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
  test('It should create an estate', async (done) => {
    return await request(app)
      .post('/estate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"estate title test",
        description: "estate description test",
        userId:"60673634fc7e3e0cc4d3e0b8",
        address: "42, answer of Universe",
        type: "house",
        appartment_number: "42",
        location: {
         type: "Point",
         coordinates: [1.9, 47.2]
        },
        image_url: "url",
        surface: 120
      })
      .then((response) => {
        id = response.body.id;
        console.log(response)
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');

        done();
      }).catch((err) => {
       console.log(err)
      })
  });
  test('It should find an estate by id', (done) => {
    return request(app)
      .get(`/estate/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });
  test('It should update an estate', (done) => {
    return request(app)
      .put(`/estate/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"estate title test",
        description: "estate description test",
        userId:"60673634fc7e3e0cc4d3e0b8",
        address: "42, answer of Universe",
        type: "house",
        appartment_number: "42",
        location: {
         type: "Point",
         coordinates: [1.9, 47.2]
        },
        image_url: "url",
        surface: 120
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });
  test('It should delete an estate', (done) => {
    return request(app)
      .delete(`/estate/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });
});
