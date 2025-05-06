'use client';
import type { ReactElement } from 'react';
import React from 'react';

interface RoomNameProps {
  name: string;
}

const RoomName = ({ name }: RoomNameProps): ReactElement => {
  return (
    <h4 className="text-white text-2xl font-semibold uppercase">{name}</h4>
  );
};

export default RoomName;
