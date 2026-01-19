exports.seed = async function (knex) {
  await knex('ratings').del();

  await knex('ratings').insert([
    // Game 1
    { user_id: 2, game_id: 1, rating: 5, comment: 'Caro 5 rất hay' },
    { user_id: 3, game_id: 1, rating: 4, comment: 'Khá khó' },
    { user_id: 4, game_id: 1, rating: 5, comment: 'Chiến thuật tốt' },

    // Game 2
    { user_id: 2, game_id: 2, rating: 4, comment: 'Nhanh và vui' },
    { user_id: 3, game_id: 2, rating: 3, comment: 'Ổn' },
    { user_id: 5, game_id: 2, rating: 5, comment: 'Thích bản này' },

    // Game 3
    { user_id: 2, game_id: 3, rating: 5, comment: 'Classic' },
    { user_id: 4, game_id: 3, rating: 4, comment: 'Dễ chơi' },
    { user_id: 5, game_id: 3, rating: 5, comment: 'Rất hay' },

    // Game 4
    { user_id: 3, game_id: 4, rating: 5, comment: 'Snake mượt' },
    { user_id: 4, game_id: 5, rating: 4, comment: 'Giống candy crush' },
    { user_id: 5, game_id: 6, rating: 5, comment: 'Rèn trí nhớ tốt' },

    // Game 5
    { user_id: 2, game_id: 5, rating: 4, comment: 'Giống Candy Crush' },
    { user_id: 3, game_id: 5, rating: 3, comment: 'Màu sắc ổn' },
    { user_id: 5, game_id: 5, rating: 5, comment: 'Giải trí tốt' },

    // Game 6
    { user_id: 2, game_id: 6, rating: 5, comment: 'Rèn trí nhớ tốt' },
    { user_id: 3, game_id: 6, rating: 4, comment: 'Phù hợp mọi lứa tuổi' },
    { user_id: 4, game_id: 6, rating: 5, comment: 'Thiết kế đơn giản' },

    // Game 7
    { user_id: 2, game_id: 7, rating: 4, comment: 'Vẽ khá mượt' },
    { user_id: 4, game_id: 7, rating: 5, comment: 'Tự do sáng tạo' },
    { user_id: 5, game_id: 7, rating: 4, comment: 'Phù hợp thư giãn' }

  ]);
};
