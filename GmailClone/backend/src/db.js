const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.finduser = async (options) => {
  let select = 'SELECT * FROM mail';
  if (Object.entries(options).length > 0) {
    select +=
      ' WHERE ' +
      Object.entries(options)
        .map(([key, value]) => {
          return `${key} = '${value}'`;
        })
        .join(' AND ');
  }
  console.log(select);
  const query = {
    text: select,
  };
  try {
    const {rows} = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

exports.putuser = async (mail) => {
  console.log(mail);
  for (const email of mail) {
    const update = `
    UPDATE mail set viewed = $1, 
    favorite = $2
    WHERE id = $3`;
    console.log(update);
    const query = {
      text: update,
      values: [+email.viewed, +email.favorite, email.id],
    };
    await pool.query(query);
  }

  console.log('204');
  return 204;
};

exports.find = async (username) => {
  const select = 'SELECT * FROM userinfo WHERE username = $1';
  const query = {
    text: select,
    values: [username],
  };
  let bool = 1;
  const {rows} = await pool.query(query);
  if (rows.length === 0) {
    bool = 0;
    return bool;
  }
  return rows[0];
};
