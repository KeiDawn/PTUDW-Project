const knex = require('../db/knex');

const findByEmail = (email) => {
  return knex('users').where({ email }).first();
};

const findById = (id) => {
  return knex('users').where({ id }).first();
};

const createUser = (user) => {
  return knex('users').insert(user);
};

module.exports = {
  findByEmail,
  findById,
  createUser
};
