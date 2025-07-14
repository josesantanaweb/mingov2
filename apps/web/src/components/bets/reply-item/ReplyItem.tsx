'use client';
import React from 'react';
import { Avatar } from '@mingo/ui';
import { IReply } from '@/types/comment';
import { formatRelativeTime } from '@/utils/date';

interface ReplyItemProps {
  reply: IReply;
  isFirst?: boolean;
}

const ReplyItem = ({
  reply,
  isFirst = false,
}: ReplyItemProps): React.ReactElement => {
  const { user, createdAt, content } = reply;
  const timeAgo = formatRelativeTime(createdAt);

  return (
    <div className={`flex items-start gap-4 ${!isFirst ? 'mt-4' : ''}`}>
      <Avatar src={user.avatar} size={35} isLoading={false} />
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center gap-3">
          <h5 className="text-sm font-semibold text-white">{user.name}</h5>
          <p className="text-xs font-medium text-base-300">
            {timeAgo}
          </p>
        </div>
        <p className="text-sm text-base-300">{content}</p>
      </div>
    </div>
  );
};

export default ReplyItem;
