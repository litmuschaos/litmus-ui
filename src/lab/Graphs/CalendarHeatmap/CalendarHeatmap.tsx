import { Typography, useTheme } from "@material-ui/core";
import { Group } from "@visx/group";
import { HeatmapRect } from "@visx/heatmap";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, Tooltip, useTooltip } from "@visx/visx";
import React, { useCallback, useState } from "react";
import { DayData, TooltipData, ToolTipDateValue, WeekData } from "./base";
import { useStyles } from "./styles";
import { dayList, getColorIndex, monthList } from "./utils";

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

// accessors
const bins = (d: WeekData) => d.bins;

export type CalendarHeatmapTooltipProps = {
  tooltipData: ToolTipDateValue;
};
export type HeatmapProps = {
  width?: number;
  height?: number;
  binWidth?: number;
  binHeight?: number;
  calendarHeatmapMetric: Array<WeekData>;
  margin?: { top: number; right: number; bottom: number; left: number };
  valueThreshold: Array<number>;
  colorRange: Array<string>;
  handleBinClick?: (bin: any) => void;
  CalendarHeatmapTooltip: ({
    tooltipData,
  }: CalendarHeatmapTooltipProps) => JSX.Element;
  separation?: number;
};

const CalendarHeatmap = ({
  width = 1000,
  height = 140,
  binWidth = 17.9,
  binHeight = 17.9,
  calendarHeatmapMetric,
  margin = { top: 10, left: 40, right: 10, bottom: 20 },
  valueThreshold = [],
  colorRange = [],
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
  const classes = useStyles({ width, height, separation, margin });
  const { palette } = useTheme();
  const minValue = 0;
  const maxValue = 100;
  const [currentHovered, setcurrentHovered] = useState<string>("");
  const [currentSelectedColor, setCurrentSelectedColor] = useState<string>("");

  const bucketSizeMax = max(calendarHeatmapMetric, (d) => bins(d).length);

  // scales
  const xScale = scaleLinear<number>({
    domain: [0, calendarHeatmapMetric.length],
  });
  const yScale = scaleLinear<number>({
    domain: [0, bucketSizeMax - 1],
  });
  // bounds
  const size =
    width > margin.left + margin.right
      ? width - margin.left - margin.right - separation
      : width;
  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

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

  // Tooltip variables
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

    [margin.left, margin.top, showTooltip, yMax]
  );
  console.log("current color", currentSelectedColor);
  return width < 10 ? null : (
    <div>
      <Group top={margin.top} left={margin.left}>
        <div className={classes.xAxis}>
          {monthList &&
            monthList.map((month) => {
              return (
                <Typography
                  key={`${month}-heatmap`}
                  className={classes.xAxisLabels}
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
          <defs>
            <filter id="inset" x="-50%" y="-50%" width="200%" height="200%">
              <feFlood
                floodColor={currentSelectedColor ?? "red"}
                result="outside-color"
              />
              <feMorphology in="SourceAlpha" operator="dilate" radius="1" />
              <feComposite
                in="outside-color"
                operator="in"
                result="outside-stroke"
              />

              <feFlood
                floodColor={palette.background.paper}
                result="inside-color"
              />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="inside-stroke"
              />

              <feMorphology in="SourceAlpha" radius="1.5" />
              <feComposite
                in="SourceGraphic"
                operator="in"
                result="fill-area"
              />

              <feMerge>
                <feMergeNode in="outside-stroke" />
                <feMergeNode in="inside-stroke" />
                <feMergeNode in="fill-area" />
              </feMerge>
            </filter>
          </defs>
          <HeatmapRect
            data={calendarHeatmapMetric}
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
                        id={`heatmap-rect-id-${bin.row}-${bin.column}`}
                        width={bin.width}
                        height={bin.height}
                        x={bin.x}
                        y={yMax - bin.y}
                        fill={
                          currentHovered ===
                          `heatmap-rect-id-${bin.row}-${bin.column}`
                            ? bin.count >= minValue && bin.count <= maxValue
                              ? colorRange[
                                  getColorIndex(bin.count, valueThreshold)
                                ] ?? "lightGrey"
                              : palette.graph.calendarHeatmap[10]
                            : colorRange[
                                getColorIndex(bin.count, valueThreshold)
                              ] ?? "lightGrey"
                        }
                        filter={
                          currentHovered ===
                          `heatmap-rect-id-${bin.row}-${bin.column}`
                            ? "url(#inset)"
                            : ""
                        }
                        fillOpacity={
                          currentHovered ===
                          `heatmap-rect-id-${bin.row}-${bin.column}`
                            ? 1
                            : currentHovered === ""
                            ? 1
                            : 0.5
                        }
                        strokeWidth={4}
                        onClick={(e) => {
                          if (
                            currentHovered !==
                            `heatmap-rect-id-${bin.row}-${bin.column}`
                          ) {
                            setcurrentHovered(
                              e.currentTarget.getAttribute("id")?.toString() ??
                                ""
                            );
                            const selectedColor =
                              currentHovered ===
                              `heatmap-rect-id-${bin.row}-${bin.column}`
                                ? bin.count &&
                                  bin.count >= minValue &&
                                  bin.count <= maxValue
                                  ? colorRange[
                                      getColorIndex(bin.count, valueThreshold)
                                    ] ?? "lightGrey"
                                  : palette.graph.calendarHeatmap[10]
                                : colorRange[
                                    getColorIndex(
                                      bin?.count ?? 0,
                                      valueThreshold
                                    )
                                  ] ?? "lightGrey";
                            setCurrentSelectedColor(selectedColor);
                          } else {
                            setCurrentSelectedColor("");
                            setcurrentHovered("");
                          }
                          handleBinClick?.(bin);
                        }}
                        rx={"4.95"}
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
          className={classes.tooltipStyles}
        >
          <CalendarHeatmapTooltip tooltipData={tooltipData} />
        </Tooltip>
      )}
    </div>
  );
};

export { CalendarHeatmap };
