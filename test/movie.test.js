const supertest = require('supertest');
const { app } = require('../src/app');
const cos = require('ibm-cos-sdk');
const Movie = require('../src/models/movie');
const Genre = require('../src/models/genre');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function populateMongoLocally() {
  await Genre.create([{
    id: 1,
    name: 'Sci-Fi'
  }]);

  await Movie.create([
    {
      id: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      image: 'mock-image1',
      year: 'mock-year1',
      synopsis: 'mock-synopsis',
      nameImage: 'mock-image1',
      runtime: 'runtime-mock1'
    },
    {
      id: 2,
      title: 'Harry Potter',
      genre: 'Sci-Fi',
      image: 'mock-image2',
      year: 'mock-year2',
      synopsis: 'mock-synopsis2',
      nameImage: 'mock-image2',
      runtime: 'runtime-mock2'
    },
  ]);
}

async function deleteMany() {
  await Genre.deleteMany();
  await Movie.deleteMany();
}

describe('Movie controller', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.disconnect();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });


  describe('GET /movies', () => {

    afterAll(async () => {
      await deleteMany();
    })
    it('Should return status 200 and an empty message when no movies are found', async () => {
      const response = await supertest(app).get('/movies');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'No movies found' });
    });

    it('Should return status 200 and a list of movies', async () => {
      await populateMongoLocally();
      const response = await supertest(app).get('/movies');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: 'Inception' }),
          expect.objectContaining({ title: 'Harry Potter' }),
        ])
      );
    });
  });

  describe('GET /movie', () => {
    it('Should return status 200 and an empty message when no movies are found', async () => {
      const response = await supertest(app).get('/movie/1');
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: 'No movie found' });
    });

    it('Should return status 200 and a list of movie', async () => {
      await populateMongoLocally();
      const response = await supertest(app).get('/movie/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({ title: 'Inception' }),
      );
    });
  });

  describe('Delete /movie/id', () => {
    afterAll(async() => {
      await deleteMany();
    });

    it('should return 200 when find and delete a movie', async() => {
      
      const response = await supertest(app).delete('/movie/1');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("{\"message\":\"Movie deleted successfully\"}");
    });

    it('should return 404 when the movie not exist', async() => {
      
      const response = await supertest(app).delete('/movie/4');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe("{\"message\":\"Movie not found\"}");
    });
  });

  describe('Put /movie/id', () => {
    beforeAll(async() => {
      await deleteMany();
      await populateMongoLocally();
    });

    it('should return 200 when find and update the movie', async() => {
      const response = await supertest(app).put('/movie/1').field('title', 'newTitle');
      expect(response.statusCode).toBe(200);
      expect(await Movie.find({ title: 'newTitle'})).toBeDefined();
      expect(response.text).toBe("{\"message\":\"Movie updated successfully\"}");
    });

    it('should return 404 when the movie not exist', async() => {
      
      const response = await supertest(app).put('/movie/4');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe("{\"message\":\"Movie not found\"}");
    });
  });

});