const request = require('supertest');
const app = require('../server')
let mongoose = require('mongoose');

beforeAll(done => {
  request(app)
    .post('/login')
    .send({
      username: "test",
      email: "unit-test@locavi.fr",
      password: "azerty",
    })
    .end((err, response) => {
      token = response.body.token;
      userId = response.body.userId;
      done();
    });
});

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
});


describe('🏠⚠ Testing error handlers of users routes ', () => {
    test('Create a users with wrong data', async (done) => {
      return await request(app)
        .post('/signup')
        .send({
          username:"test2",
          // Missing email for test
          password:"password"
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          expect(response.type).toBe('application/json');
          done();
        }).catch((err) => {
         console.log(err)
        })
    });

    test('Create a users with already created email', async (done) => {
        return await request(app)
          .post('/signup')
          .send({
            username: "test2",
            email: "unit-test@locavi.fr",
            password: "azerty",
          })
          .then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            done();
          }).catch((err) => {
           console.log(err)
          })
    });

    test('Create a users with already created usename', async (done) => {
        return await request(app)
          .post('/signup')
          .send({
            username: "test",
            email: "unit-test2@locavi.fr",
            password: "azerty",
          })
          .then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            done();
          }).catch((err) => {
           console.log(err)
          })
    });

    test('Login a users with missing data', async (done) => {
        return await request(app)
          .post('/login')
          .send({
            // Missing email for test
            password:"password"
          })
          .then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            done();
          }).catch((err) => {
           console.log(err)
          })
    });

    test('Login a users with wrong data', async (done) => {
        return await request(app)
          .post('/login')
          .send({
            email: "unit-tested@locavi.fr",
            password: "azerty",
          })
          .then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            done();
          }).catch((err) => {
           console.log(err)
          })
    });

    test('Login a users with wrong password', async (done) => {
        return await request(app)
          .post('/login')
          .send({
            email: "unit-tested@locavi.fr",
            password: "test",
          })
          .then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.type).toBe('application/json');
            done();
          }).catch((err) => {
           console.log(err)
          })
    });
});


describe('🏠⚠ Testing users routes ', () => {
    test('Create a users', (done) => {
      return request(app)
        .post('/signup')
        .send({
          username:"test",
          email:"email-test@gmail.com",
          password:"azerty"
        })
        .then((response) => {
          expect(response.statusCode).toBe(201);
          expect(response.type).toBe('application/json');
          done();
        }).catch((err) => {
         console.log(err)
        })
    });

    test('Login', (done) => {
        return request(app)
          .post('/login')
          .send({
            email: "email-test@gmail.com",
            password: "azerty"
          })
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            done();
          }).catch((err) => {
           console.log(err)
          })
      });

});
