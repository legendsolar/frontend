import { useChartDimensions } from "../../hooks/use_chart_dimensions";

const chartSettings = {
    marginLeft: 75,
};
const ChartWithDimensions = () => {
    const [ref, dms] = useChartDimensions(chartSettings);

    const xScale = useMemo(
        () => d3.scaleLinear().domain([0, 100]).range([0, dms.boundedWidth]),
        [dms.boundedWidth]
    );

    return (
        <div className="Chart__wrapper" ref={ref} style={{ height: "200px" }}>
            <svg width={dms.width} height={dms.height}>
                <g
                    transform={`translate(${[
                        dms.marginLeft,
                        dms.marginTop,
                    ].join(",")})`}
                >
                    <rect
                        width={dms.boundedWidth}
                        height={dms.boundedHeight}
                        fill="lavender"
                    />
                    <g
                        transform={`translate(${[0, dms.boundedHeight].join(
                            ","
                        )})`}
                    >
                        <Axis domain={xScale.domain()} range={xScale.range()} />
                    </g>
                </g>
            </svg>
        </div>
    );
};
