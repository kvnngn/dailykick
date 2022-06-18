import { useMemo } from 'react';
import useCurrentUser from './useCurrentUser';

export default (suspense: boolean = true) => {
  const { data: userData } = useCurrentUser(suspense);

  const currentRole = useMemo(() => {
    if (userData && userData.roles) {
      return userData.roles[0];
    }
    return 'No role';
  }, [userData]);

  return {
    currentUser: userData,
    currentRole
  };
};
