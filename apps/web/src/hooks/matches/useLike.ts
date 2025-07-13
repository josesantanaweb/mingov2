// hooks/useLike.ts
import { useState } from 'react';

interface LikeState {
  isLiked: boolean;
  count: number;
}

export const useLike = (initialCount: number = 0) => {
  const [likeState, setLikeState] = useState<LikeState>({
    isLiked: false,
    count: initialCount,
  });

  const toggleLike = () => {
    setLikeState(prev => ({
      isLiked: !prev.isLiked,
      count: !prev.isLiked ? prev.count + 1 : Math.max(0, prev.count - 1),
    }));
  };

  return {
    ...likeState,
    toggleLike,
  };
};
