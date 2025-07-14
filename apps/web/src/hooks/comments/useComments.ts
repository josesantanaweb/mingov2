import { comments } from '@/data/comments.json';

export const useComments = () => {

  return {
    data: comments || [],
    error: comments ? null : new Error(`Comments not found`),
    loading: false,
  };
};
