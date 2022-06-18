import { useMutation } from 'react-query';
import { AuthService } from 'src/api/services';
import { QUERY_KEY } from 'src/constants';

export default () =>
  useMutation({
    mutationKey: QUERY_KEY.AUTH.REGISTER,
    mutationFn: (variables: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    }) =>
      AuthService.register(
        variables.firstname,
        variables.lastname,
        variables.email,
        variables.password
      )
  });
