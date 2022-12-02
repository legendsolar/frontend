// @ts-nocheck

import {
  addHours,
  addMinutes,
  getHours,
  getMinutes,
  subDays,
  differenceInMinutes,
} from "date-fns";
import { useEffect, useState } from "react";
import { GenerationDatum } from "@p/schema";

const resolution_minutes = 30;

export const timeToWattage = (date: Date, max_W: number): number => {
  const noon = new Date(date.toISOString());
  noon.setHours(12, 0, 0, 0);
  const msFromNoon = Math.abs(date.getTime() - noon.getTime());

  const factor = (12 * 60 * 60 * 1000 - msFromNoon) / (12 * 60 * 60 * 1000);

  const c = 20;
  const sig = 1 / (1 + Math.exp(-c * (factor - 0.75)));

  const wattage = sig * (Math.random() / 2 + 0.5);

  return wattage;
};

export const generateFakeProductionData = (
  daysBefore: number,
  max_W: number,
  randomness: number = 1,
  amplitude: number = 1
): Array<GenerationDatum> => {
  const endDate = new Date();

  const startDate = subDays(endDate, daysBefore);

  const N = Math.floor(
    differenceInMinutes(endDate, startDate) / resolution_minutes
  );

  return Array.from({ length: N }, (_, i) => {
    const date = addMinutes(startDate, i * resolution_minutes);
    return {
      time: date.toISOString(),
      wattage: timeToWattage(date, max_W) * amplitude,
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
