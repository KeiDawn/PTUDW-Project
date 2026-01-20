import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import GameEngine from '../../games/engine/GameEngine';
import TicTacToeGame from '../../games/tictactoe/TicTacToeGame';

import { getGameDetailApi } from '../../api/game.api';
import { saveResultApi } from '../../api/result.api';

export default function GamePlay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGameDetailApi(id)
      .then((res) => {
        setGame(res.data.data);
      })
      .catch(() => {
        alert('Game is disabled or not found');
        navigate('/dashboard');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleEnd = async ({ score, time, result }) => {
    await saveResultApi(id, {
      score,
      duration: time,
      result
    });
  };

  if (loading) return <p>Loading game...</p>;
  if (!game) return null;

  return (
    <GameEngine gameCode={game.code} onEnd={handleEnd}>
      {(engine) => {
        switch (game.code) {
          case 'tic_tac_toe':
            return <TicTacToeGame {...engine} />;
          default:
            return <p>Game not implemented yet</p>;
        }
      }}
    </GameEngine>
  );
}
