'use client';
import type { ReactElement } from 'react';
import React from 'react';

import TotalAmount from '@/components/total-amount';
import NumberSelector from '@/components/number-selector';
import { usePanel } from '@/hooks/usePanel';
import { useUpdateUser } from '@/hooks/users/useUpdate';
import { useProfile } from '@/hooks/users/useProfile';
import { useAddUserToRoom } from '@/hooks/rooms/useAddUserToRoom';
import type { RoomQuery } from '@/__generated__/graphql';

import CurrentBalance from '../current-balance/CurrentBalance';
interface PanelProps {
  room: RoomQuery['room'];
}

const Panel = ({ room }: PanelProps): ReactElement => {
  const { total, balance, boards, setBalance, setBoards, setTotal } = usePanel(
    room.price
  );
  const { data: profile } = useProfile();
  const { addUserToRoom } = useAddUserToRoom();
  const { updateUser } = useUpdateUser();

  const handleNumber = (number: number) => setBoards(number);
  const handleBuy = () => {
    if (!profile) return;

    const newBalance = profile.balance - total;

    updateUser(String(profile.id), {
      balance: newBalance,
    });

    addUserToRoom({
      userId: String(profile.id),
      roomId: String(room.id),
      numberOfCards: boards,
    });
    setBalance(newBalance);
    setTotal(0);
  };

  return (
    <div className="flex flex-col w-[400px] bg-base-600 rounded-2xl h-full p-3 gap-6">
      <CurrentBalance balance={balance} />
      <NumberSelector handleNumber={handleNumber} />
      <TotalAmount total={total} onBuy={handleBuy} balance={balance} />
    </div>
  );
};

export default Panel;
