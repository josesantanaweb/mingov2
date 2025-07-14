'use client';
import React from 'react';
import Modal from '../Modal';
import CommentItem from '@/components/bets/comment-item';
import { useComments } from '@/hooks/comments/useComments';
import CommentInput from '@/components/bets/comment-input';

interface CommentsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Comments = ({
  isOpen = false,
  onClose,
}: CommentsProps): React.ReactElement => {
  const { data: comments, error, loading } = useComments();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <h3 className="mb-3 text-xl font-semibold text-center text-white">
          Comentarios
        </h3>
        <div
          className="flex flex-col gap-6 max-h-[300px] overflow-y-auto pr-2 scrollbar"
          style={{
            scrollbarColor: 'transparent transparent',
            scrollbarWidth: 'thin',
          }}
        >
          {comments?.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
        <CommentInput onSubmit={comment => console.log(comment)} />
      </div>
    </Modal>
  );
};

export default Comments;
