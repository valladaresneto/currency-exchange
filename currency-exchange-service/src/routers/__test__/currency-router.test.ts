import request from 'supertest';
import { server } from '../../server';

it('should return a 200 on successful finding current values currencies', async () => {
    return request(server.getApp())
        .get('/api/v1/currency/currentValue/EUR-BRL,USD-BRL')
        .expect(200);
});

it('should return a 400 with invalid currency to find current values', async () => {
    return request(server.getApp())
        .get('/api/v1/currency/currentValue/aaa')
        .expect(400);
});

it('should return a 200 on successful finding history currency values', async () => {
    return request(server.getApp())
        .get('/api/v1/currency/historyValues/EUR-BRL/2')
        .expect(200);
});

it('should return a 400 with invalid currency to find history currency values', async () => {
    return request(server.getApp())
        .get('/api/v1/currency/historyValues/aaa/2')
        .expect(400);
});

it('should return a 400 with invalid days to find history currency values', async () => {
    return request(server.getApp())
        .get('/api/v1/currency/historyValues/EUR-BRL/1')
        .expect(400);
});