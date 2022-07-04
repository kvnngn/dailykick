import { useMemo } from 'react'
import useCurrentUser from './useCurrentUser'

export default (suspense: boolean = true) => {
  const { data: userData } = useCurrentUser(suspense)

  return {
    currentUser: userData,
    currentRole: userData.roles,
  }
}
