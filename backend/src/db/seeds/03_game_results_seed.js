exports.seed = async function (knex) {
  await knex('game_results').del();

  await knex('game_results').insert([
    // Game 1
    { user_id: 2, game_id: 1, score: 120, duration: 300, result: 'win' },
    { user_id: 3, game_id: 1, score: 80, duration: 280, result: 'lose' },
    { user_id: 4, game_id: 1, score: 100, duration: 320, result: 'draw' },

    // Game 2
    { user_id: 2, game_id: 2, score: 90, duration: 260, result: 'win' },
    { user_id: 3, game_id: 2, score: 70, duration: 240, result: 'lose' },
    { user_id: 5, game_id: 2, score: 85, duration: 250, result: 'win' },

    // Game 3
    { user_id: 2, game_id: 3, score: 60, duration: 120, result: 'win' },
    { user_id: 4, game_id: 3, score: 40, duration: 110, result: 'lose' },
    { user_id: 5, game_id: 3, score: 55, duration: 130, result: 'draw' },

    // Game 4
    { user_id: 2, game_id: 4, score: 200, duration: 400, result: 'win' },
    { user_id: 3, game_id: 4, score: 180, duration: 390, result: 'lose' },
    { user_id: 4, game_id: 4, score: 210, duration: 420, result: 'win' },
    
    // Game 5
    { user_id: 2, game_id: 5, score: 150, duration: 360, result: 'win' },
    { user_id: 3, game_id: 5, score: 140, duration: 340, result: 'lose' },
    { user_id: 5, game_id: 5, score: 160, duration: 380, result: 'win' },

    // Game 6
    { user_id: 3, game_id: 6, score: 95, duration: 200, result: 'win' },
    { user_id: 4, game_id: 6, score: 85, duration: 190, result: 'lose' },
    { user_id: 5, game_id: 6, score: 90, duration: 210, result: 'win' },

    // Game 7
    { user_id: 2, game_id: 7, score: 50, duration: 180, result: 'win' },
    { user_id: 4, game_id: 7, score: 40, duration: 160, result: 'lose' },
    { user_id: 5, game_id: 7, score: 45, duration: 170, result: 'draw' }
  ]);
};
