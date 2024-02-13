// credit: from secret sauce given in class

import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import App from '../App';

const molly = {
  name: 'Molly Member',
  accessToken: 'some-old-jwt',
};

const subjects = ['random subject', 'a-x-z'];

const inbox = [
  {
    id: '0a39b56d-a39a-4532-a934-30cf19cd6182',
    subject: subjects[0],
    received: '2021-01-17T23:17:19Z',
  },
  {
    id: 'd9e55752-3544-4e01-ac84-bafacfa1bc65',
    subject: subjects[1],
    received: '2021-05-17T23:17:19Z',
  },
];

const URL = 'http://localhost:3010/v0/user';

let box = undefined;

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return box ? res(ctx.json(box)) : res(ctx.status(404, 'Unknown mailbox'));
  })
);

beforeAll(() => {
  localStorage.setItem('user', JSON.stringify(molly));
  server.listen();
});

afterEach(() => server.resetHandlers);
afterAll(() => server.close);

test('Unknown mailbox', async () => {
  box = undefined;
  render(<App />);
});

test('Inbox has two mails', async () => {
  box = inbox;
  render(<App />);
  fireEvent.click(screen.getByLabelText('Username'));
  await screen.findByText(subjects[0]);
  await screen.findByText(subjects[1]);
});
