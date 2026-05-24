import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('GET /api/users', () => {
  it('유저 목록을 200으로 반환한다', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/users/:id', () => {
  it('존재하지 않는 id는 404', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
  });
});

// TODO: POST /api/users 성공 케이스 직접 작성해보기
// TODO: POST /api/users 400 (name/email 누락) 케이스 직접 작성해보기
