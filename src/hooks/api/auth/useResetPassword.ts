import { useMutation } from 'react-query';
import { AuthService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useMutation({
    mutationKey: QUERY_KEY.AUTH.RESET_PASSWORD,
    mutationFn: (variables: { email: string }) =>
      AuthService.resetPassword(variables.email)
  });
