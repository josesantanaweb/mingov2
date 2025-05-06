import { useAnnounceNumberMutation } from '@/__generated__/graphql';
import type { AnnounceNumberMutationVariables } from '@/__generated__/graphql';

export const useAnnounceNumber = () => {
  const [announceNumberMutation, { data, error, loading }] =
    useAnnounceNumberMutation();

  const announceNumber = (
    roomId: AnnounceNumberMutationVariables['roomId']
  ) => {
    return announceNumberMutation({
      variables: {
        roomId,
      },
    });
  };

  return {
    announceNumber,
    data,
    error,
    loading,
  };
};
