import { useCallback, useState } from 'react';

export default (
  initialValue = false,
): [boolean, () => void, (v: boolean) => void] => {
  const [value, setter] = useState(initialValue);

  const toggleValue = useCallback(() => {
    setter((v) => !v);
  }, [setter]);

  const setValue = useCallback(
    (v: boolean) => {
      setter(v);
    },
    [setter],
  );

  return [value, toggleValue, setValue];
};
