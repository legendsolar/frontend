// @ts-nocheck

import { addHours, getHours, getMinutes, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { GenerationDatum } from 'schema/schema_gen_types';

export const generateFakeProductionData = (
  daysBefore: number,
  max_W: number,
  randomness: number = 1,
  amplitude: number = 1
): Array<GenerationDatum> => {
  const N = 100;

  const now = new Date();

  const start = subDays(now, daysBefore);

  const interval = (now.getTime() - start.getTime()) / N;

  return Array.from({ length: N }, (_, i) => {
    return {
      time: new Date(start.getTime() + interval * i).toISOString(),
      wattage:
        max_W *
        Math.pow(
          Math.cos(
            (i / N) * Math.PI * daysBefore + Math.random() * randomness
          ) * amplitude,
          4
        ),
    };
  });
};

export const useAnimatedProductionData = (
  daysBefore: number,
  max_W: number
): Array<GenerationDatum> => {
  const N = 100;

  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    setTimeout(() => {
      setNow(addHours(now, 1));
    }, 100);
  }, [now]);

  const start = subDays(now, daysBefore);

  const interval = (now.getTime() - start.getTime()) / N;

  return Array.from({ length: N }, (_, i) => {
    const time = new Date(start.getTime() + interval * i);
    const fromNoonNorm =
      1 -
      Math.abs(12 * 60 - getHours(time) * 60 + getMinutes(time)) / (12 * 60);

    return {
      time: time.toISOString(),
      wattage: max_W * Math.pow(fromNoonNorm, 4),
    };
  });
};
