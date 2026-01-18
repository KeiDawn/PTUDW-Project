exports.seed = async function (knex) {
  await knex('games').del();

  await knex('games').insert([
    { id: 1, name: 'Caro 5', code: 'caro_5', play_type: 'level', is_enabled: true },
    { id: 2, name: 'Caro 4', code: 'caro_4', play_type: 'level', is_enabled: true },
    { id: 3, name: 'Tic Tac Toe', code: 'tic_tac_toe', play_type: 'level', is_enabled: true },
    { id: 4, name: 'Snake', code: 'snake', play_type: 'time', is_enabled: true },
    { id: 5, name: 'Match 3', code: 'match_3', play_type: 'time', is_enabled: true },
    { id: 6, name: 'Memory', code: 'memory', play_type: 'time', is_enabled: true },
    { id: 7, name: 'Free Draw', code: 'free_draw', play_type: 'time', is_enabled: true }
  ]);
};
