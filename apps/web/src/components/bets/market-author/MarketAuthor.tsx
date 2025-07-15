'use client';
import React from 'react';
import { Avatar } from '@mingo/ui';
import Logo from '@/components/logo';

interface MarketAuthorProps {
  isPlatform?: boolean;
}

const MarketAuthor = ({
  isPlatform = false,
}: MarketAuthorProps): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-white text-base font-medium">Creador</h6>
      {isPlatform ? (
        <Logo width={100} height={24} />
      ) : (
        <Avatar src="/images/users/05.png" size={40} isLoading={false} />
      )}
    </div>
  );
};

export default MarketAuthor;
