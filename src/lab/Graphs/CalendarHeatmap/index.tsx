import { useTheme } from "@material-ui/core";
import { Group } from "@visx/group";
import { HeatmapRect } from "@visx/heatmap";
import { getSeededRandom } from "@visx/mock-data";
import genBins, { Bin, Bins } from "@visx/mock-data/lib/generators/genBins";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisTop, localPoint, Tooltip, useTooltip } from "@visx/visx";
import React, { useCallback } from "react";
import { TooltipData, ToolTipDateValue } from "./base";
import { useStyles } from "./styles";

const hot1 = "#77312f";
const hot2 = "#f33d15";
const cool1 = "#ff0000";
const cool2 = "#b4fbde";
const year = 2021;
const nextYear = 2022;
export const background = "white";

const seededRandom = getSeededRandom(0.41);

const binData = genBins(
  /* length = */ 52,
  /* height = */ 7,
  /** binFunc */ (idx) => idx,
  /** countFunc */ (i, number) => 25 * (number - i)
);

binData[0].bins[0].count = -1;
binData[0].bins[1].count = -1;
binData[0].bins[2].count = -1;

binData[51].bins[5].count = -1;
binData[51].bins[6].count = -1;

binData[25].bins[2].count = 0;
binData[25].bins[3].count = 0;
binData[25].bins[4].count = 0;

binData[25].bins[5].count = 0;
binData[25].bins[6].count = 0;

const firstDay = new Date(year, 0, 1);
const lastDay = new Date(nextYear, 0, 1);

console.log("bindata:", binData);

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.min(...data.map(value));
}
//
const dayList = ["Sat", "Fri", "Thu", "Wed", "Tue", "Mon", "Sun"];
const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// accessors
const bins = (d: Bins) => d.bins;
const count = (d: Bin) => d.count;

const colorMax = max(binData, (d) => max(bins(d), count));
const bucketSizeMax = max(binData, (d) => bins(d).length);

// scales
const xScale = scaleLinear<number>({
  domain: [0, binData.length],
});
const yScale = scaleLinear<number>({
  domain: [0, bucketSizeMax - 1],
});
const circleColorScale = scaleLinear<string>({
  range: [hot1, hot2],
  domain: [1, colorMax],
});
const rectColorScale = scaleLinear<string>({
  range: [cool1, cool2],
  domain: [1, colorMax],
});
const opacityScale = scaleLinear<number>({
  range: [0.1, 1],
  domain: [0, colorMax],
});

export type HeatmapProps = {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
};

const defaultMargin = { top: 40, left: 40, right: 20, bottom: 110 };

const CalendarHeatmap = ({
  width = 600,
  height = 250,
  events = false,
  margin = defaultMargin,
  separation = 50,
}: HeatmapProps) => {
  const classes = useStyles();
  // bounds
  const size =
    width > margin.left + margin.right
      ? width - margin.left - margin.right - separation
      : width;
  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / binData.length;
  const binHeight = yMax / bucketSizeMax;
  const radius = min([binWidth, binHeight], (d) => d) / 2;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);
  // for (let i = 0; i < firstDay.getDay(); i++) {
  //   binData[0].bins[i].count = -1;
  // }
  const filteredBinData = binData;
  const { palette } = useTheme();

  const axisBottomTickLabelProps = {
    dy: "-0.3rem",
    textAnchor: "middle" as const,
    fontFamily: "Ubuntu",
    fontSize: "12px",
    fontWeight: 400,
    fill: palette.text.hint,
    lineHeight: "12px",
  };
  const yLabelProps = {
    fontFamily: "Ubuntu",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "12px",
    fill: palette.text.primary,
    background: "red",
  };
  const axisLeftTickLabelProps = {
    dy: "0.3rem",
    dx: "-0.3rem",
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontSize: "10px",
    textAnchor: "end" as const,
    lineHeight: "12px",
    fill: palette.text.hint,
  };
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>({
    tooltipOpen: true,
  });

  // tooltip handler

  const handleTooltip = useCallback(
    (
      event: React.MouseEvent<SVGRectElement>,
      count: number | null | undefined
    ) => {
      console.log("tolltip", event.clientX, ":", count);
      let pointerDataSelection: ToolTipDateValue[] = [
        { data: { date: NaN, value: NaN }, baseColor: "" },
      ];
      let { x, y } = localPoint(event) || { x: 0, y: 0 };
      x -= margin.left;
      y -= margin.top;
      pointerDataSelection = [
        {
          data: {
            date: 1000,
            value: typeof count === "number" && count ? count : 0,
          },
          baseColor: "redf",
        },
      ];
      console.log("poinsterData", pointerDataSelection);
      showTooltip({
        tooltipData: pointerDataSelection,
        tooltipLeft: x,
        tooltipTop: y,
      });
    },

    [margin.left, margin.top, showTooltip]
  );

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height - margin.bottom + 40}
          rx={14}
          fill={background}
        />
        <Group top={margin.top} left={margin.left}>
          <AxisLeft
            // hideZero
            hideAxisLine
            hideTicks
            scale={yScale}
            numTicks={7}
            stroke={palette.text.primary}
            tickFormat={(num) => `${dayList[num.valueOf()]}`}
            tickLabelProps={() => axisLeftTickLabelProps}
            labelProps={yLabelProps}
            left={0}
            labelOffset={40}
          />
          <AxisTop
            hideTicks
            hideAxisLine
            top={-10}
            // tickFormat={(num) => `${num.valueOf()}`}
            tickFormat={(num) =>
              `${
                monthList[
                  num === 0 ? 0 : Math.ceil((num.valueOf() * 7) / 30) - 1
                ]
              }`
            }
            scale={xScale}
            numTicks={10}
            // stroke={palette.text.primary}
            tickLabelProps={() => axisBottomTickLabelProps}
          />
          <HeatmapRect
            data={filteredBinData}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            colorScale={rectColorScale}
            opacityScale={opacityScale}
            binWidth={binWidth}
            binHeight={binWidth}
            gap={2}
          >
            {(heatmap) =>
              heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => {
                  return (
                    bin &&
                    typeof bin.count === "number" &&
                    bin.count >= 0 && (
                      <rect
                        onMouseEnter={(event) =>
                          handleTooltip(event, bin.count)
                        }
                        onMouseLeave={() => hideTooltip()}
                        key={`heatmap-rect-${bin.row}-${bin.column}`}
                        width={bin.width}
                        height={bin.height}
                        x={bin.x}
                        y={yMax - bin.y}
                        fill={bin.count === 0 ? "grey" : bin.color}
                        // fillOpacity={bin.count === 0 ? 0.2 : bin.opacity}
                        fillOpacity={1}
                        onClick={() => {
                          console.log("click", bin);
                        }}
                        rx="2"
                      />
                    )
                  );
                })
              )
            }
          </HeatmapRect>
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip
          top={tooltipTop - 15}
          left={tooltipLeft - binWidth}
          className={classes.tooltipDateStyles}
        >
          <div className={`${classes.tooltipBottomDate}`}>
            <span>{`${tooltipData[0].data.value}: data-1`}</span>
          </div>
          <div className={`${classes.tooltipBottomDate}`}>
            <span>{`${tooltipData[0].data.value}: data-2`}</span>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export { CalendarHeatmap };
