'use client';
import React from 'react';

import User from '@/components/user';
import RemainingCount from '@/components/remaining-count';
import type { User as UserType } from '@/__generated__/graphql';

interface UsersProps {
  users: UserType[];
  remainingCount: number;
}

const Users = ({ users, remainingCount }: UsersProps): React.ReactElement => {
  return (
    <div className="flex flex-col items-center w-20 h-full gap-10 px-3 py-5 bg-base-600 rounded-2xl">
      {users?.map((user, index) => (
        <User user={user} key={index} isWon={index === 2} />
      ))}
      {remainingCount > 0 && <RemainingCount remainingCount={remainingCount} />}
    </div>
  );
};

export default Users;
