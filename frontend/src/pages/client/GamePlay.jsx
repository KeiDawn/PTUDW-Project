import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import GameEngine from '../../games/engine/GameEngine';

import TicTacToeGame from '../../games/tictactoe/TicTacToeGame';
import Caro4Game from '../../games/caro4/Caro4Game';
import Caro5Game from '../../games/caro5/Caro5Game';
import SnakeGame from '../../games/snake/SnakeGame';
import MemoryGame from '../../games/memory/MemoryGame';
import Match3Game from '../../games/match3/Match3Game';
import FreeDrawGame from '../../games/freeDraw/FreeDrawGame';

import { getGameDetailApi } from '../../api/game.api';
import { saveResultApi } from '../../api/result.api';

import GameHeader from '../../components/gameplay/GameHeader';
import GameFooter from '../../components/gameplay/GameFooter';
import GameGuideModal from '../../components/gameplay/GameGuideModal';
import GameResultModal from '../../components/gameplay/GameResultModal';

import { GAME_GUIDES } from '../../guides/gameGuides';

export default function GamePlay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI state
  const [showGuide, setShowGuide] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    getGameDetailApi(id)
      .then(res => setGame(res.data.data))
      .catch(() => {
        alert('Game not found or disabled');
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
      setShowResult(true);
    } catch (err) {
      console.error(err);
      alert('Cannot save game result');
    }
  };

  const renderGame = (engine) => {
    switch (game.code) {
      case 'tic_tac_toe': return <TicTacToeGame {...engine} />;
      case 'caro_4': return <Caro4Game {...engine} />;
      case 'caro_5': return <Caro5Game {...engine} />;
      case 'snake': return <SnakeGame {...engine} />;
      case 'memory': return <MemoryGame {...engine} />;
      case 'match_3': return <Match3Game {...engine} />;
      case 'free_draw': return <FreeDrawGame {...engine} />;
      default: return <p>Game not implemented</p>;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!game) return null;

  return (
    <GameEngine gameCode={game.code} onEnd={handleEnd}>
      {(engine) => (
        <div className="flex flex-col h-screen">

          <GameHeader
            title={game.name}
            score={engine.score}
            time={engine.time}
            state={engine.state}
            canResume={engine.canResume}
            onResume={engine.resume}
          />

          <div className="flex-1 flex justify-center items-center">
            {engine.state !== 'idle' && renderGame(engine)}
          </div>

          <GameFooter
            state={engine.state}
            onStart={engine.startGame}
            onBack={() => {
              engine.save();
              navigate('/dashboard');
            }}
            onHint={() => setShowGuide(true)}
          />

          {showGuide && (
  <GameGuideModal
    guide={GAME_GUIDES[engine.gameCode]}
    onClose={() => setShowGuide(false)}
  />
)}


          <GameResultModal
            visible={engine.state === 'end' && showResult}
            score={engine.score}
            time={engine.time}
            onClose={() => setShowResult(false)}
          />
        </div>
      )}
    </GameEngine>
  );
}
