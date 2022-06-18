import { useQuery } from 'react-query';
import { UserService } from 'src/api/services';
import { API_URL, QUERY_KEY } from 'src/constants';

export default () =>
  useQuery(QUERY_KEY.SETTINGS.USER.GET_USER, () => UserService.getUsers(), {
    suspense: true,
    useErrorBoundary: true
  });
