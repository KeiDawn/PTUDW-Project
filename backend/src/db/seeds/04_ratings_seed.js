exports.seed = async function (knex) {
  await knex('ratings').del();

  await knex('ratings').insert([
    { user_id: 2, game_id: 1, rating: 5, comment: 'Caro 5 rất hay' },
    { user_id: 3, game_id: 1, rating: 4, comment: 'Khá khó' },
    { user_id: 4, game_id: 1, rating: 5, comment: 'Chiến thuật tốt' },

    { user_id: 2, game_id: 2, rating: 4, comment: 'Nhanh và vui' },
    { user_id: 3, game_id: 2, rating: 3, comment: 'Ổn' },
    { user_id: 5, game_id: 2, rating: 5, comment: 'Thích bản này' },

    { user_id: 2, game_id: 3, rating: 5, comment: 'Classic' },
    { user_id: 4, game_id: 3, rating: 4, comment: 'Dễ chơi' },
    { user_id: 5, game_id: 3, rating: 5, comment: 'Rất hay' },

    { user_id: 3, game_id: 4, rating: 5, comment: 'Snake mượt' },
    { user_id: 4, game_id: 5, rating: 4, comment: 'Giống candy crush' },
    { user_id: 5, game_id: 6, rating: 5, comment: 'Rèn trí nhớ tốt' }
  ]);
};
