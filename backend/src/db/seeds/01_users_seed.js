const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  await knex('users').del();

  const passwordHash = await bcrypt.hash('123456', 10);

  await knex('users').insert([
    {
      id: 1,
      email: 'admin@ptudw.com',
      password: passwordHash,
      role: 'admin',
      is_active: true
    },
    {
      id: 2,
      email: 'user1@ptudw.com',
      password: passwordHash,
      role: 'client',
      is_active: true
    },
    {
      id: 3,
      email: 'user2@ptudw.com',
      password: passwordHash,
      role: 'client',
      is_active: true
    },
    {
      id: 4,
      email: 'user3@ptudw.com',
      password: passwordHash,
      role: 'client',
      is_active: true
    },
    {
      id: 5,
      email: 'user4@ptudw.com',
      password: passwordHash,
      role: 'client',
      is_active: true
    }
  ]);
};
