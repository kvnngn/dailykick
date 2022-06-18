import { useCallback, useMemo, useState } from 'react';

export default (
  maxStep: number,
): {
  active: number;
  goToPrev: () => void;
  goToNext: () => void;
  isFirst: boolean;
  isLast: boolean;
} => {
  const [active, setActive] = useState(0);
  const goToPrev = useCallback(
    () =>
      setActive((v) => {
        if (v > 0) {
          return v - 1;
        }
        return v;
      }),
    [],
  );
  const goToNext = useCallback(
    () =>
      setActive((v) => {
        if (v < maxStep - 1) {
          return v + 1;
        }
        return v;
      }),
    [maxStep],
  );
  const isFirst = useMemo(() => active === 0, [active]);
  const isLast = useMemo(() => active === maxStep - 1, [active, maxStep]);
  return { active, goToPrev, goToNext, isFirst, isLast };
};
