import { useMutation, useQueryClient } from 'react-query';
import { UserService } from 'src/api/services';
import { API_URL, QUERY_KEY } from 'src/constants';

export default () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEY.SETTINGS.USER.UPDATE_USER,
    mutationFn: (variables: {
      original: User;
      changes: Partial<Omit<User, 'uid'>>;
    }) => UserService.updateUser(variables.original, variables.changes),
    onSuccess: () =>
      queryClient.invalidateQueries(QUERY_KEY.SETTINGS.USER.GET_USER)
  });
};
