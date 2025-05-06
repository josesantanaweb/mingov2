import { useEffect, useState } from 'react';

import { useProfile } from '@/hooks/users/useProfile';

export const usePanel = (boardPrice: number) => {
  const { data: profile } = useProfile();
  const [total, setTotal] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [boards, setBoards] = useState<number>(0);

  useEffect(() => {
    setTotal(boardPrice * boards);
  }, [boards]);

  useEffect(() => {
    if (profile?.balance) setBalance(profile?.balance);
  }, [profile]);

  return {
    total,
    boards,
    balance,
    setBoards,
    setBalance,
    setTotal,
  };
};
