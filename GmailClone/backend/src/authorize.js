// credit: nticated book example from class

const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const secrets = require('../data/secrets');
const db = require('./db');

exports.authorize = async (req, res) => {
  console.log('Start authorize function');
  const {username, password} = req.body;
  const user = await db.find(username);
  if (user === 0) {
    res.status(404).send('Username not found');
  }
  let bool = true;
  if (user) {
    bool = user.username === username && user.pass === password;
  }
  console.log('check user bool', bool);
  // Check if sent information is valid or not
  if (bool) {
    const accessToken = jwt.sign(
      {username: user.username, id: user.id},
      secrets.accessToken,
      {
        expiresIn: '24h',
        algorithm: 'HS256',
      }
    );
    console.log('Authorized from database, sending 200 OK');
    console.log('user password', user.pass);
    res.status(200).json({
      name: user.username,
      password: user.pass,
      accessToken: accessToken,
    });
  } else {
    console.log('401 in authorize function');
    res.status(401).send('Wrong Credentials');
  }
};

exports.check = (req, res, next) => {
  console.log('Start Check function');
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        console.log('403 in authorize.js check function');
        return res.sendStatus(403);
      }
      console.log('Success check in authorize.js');
      req.user = user;
      next();
    });
  } else {
    console.log('403 in authorize.js check function');
    res.sendStatus(403).send('No authorization token');
  }
};
