import { Typography, useTheme } from "@material-ui/core";
import { Group } from "@visx/group";
import { HeatmapRect } from "@visx/heatmap";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, Tooltip, useTooltip } from "@visx/visx";
import React, { useCallback } from "react";
import { DayData, TooltipData, ToolTipDateValue, WeekData } from "./base";
import { useStyles } from "./styles";
import { testData2 } from "./testData";
import { getColorIndex } from "./utils";

const localBinData = testData2;

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

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
const bins = (d: WeekData) => d.bins;
const bucketSizeMax = max(localBinData, (d) => bins(d).length);

// scales
const xScale = scaleLinear<number>({
  domain: [0, localBinData.length],
});
const yScale = scaleLinear<number>({
  domain: [0, bucketSizeMax - 1],
});
export type CalendarHeatmapTooltipProps = {
  tooltipData: ToolTipDateValue;
};
export type HeatmapProps = {
  width?: number;
  height?: number;
  binWidth?: number;
  binHeight?: number;

  margin?: { top: number; right: number; bottom: number; left: number };
  valueThreshold: Array<number>;
  colorRange: Array<string>;
  handleBinClick?: () => void;
  CalendarHeatmapTooltip: ({
    tooltipData,
  }: CalendarHeatmapTooltipProps) => JSX.Element;
  separation?: number;
};

const CalendarHeatmap = ({
  width = 1100,
  height = 140,
  binWidth = 17.9,
  binHeight = 17.9,
  margin = { top: 10, left: 40, right: 10, bottom: 20 },
  valueThreshold = [13, 26, 39, 49, 59, 69, 79, 89, 100],
  colorRange = [
    "#FD6868",
    "#FE9A9A",
    "#FDB4B4",
    "#EECC91",
    "#E3AD4F",
    "#E79F32",
    "#9BE9A8",
    "#40C463",
    "#109B67",
    "#E5E7F1",
  ],
  CalendarHeatmapTooltip = ({ tooltipData }: CalendarHeatmapTooltipProps) => {
    return (
      <div>
        <div style={{ marginBottom: "0.2rem" }}>
          {tooltipData?.data?.bin?.bin.value}% Average Resiliency
        </div>
        <div>{tooltipData?.data?.bin?.bin.workflowCount} runs</div>
      </div>
    );
  },
  separation = 0,
  handleBinClick,
}: HeatmapProps) => {
  const classes = useStyles();
  const { palette } = useTheme();

  // bounds
  const size =
    width > margin.left + margin.right
      ? width - margin.left - margin.right - separation
      : width;
  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  const filteredBinData = testData2;

  const axisLeftTickLabelProps = {
    dy: "0.3rem",
    dx: "-0.3rem",
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.275rem",
    textAnchor: "end" as const,
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
    (event: React.MouseEvent<SVGRectElement>, bin: any) => {
      let pointerDataSelection: ToolTipDateValue = { data: { value: NaN } };
      const x = bin.x;
      const y = yMax - bin.y;
      pointerDataSelection = {
        data: {
          bin: bin,
        },
      };

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
      <Group top={margin.top} left={margin.left}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: width - separation,
            paddingLeft: margin.left,
            marginRight: margin.right,
            background: palette.background.paper,
          }}
        >
          {monthList &&
            monthList.map((month) => {
              return (
                <Typography
                  style={{
                    color: palette.text.primary,
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    lineHeight: "1.275rem",
                  }}
                >
                  {month}
                </Typography>
              );
            })}
        </div>
      </Group>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height - margin.bottom + 40}
          rx={0}
          fill={palette.background.paper}
        />
        <Group top={margin.top} left={margin.left}>
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={yScale}
            numTicks={3}
            stroke={palette.text.primary}
            tickFormat={(num) => `${dayList[num.valueOf()]}`}
            tickLabelProps={() => axisLeftTickLabelProps}
          />

          <HeatmapRect
            data={filteredBinData}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            count={(bin: DayData) => bin.value}
            binWidth={binWidth}
            binHeight={binHeight}
            gap={2.5}
          >
            {(heatmap) => {
              return heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => {
                  return (
                    bin &&
                    typeof bin.count === "number" &&
                    (bin.count > -1 || !bin.count) && (
                      <rect
                        onMouseEnter={(event) => handleTooltip(event, bin)}
                        onMouseLeave={() => hideTooltip()}
                        key={`heatmap-rect-${bin.row}-${bin.column}`}
                        width={bin.width}
                        height={bin.height}
                        x={bin.x}
                        y={yMax - bin.y}
                        fill={
                          colorRange[getColorIndex(bin.count, valueThreshold)]
                        }
                        fillOpacity={1}
                        onClick={handleBinClick}
                        rx="4.95"
                      />
                    )
                  );
                })
              );
            }}
          </HeatmapRect>
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip
          top={tooltipTop - binHeight}
          left={tooltipLeft}
          className={classes.tooltipDateStyles}
        >
          <CalendarHeatmapTooltip tooltipData={tooltipData} />
        </Tooltip>
      )}
    </div>
  );
};

export { CalendarHeatmap };
