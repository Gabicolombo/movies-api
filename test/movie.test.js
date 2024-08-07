const supertest = require('supertest');
const { app, server } = require('../src/app');
const { disconnectDB } = require('../db/connection');

describe('Testando Endpoints da app de filmes', () => {

  afterAll(async () => {
    await server.close();
    await disconnectDB();
  });

  it('Deve retornar status 200 ao fazer uma solicitação GET para /movie/2', async () => {

    const response = await supertest('localhost:2828').get('/movie/2');
    expect(response.statusCode).toBe(200);

  });

  it('Deve retornar uma mensagem de erro ao fazer uma solicitação GET para /movie/7', async () => {

    const response = await supertest(app).get('/movie/7');
    expect(response.text).toEqual("{\"message\":\"No movie found\"}");

  });

  it('Deve retornar status 200 ao fazer uma solicitação GET para /movies', async () => {

    const response = await supertest(app).get('/movies');
    expect(response.statusCode).toBe(200);
  });

  it('Deve retornar uma mensagem de erro ao fazer uma solicitação delete para /movie/7', async () => {

    const response = await supertest(app).delete('/movie/7');
    expect(response.statusCode).toBe(404);
    expect(response.text).toEqual("{\"message\":\"Movie not found\"}");

  });

  it('Deve retornar uma mensagem de erro ao fazer uma solicitação update para /movie/7', async () => {

    const response = await supertest(app).put('/movie/7');
    expect(response.statusCode).toBe(404);
    expect(response.text).toEqual("{\"message\":\"Movie not found\"}");

  });

});

