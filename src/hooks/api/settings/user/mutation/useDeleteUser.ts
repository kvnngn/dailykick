import { useMutation, useQueryClient } from 'react-query';
import { UserService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEY.SETTINGS.USER.DELETE_USER,
    mutationFn: (variables: { uid: string }) =>
      UserService.deleteUser(variables.uid),
    onSuccess: () => client.invalidateQueries(QUERY_KEY.SETTINGS.USER.GET_USER)
  });
};
