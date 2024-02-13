const db = require('./db');

exports.get = async (req, res) => {
  const mail = await db.finduser(req.query);
  if (mail.length === 0) {
    res.status(404).send('User not found');
  } else {
    console.log('Sending mailbox content in user.js get function');
    res.status(200).json(mail);
  }
};

exports.putbyId = async (req, res) => {
  console.log(req.body);
  const mail = await db.putuser(req.body);
  if (mail !== 204) {
    res.sendStatus(404);
  } else {
    console.log('Succesful Put OK');
    res.sendStatus(204);
  }
};
