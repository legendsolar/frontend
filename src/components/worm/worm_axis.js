import { useMemo } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

const WormAxis = ({
    domain = [0, 100],
    range = [10, 290],
    data = null,
    xAccessor,
    yAccessor,
}) => {
    const ticks = useMemo(() => {
        const xScale = d3.scaleLinear().domain(domain).range(range);

        const width = range[1] - range[0];
        const pixelsPerTick = 40;
        const tickMargin = 10;

        const ticks = {};

        // find daily max
        data.forEach((d) => {
            const date = format(new Date(xAccessor(d)), "P");
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
    }, [domain.join("-"), range.join("-"), data]);

    return (
        <svg>
            {Object.entries(ticks).map(([key, tick]) => (
                <g
                    key={tick.value.getTime()}
                    transform={`translate(${tick.xOffset}, 0)`}
                >
                    <text
                        key={tick.value.getTime()}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)",
                        }}
                    >
                        {format(tick.value, "EEEE")}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default WormAxis;
