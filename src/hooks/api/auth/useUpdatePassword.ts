import { useMutation } from 'react-query';
import { AuthService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useMutation({
    mutationKey: QUERY_KEY.AUTH.UPDATE_PASSWORD,
    mutationFn: (variables: { token: string; password: string }) =>
      AuthService.updatePassword(variables.token, variables.password)
  });
