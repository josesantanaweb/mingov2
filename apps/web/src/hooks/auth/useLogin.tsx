import type { LoginMutationVariables } from '@/__generated__/graphql';
import { useLoginMutation } from '@/__generated__/graphql';

export const useLogin = () => {
  const [loginMutation, { data, error, loading }] = useLoginMutation();

  const login = (input: LoginMutationVariables['input']) => {
    return loginMutation({
      variables: {
        input,
      },
    });
  };

  return {
    login,
    data,
    error,
    loading,
  };
};
