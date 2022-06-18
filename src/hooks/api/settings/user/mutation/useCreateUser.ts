import { useMutation, useQueryClient } from 'react-query';
import { UserService } from 'src/api/services';
import { API_URL, QUERY_KEY } from 'src/constants';

export default () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEY.SETTINGS.USER.CREATE_USER,
    mutationFn: (variables: {
      companyId: string;
      email: string;
      password: string;
      lastname: string;
      firstname: string;
      language: string;
    }) =>
      UserService.createUser(
        variables.companyId,
        variables.email,
        variables.password,
        variables.lastname,
        variables.firstname,
        variables.language
      ),
    onSuccess: () =>
      queryClient.invalidateQueries(QUERY_KEY.SETTINGS.USER.GET_USER)
  });
};
