'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '@mingo/ui';
import ReplyItem from '@/components/bets/reply-item';
import { IComment } from '@/types/comment';
import { formatRelativeTime } from '@/utils/date';

interface CommentItemProps {
  comment: IComment;
  onReply?: (commentId: string) => void;
}

const CommentItem = ({
  comment,
  onReply,
}: CommentItemProps): React.ReactElement => {
  const [showReplies, setShowReplies] = useState(false);
  const [likeCount, setLikeCount] = useState(2);
  const [isLiked, setIsLiked] = useState(false);

  const { user, createdAt, content, replies = [] } = comment;
  const timeAgo = formatRelativeTime(createdAt);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReplyClick = () => {
    onReply?.(comment.id);
  };

  const toggleReplies = () => setShowReplies(!showReplies);

  return (
    <div className="flex items-start gap-4">
      <Avatar src={user.avatar} size={40} isLoading={false} />
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center gap-3">
          <h5 className="text-sm font-semibold text-white">{user.name}</h5>
          <p className="text-xs font-medium text-base-300">{timeAgo}</p>
        </div>
        <p className="text-sm text-base-300">{content}</p>
        <div className="flex items-center gap-4 my-1">
          <button
            onClick={handleReplyClick}
            className="flex items-center gap-1 transition-colors cursor-pointer text-base-300 hover:text-blue-400"
          >
            <p className="text-xs font-medium">Responder</p>
          </button>
        </div>

        {replies.length > 0 && (
          <button
            onClick={toggleReplies}
            className="relative flex items-start mt-1 ml-8 transition-colors cursor-pointer text-base-300 hover:text-white"
          >
            <span className="w-5 h-[1px] rounded-full bg-base-500 absolute top-2 -left-7" />
            <p className="text-xs font-semibold">
              {showReplies ? 'Ocultar' : 'Ver'} {replies.length} Respuesta
              {replies.length !== 1 ? 's' : ''}
            </p>
          </button>
        )}

        <AnimatePresence>
          {showReplies && replies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.95, height: 0 }}
              animate={{ opacity: 1, scaleY: 1, height: 'auto' }}
              exit={{ opacity: 0, scaleY: 0.95, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-4 origin-top"
            >
              {replies.map((reply, index: number) => (
                <ReplyItem
                  key={reply.id || index}
                  reply={reply}
                  isFirst={index === 0}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={handleLike}
        className={`flex items-center flex-col transition-colors cursor-pointer gap-1 ${
          isLiked ? 'text-red-500' : 'text-base-300'
        }`}
      >
        <span className={`${isLiked ? 'icon-heart' : 'icon-heart-line'}`} />
        <p className="text-sm font-medium">{likeCount}</p>
      </button>
    </div>
  );
};

export default CommentItem;
