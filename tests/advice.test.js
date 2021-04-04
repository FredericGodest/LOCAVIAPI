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
      token = response.body.token;
      done();
    });
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})

describe('📄 Testing advices routes', () => {
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
  test('It should get all advices', (done) => {
    return request(app)
      .get('/advice/all')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      });
  });
  test('It should create an advice', (done) => {
    return request(app)
      .post('/advice')
      .set('Authorization', `Bearer ${token}`)
      .send({
        estateId:"zdz6dzhui78ZD9zdjij2dj5a0",
        userId:"60673634fc7e3e0cc4d3e0b8",
        dateIn:"2010-04-03",
        dateOut:"2020-01-01",
        ratings: {
         thermal:3,
         sound:3,
         district:3,
         configuration:3,
         storage:3,
         brightness:3
        },
        comment:"comment"
      })
      .then((response) => {
        id = response.body.id;
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');

        done();
      }).catch((err) => {
       console.log(err)
      })
  });
  test('It should find an advice by id', (done) => {
    return request(app)
      .get(`/advice/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });
  test('It should update an advice', (done) => {
    return request(app)
      .put(`/advice/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        estateId:"zdz6dzhui78ZD9zdjij2dj5a0",
        userId:"60673634fc7e3e0cc4d3e0b8",
        dateIn:"2010-04-03",
        dateOut:"2020-01-01",
        ratings: {
         thermal:4,
         sound:4,
         district:4,
         configuration:4,
         storage:4,
         brightness:4
        },
        comment:"comment"
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });
  test('It should delete an advice', (done) => {
    return request(app)
      .delete(`/advice/${id}`)
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
