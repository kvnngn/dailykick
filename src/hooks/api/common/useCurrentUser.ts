import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { GLOBAL, QUERY_KEY } from 'src/constants';
import { UserService } from 'src/api/services';

export default (suspense: boolean = true) => {
  const { pathname } = useLocation();
  const activeToken = useMemo<string | null>(
    () => localStorage.getItem(GLOBAL.ACCESS_TOKEN),
    [pathname]
  );
  const userId = useMemo<string | null>(
    () => localStorage.getItem(GLOBAL.USER_ID),
    [pathname]
  );
  return useQuery(
    [QUERY_KEY.CURRENT.USERS, userId],
    ({ queryKey }) => {
      if (queryKey[1]) {
        return UserService.getById(queryKey[1]);
      }
      return undefined;
    },
    {
      cacheTime: 15000,
      suspense,
      enabled: Boolean(activeToken) && Boolean(userId),
      onSuccess: (data) => {
        if (data && userId !== data._id) {
          localStorage.getItem(GLOBAL.USER_ID);
        }
      }
    }
  );
};
