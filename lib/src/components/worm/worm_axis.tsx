// @ts-nocheck

import { useMemo } from 'react';
import * as d3 from 'd3';
import { isToday, format } from 'date-fns';
import { GenerationDatum } from 'schema/schema_gen_types';

export interface WormAxisProps {
  domain: Array<number>;
  range: Array<number>;
  data: Array<GenerationDatum>;
  xAccessor(d: GenerationDatum): number;
  yAccessor(d: GenerationDatum): Date;
}

const WormAxis = ({
  domain = [0, 100],
  range = [10, 290],
  data = [],
  xAccessor,
  yAccessor,
}: WormAxisProps) => {
  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domain).range(range);

    const width = range[1] - range[0];
    const pixelsPerTick = 40;
    const tickMargin = 10;

    const ticks = {};

    // find daily max
    data.forEach((d) => {
      const date = format(new Date(xAccessor(d)), 'P');
      if (ticks[date]) {
        if (yAccessor(d) > ticks[date].yValue) {
          ticks[date].yValue = yAccessor(d);
          ticks[date].value = xAccessor(d);
          ticks[date].xOffset = xScale(xAccessor(d));
        }
      } else {
        ticks[date] = {};
        ticks[date].yValue = yAccessor(d);
        ticks[date].value = xAccessor(d);
        ticks[date].xOffset = xScale(xAccessor(d));
      }
    });

    const leftEdgeRemovedTicks = {};

    Object.entries(ticks).map(([key, tick]) => {
      if (tick.xOffset > pixelsPerTick + tickMargin) {
        leftEdgeRemovedTicks[key] = tick;
      }
    });

    return leftEdgeRemovedTicks;
  }, [domain.join('-'), range.join('-'), data]);

  const tickArray = Object.entries(ticks);

  const getTickString = (date, index) => {
    if (isToday(date) && index === tickArray.length - 1) {
      return 'Today';
    }

    return format(date, 'EEEE');
  };

  return (
    <svg>
      {tickArray.map(([key, tick], index) => (
        <g
          key={tick.value.getTime()}
          transform={`translate(${tick.xOffset}, 0)`}
        >
          <text
            key={tick.value.getTime()}
            style={{
              fontSize: '12px',
              fontFamily: 'Be Vietnam Pro',
              textAnchor: 'middle',
              transform: 'translateY(40px)',
              fontWeight: index === tickArray.length - 1 ? 'bold' : 'normal',
            }}
          >
            {getTickString(tick.value, index)}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default WormAxis;
