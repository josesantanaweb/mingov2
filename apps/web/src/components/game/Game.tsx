'use client';
import React, { useCallback, useEffect, useState } from 'react';

import { getLetter } from '@/utils/board';
import Card from '@/components/card';
import Balls from '@/components/balls';
import Award from '@/components/award';
import Users from '@/components/users';
import RoomName from '@/components/bingo/room-name';
import { INTERVAL_BALLS, MAX_USERS_TO_SHOW } from '@/constants';
import { useRoom } from '@/hooks/rooms/useRoom';
import { useRoomWinner } from '@/hooks/rooms/useRoomWinner';
import { useAnnounceNumber } from '@/hooks/rooms/useAnnounceNumber';

interface GameProps {
  roomId: string;
}

const Game = ({ roomId }: GameProps): React.ReactElement => {
  const { data: room } = useRoom(roomId);
  const { announceNumber } = useAnnounceNumber();
  const { data: roomWinner } = useRoomWinner(roomId);
  const cards = room.cards;
  const users = room.users?.slice(0, MAX_USERS_TO_SHOW);
  const remainingCount = (room.users?.length ?? 0) - MAX_USERS_TO_SHOW;
  const [balls, setBalls] = useState<
    { number: number; id: number; letter: string }[]
  >([]);
  const [lastBallId, setLastBallId] = useState<number | null>(null);
  const [lastWinnerCardNumber, setLastWinnerCardNumber] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (room?.drawnNumbers?.length) {
      const formattedBalls = room.drawnNumbers.map((number: number) => ({
        number,
        id: number,
        letter: getLetter(number),
      }));
      setBalls(formattedBalls);
      setLastBallId(formattedBalls.at(-1)?.id ?? null);
    }
  }, [room?.drawnNumbers]);

  const addBall = async () => {
    try {
      const response = await announceNumber(roomId);
      const announcedNumber = response.data?.announceNumber;

      if (typeof announcedNumber !== 'number') return;

      const newBall = {
        number: announcedNumber,
        id: announcedNumber,
        letter: getLetter(announcedNumber),
      };

      setBalls((prev) => [...prev, newBall]);
      setLastBallId(newBall.id);
    } catch (err) {
      console.error('Error announcing number:', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addBall();
    }, INTERVAL_BALLS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (roomWinner && roomWinner.winnerCard.number !== lastWinnerCardNumber) {
      alert(
        `¡ha ganado ${roomWinner.winnerUser.name} con la tarjeta ${roomWinner.winnerCard.number}!`,
      );
      setLastWinnerCardNumber(roomWinner.winnerCard.number);
    }
  }, [roomWinner, lastWinnerCardNumber]);

  const handleBingo = useCallback(() => {
    alert('Bingo!');
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center gap-5 h-[90px] justify-between">
        <Balls balls={balls} lastBallId={lastBallId} />
        <RoomName name={room.name} />
        <Award award={room.award} />
      </div>
      <div className="flex justify-between w-full h-full">
        <div className="grid lg:grid-cols-3 items-start w-10/12 py-5 gap-[40px]">
          {cards &&
            cards.map((card) => (
              <Card
                key={card.id}
                numbers={card.numbers}
                handleBingo={handleBingo}
              />
            ))}
        </div>
        <div className="flex-col min-w-[120px] gap-10 items-end hidden lg:flex">
          {users && <Users users={users} remainingCount={remainingCount} />}
        </div>
      </div>
    </div>
  );
};

export default Game;
