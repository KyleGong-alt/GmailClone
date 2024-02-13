const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET ALL', async () => {
  await request
    .get('/v0/user')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      console.log(res);
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.message).toBeDefined();
    });
});

test('Get Trash Only', async () => {
  await request
    .get('/v0/mail?mailbox=trash')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body[0].name).toEqual('trash');
      expect(data.body[0].mail).toBeDefined();
    });
});

test('Get Sent Only', async () => {
  await request
    .get('/v0/mail?mailbox=sent')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body[0].name).toEqual('sent');
      expect(data.body[0].mail).toBeDefined();
    });
});

test('Get Inbox Only', async () => {
  await request
    .get('/v0/mail?mailbox=inbox')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body[0].name).toEqual('inbox');
      expect(data.body[0].mail).toBeDefined();
    });
});

test('Get Non-Existing Mailbox', async () => {
  await request.get('/v0/mail?mailbox=abcdefghijklmnopqrstuvwxyz').expect(404);
});

const testNotWorkingEmail = {
  to: {
    name: 'Create a name',
    email: 'Createaname@yahoo.com',
    notemail: 'nameless',
  },
  subject: 'Why do I have to create a name',
  content: 'Name creation questions',
};

test('Not Working Post', async () => {
  await request.post('/v0/mail/').send(testNotWorkingEmail).expect(400);
});

const testNotWorkingEmail2 = {
  to: {
    name: 'Create a name',
    email: 'Createaname@yahoo.com',
  },
  subject: 'Why do I have to create a name',
  content: 'Name creation questions',
  notemail: 'nameless',
};

test('Not Working Post2', async () => {
  await request.post('/v0/mail/').send(testNotWorkingEmail2).expect(400);
});

const testWorkingEmail = {
  subject: 'eat',
  content: 'your',
  to: {
    name: 'veggies',
    email: 'please',
  },
};

let testId = '';

test('Working Post', async () => {
  await request
    .post('/v0/mail')
    .send(testWorkingEmail)
    .expect(201)
    .then((data) => {
      testId = data.body.id;
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.from.name).toEqual('CSE186 Student');
      expect(data.body.from.email).toEqual('CSE186student@ucsc.edu');
      expect(data.body.subject).toEqual(testWorkingEmail.subject);
      expect(data.body.content).toEqual(testWorkingEmail.content);
    });
});

test('GetbyId not working', async () => {
  await request
    .get('/v0/mail/' + 'abcdefab-2341-5313-2164-a1b2c3d4e5f6')
    .expect(404);
});

test('GetbyId wrong syntax 404', async () => {
  await request.get('/v0/mail/' + 'abc').expect(404);
});

test('Get by ID', async () => {
  await request
    .get('/v0/mail/' + testId)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      console.log('data body', data.body[0]);
      const content = data.body[0].mail[0];
      expect(content.id).toEqual(testId);
      expect(content.from.name).toEqual('CSE186 Student');
      expect(content.from.email).toEqual('CSE186student@ucsc.edu');
      expect(content.subject).toEqual(testWorkingEmail.subject);
      expect(content.content).toEqual(testWorkingEmail.content);
    });
});

test('PUT test id to Inbox', async () => {
  await request.put('/v0/mail/' + testId + '?mailbox=inbox').expect(204);
});

test('PUT test id to sent to get 409 ERROR', async () => {
  await request.put('/v0/mail/' + testId + '?mailbox=sent').expect(409);
});

const wrongId = 'abcdefab-2341-5313-2164-a1b2c3d4e5f6';

test('PUT test 404, wrong ID', async () => {
  await request.put('/v0/mail/' + wrongId + '?mailbox=sent').expect(404);
});
