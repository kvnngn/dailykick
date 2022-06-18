import { useMutation } from 'react-query';
import { AuthService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useMutation({
    mutationKey: QUERY_KEY.AUTH.RESEND_VERIFICATION,
    mutationFn: (variables: { email: string }) =>
      AuthService.resendVerification(variables.email)
  });
