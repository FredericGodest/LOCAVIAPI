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
      userId = response.body.userId;
      done();
    });
});

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
});

describe('📄 Testing getting all advices', () => {
  test('Get all advices', async (done) => {
    return request(app)
      .get('/advice/all')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
        console.log(err)
      });
  });
});

describe('📄 testing advice creation', () => {
  test('Create an advice with missing data', async (done) => {
    return request(app)
      .post('/advice')
      .set('Authorization', `Bearer ${token}`)
      .send({
        estateId:"zdz6dzhui78ZD9zdjij2dj5a0",
        userId:userId,
        dateIn:"2010-04-03",
        //Missing dateOut for test
        ratings: {
         thermal:3,
         sound:3,
         district:3,
         configuration:3,
         storage:3,
         brightness:3
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Create an advice', (done) => {
    return request(app)
      .post('/advice')
      .set('Authorization', `Bearer ${token}`)
      .send({
        estateId:"zdz6dzhui78ZD9zdjij2dj5a0",
        userId:userId,
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

});

describe('📄 Testing getting advice by Id', () => {
  test('Find an advice by wrong id', async (done) => {
    return request(app)
      .get(`/advice/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Find an advice by id', (done) => {
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

});


describe('📄 Testing advice modification', () => {
  test('Update an advice with wrong id', async (done) => {
    return request(app)
      .put(`/advice/t`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        estateId:"zdz6dzhui78ZD9zdjij2dj5a0",
        userId:userId,
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
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Update an advice', (done) => {
    return request(app)
      .put(`/advice/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        estateId:"zdz6dzhui78ZD9zdjij2dj5a0",
        userId:userId,
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

});

describe('📄 Testing deleting advices', () => {
  test('Delete an advice with wrong id', async (done) => {
    return request(app)
      .delete(`/advice/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Delete an advice', (done) => {
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

