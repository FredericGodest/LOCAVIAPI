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

describe('🏠 Testing getting all estates ', () => {
  test('Get all estates', async (done) => {
    return request(app)
      .get('/estate/all')
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

describe('🏠 Testing estate creation ', () => {
  test('Create an estate with wrong data', async (done) => {
    return await request(app)
      .post('/estate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"estate title test",
        description: "estate description test",
        userId:userId,
        //Missing address for test
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
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Create an estate', async (done) => {
    return await request(app)
      .post('/estate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"estate title test",
        description: "estate description test",
        userId:userId,
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
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

});

describe('🏠 Testing finding estate by Id', () => {
  test('Find an estate with wrong id', async (done) => {
    return request(app)
      .get(`/estate/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Find an estate by id', async (done) => {
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

});


describe('🏠 Testing finding estate by Location', () => {
  test('Find estates by location with wrong data', async (done) => {
    return await request(app)
      .get(`/estate/location`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        //Missing longitude for test
        latitude: 49.2,
        radius:100
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Find estates by location', async (done) => {
    return await request(app)
      .get(`/estate/location`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        longitude:1.7,
        latitude: 49.2,
        radius:100
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

describe('🏠 Testing update estate by Id', () => {
  test('Update an estate with wrong id', async (done) => {
    return request(app)
      .put(`/estate/t`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"estate title test",
        description: "estate description test",
        userId:userId,
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
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Update an estate', async (done) => {
    return request(app)
      .put(`/estate/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"estate title test",
        description: "estate description test",
        userId:userId,
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

});

describe('🏠 Testing deleting estate by Id', () => {
  test('Delete an estate with wrond id', async (done) => {
    return request(app)
      .delete(`/estate/t`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        done();
      }).catch((err) => {
       console.log(err)
      })
  });

  test('Delete an estate', (done) => {
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