import { useEffect } from 'react';

export function useKeyboard(handlers) {
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlers.onLeft?.();
          break;
        case 'ArrowRight':
          handlers.onRight?.();
          break;
        case 'Enter':
          handlers.onEnter?.();
          break;
        case 'Escape':
          handlers.onBack?.();
          break;
        case 'h':
          handlers.onHint?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handlers]);
}
