'use client';
import React from 'react';

interface CommentButtonProps {
  onClick?: () => void;
  commentsCount: number;
}

const CommentButton = ({ onClick, commentsCount }: CommentButtonProps): React.ReactElement => {
  return (
    <div className="flex items-center gap-1 text-base-300 hover:text-white transition-all" onClick={onClick}>
      <span className="icon-chat text-sm" />
      <p className="text-sm font-medium">{commentsCount} Comentarios</p>
    </div>
  );
};

export default CommentButton;
