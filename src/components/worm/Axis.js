import { useMemo } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

const Axis = ({ domain = [0, 100], range = [10, 290] }) => {
    const ticks = useMemo(() => {
        const xScale = d3.scaleLinear().domain(domain).range(range);

        const width = range[1] - range[0];
        const pixelsPerTick = 50;
        const numberOfTicksTarget = Math.max(
            1,
            Math.floor(width / pixelsPerTick)
        );

        return xScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            xOffset: xScale(value),
        }));
    }, [domain.join("-"), range.join("-")]);

    return (
        <svg>
            {ticks.map(({ value, xOffset }) => (
                <g key={value} transform={`translate(${xOffset}, 0)`}>
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)",
                        }}
                    >
                        {format(new Date(parseInt(value)), "EEEE")}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default Axis;
