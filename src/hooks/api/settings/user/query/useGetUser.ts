import { useQuery } from 'react-query';
import { UserService } from 'src/api/services';
import { API_URL, QUERY_KEY } from 'src/constants';

export default (uid: string) =>
  useQuery([QUERY_KEY.SETTINGS.USER.GET_USER, uid], ({ queryKey }) =>
    UserService.getById(queryKey[1])
  );
