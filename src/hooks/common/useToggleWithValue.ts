import { useCallback, useState } from 'react';

export default <T = string>(
  initialValue = false,
): [T | undefined, boolean, (v: T | undefined) => void] => {
  const [selected, setSelected] = useState<T | undefined>(undefined);
  const [value, setter] = useState(initialValue);

  const toggleValue = useCallback(
    (newValue: T | undefined) => {
      setSelected(newValue);
      setter((v) => !v);
    },
    [setter, setSelected],
  );

  return [selected, value, toggleValue];
};
