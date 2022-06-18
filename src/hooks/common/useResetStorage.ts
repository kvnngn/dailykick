import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { GLOBAL } from 'src/constants';

export default () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.clear();
    localStorage.removeItem(GLOBAL.ACCESS_TOKEN);
    localStorage.removeItem(GLOBAL.REFRESH_TOKEN);
    localStorage.removeItem(GLOBAL.REFRESH_TOKEN_EXPIRED);
  }, []);
};
