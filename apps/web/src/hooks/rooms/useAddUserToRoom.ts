import { useMutationMutation as useAddUserToRoomMutation } from '@/__generated__/graphql';
import type { MutationMutationVariables } from '@/__generated__/graphql';

export const useAddUserToRoom = () => {
  const [addUserToRoomMutation, { data, error, loading }] =
    useAddUserToRoomMutation();

  const addUserToRoom = (input: MutationMutationVariables['input']) => {
    return addUserToRoomMutation({
      variables: {
        input,
      },
    });
  };

  return {
    addUserToRoom,
    data,
    error,
    loading,
  };
};
