import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { GLOBAL, QUERY_KEY } from 'src/constants';
import { AuthService } from 'src/api/services';

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
    [QUERY_KEY.AUTH.LOGIN_WITH_TOKEN, activeToken],
    ({ queryKey }) => {
      if (queryKey[1]) {
        return AuthService.loginWithToken(queryKey[1]);
      }
      return undefined;
    },
    {
      cacheTime: 500,
      enabled: Boolean(activeToken),
      suspense,
      refetchInterval: activeToken ? 300000 : false,
      onSuccess: (data) => {
        if (data.userId) {
          localStorage.getItem(GLOBAL.USER_ID);
        }
      }
    }
  );
};
