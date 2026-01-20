import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import GameEngine from '../../games/engine/GameEngine';
import TicTacToeGame from '../../games/tictactoe/TicTacToeGame';
import Caro4Game from '../../games/caro4/Caro4Game';
import Caro5Game from '../../games/caro5/Caro5Game';
import SnakeGame from '../../games/snake/SnakeGame';
import MemoryGame from '../../games/memory/MemoryGame';




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
        const safeDuration =
            Number.isFinite(time) && time > 0 ? time : 1;

        try {
            await saveResultApi(id, {
            score,
            duration: safeDuration,
            result
            });
            console.log('Result saved');
        } catch (err) {
            console.error('Save result failed', err);
            alert('Cannot save game result');
        }
    };


  if (loading) return <p>Loading game...</p>;
  if (!game) return null;

  return (
    <GameEngine gameCode={game.code} onEnd={handleEnd}>
      {(engine) => {
        switch (game.code) {
        case 'tic_tac_toe':
            return <TicTacToeGame {...engine} />;

        case 'caro_4':
            return <Caro4Game {...engine} />;

        case 'caro_5':
            return <Caro5Game {...engine} />;

        case 'snake':
            return <SnakeGame {...engine} />;

        case 'memory':
            return <MemoryGame {...engine} />;



        default:
            return <p>Game not implemented yet</p>;
        }


      }}
    </GameEngine>
  );
}
