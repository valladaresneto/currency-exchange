import request from 'supertest';
import { server } from '../../server';

it('should return a 201 on successful signup', async () => {
    return request(server.getApp())
        .post('/api/v1/user/signup')
        .send({
            "email": "bbb@bbb.com",
            "password": "12345"
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(server.getApp())
        .post('/api/v1/user/signup')
        .send({
            email: 'alskdflaskjfd',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(server.getApp())
        .post('/api/v1/user/signup')
        .send({
            email: 'alskdflaskjfd',
            password: 'p'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(server.getApp())
        .post('/api/v1/user/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(server.getApp())
        .post('/api/v1/user/signup')
        .send({
            password: 'alskjdf'
        })
        .expect(400);
});

it('should return a 200 on successful signin', async () => {
    const response = await request(server.getApp())
        .post('/api/v1/user/signin')
        .send({
            "email": "bbb@bbb.com",
            "password": "12345"
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
