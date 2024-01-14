
const supertest = require('supertest');
const api = require('../src/app');

describe('Testando Endpoints da API de filmes', () => {
  it('Deve retornar status 200 ao fazer uma solicitação GET para /movie/2', async () => {
    const response = await supertest(api).get('/movie/2');
    expect(response.statusCode).toBe(200);
  });

  it('Deve retornar uma mensagem de erro ao fazer uma solicitação GET para /movie/7', async () => {
    const response = await supertest(api).get('/movie/7');
    expect(response.text).toEqual("{\"message\":\"No movie found\"}");
  });

  it('Deve retornar status 200 ao fazer uma solicitação GET para /movies', async () => {
    const response = await supertest(api).get('/movies');
    expect(response.statusCode).toBe(200);
  });

  it('Deve retornar uma mensagem de erro ao fazer uma solicitação delete para /movie/7', async () => {
    const response = await supertest(api).delete('/movie/7');
    expect(response.statusCode).toBe(404);
    expect(response.text).toEqual("{\"message\":\"Movie not found\"}");
  });

  it('Deve retornar uma mensagem de erro ao fazer uma solicitação update para /movie/7', async () => {
    const response = await supertest(api).put('/movie/7');
    expect(response.statusCode).toBe(404);
    expect(response.text).toEqual("{\"message\":\"Movie not found\"}");
  });

});
