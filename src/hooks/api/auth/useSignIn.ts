import { useMutation } from 'react-query';
import { AuthService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useMutation({
    mutationKey: QUERY_KEY.AUTH.LOGIN,
    mutationFn: (variables: { email: string; password: string }) =>
      AuthService.login(variables.email, variables.password)
  });
