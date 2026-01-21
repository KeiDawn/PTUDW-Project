export const GAME_GUIDES = {
  tic_tac_toe: {
    title: 'Tic Tac Toe',
    description: 'Tạo 3 quân liên tiếp để chiến thắng.',
    steps: [
      'Người chơi đi trước (X)',
      'Máy đi sau (O)',
      'Ai tạo được 3 quân liên tiếp sẽ thắng'
    ],
    controls: ['Arrow keys', 'Enter', 'Back']
  },

  caro_4: {
    title: 'Caro 4',
    description: 'Tạo 4 quân liên tiếp.',
    steps: [
      'Đánh X vào ô trống',
      'Máy đánh O ngẫu nhiên',
      'Ai tạo được 4 quân liên tiếp sẽ thắng'
    ],
    controls: ['Left', 'Right', 'Enter', 'Back']
  },

  caro_5: {
    title: 'Caro 5',
    description: 'Tạo 5 quân liên tiếp.',
    steps: [
      'Đánh X',
      'Máy đánh O',
      'Tạo 5 quân liên tiếp để thắng'
    ],
    controls: ['Left', 'Right', 'Enter', 'Back']
  },

  snake: {
    title: 'Snake',
    description: 'Điều khiển rắn ăn mồi.',
    steps: [
      'Di chuyển rắn',
      'Ăn mồi để tăng điểm',
      'Tránh va chạm'
    ],
    controls: ['Arrow keys']
  },

  match_3: {
    title: 'Match 3',
    description: 'Ghép 3 ô cùng loại.',
    steps: [
      'Chọn 2 ô để đổi chỗ',
      'Tạo hàng >=3 để ghi điểm',
      'Game kết thúc khi hết thời gian'
    ],
    controls: ['Mouse']
  },

  memory: {
    title: 'Memory',
    description: 'Lật các cặp giống nhau.',
    steps: [
      'Lật 2 thẻ',
      'Nếu giống nhau sẽ giữ lại',
      'Lật hết các cặp để thắng'
    ],
    controls: ['Mouse']
  },

  free_draw: {
    title: 'Free Draw',
    description: 'Vẽ tự do trên canvas.',
    steps: [
      'Nhấn Start',
      'Vẽ bằng chuột',
      'Nhấn Finish để kết thúc'
    ],
    controls: ['Mouse']
  }
};

