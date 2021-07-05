import { Typography, useTheme } from "@material-ui/core";
import {
  AxisLeft,
  Group,
  HeatmapRect,
  scaleLinear,
  Tooltip,
  useTooltip,
} from "@visx/visx";
import React, { useCallback, useState } from "react";
import {
  CalendarHeatMapChildProps,
  CalendarHeatmapTooltipProps,
  DayData,
  ToolTipValue,
  WeekData,
} from "./base";
import { useStyles } from "./styles";
import { dayList, getColorIndex, monthList } from "./utils";

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

// accessors
const bins = (d: WeekData) => d.bins;

const ChildCalendarHeatmap = ({
  width = 1000,
  height = 140,
  binWidth = 17.9,
  binHeight = 17.9,
  calendarHeatmapMetric,
  margin = { top: 10, left: 40, right: 10, bottom: 20 },
  valueThreshold = [],
  colorMap,
  CalendarHeatmapTooltip = ({ tooltipData }: CalendarHeatmapTooltipProps) => {
    return (
      <div>
        <div style={{ marginBottom: "0.2rem" }}>
          {tooltipData?.data?.bin?.bin.value}
        </div>
        <div>{tooltipData?.data?.bin?.bin.workflowCount}</div>
      </div>
    );
  },
  handleBinClick,
}: CalendarHeatMapChildProps) => {
  const classes = useStyles({ width, height, margin });
  const { palette } = useTheme();
  // Tooltip variables
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<ToolTipValue>({
    tooltipOpen: true,
  });
  const [currentSelectedBin, setCurrentSelectedBin] = useState<string>("");
  const [currentSelectedColor, setCurrentSelectedColor] = useState<string>("");
  const minValue = 0;
  const maxValue = 100;

  const bucketSizeMax = max(calendarHeatmapMetric, (d) => bins(d).length);

  const colorRange = colorMap ?? palette.graph.calendarHeatmap;
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
      ? width - margin.left - margin.right
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

  // tooltip handler

  const handleTooltip = useCallback(
    (event: React.MouseEvent<SVGRectElement>, bin: any) => {
      let pointerDataSelection: ToolTipValue = { data: { value: NaN } };
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

    [showTooltip, yMax]
  );
  if (calendarHeatmapMetric.length === 0 || !calendarHeatmapMetric) {
    return null;
  }
  return width < 10 ? null : (
    <div className={classes.root}>
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
            count={(bin: DayData) => bin.value ?? NaN}
            binWidth={binWidth}
            binHeight={binHeight}
            gap={2.5}
          >
            {(heatmap) => {
              return heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => {
                  const selectedColor =
                    currentSelectedBin ===
                    `heatmap-rect-id-${bin.row}-${bin.column}`
                      ? bin &&
                        bin?.count &&
                        bin.count >= minValue &&
                        bin.count <= maxValue
                        ? colorRange[
                            getColorIndex(bin.count, valueThreshold)
                          ] ?? "lightGrey"
                        : palette.graph.calendarHeatmap[10]
                      : colorRange[
                          getColorIndex(bin.count ?? 0, valueThreshold)
                        ] ?? "lightGrey";
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
                        fill={selectedColor}
                        filter={
                          currentSelectedBin ===
                          `heatmap-rect-id-${bin.row}-${bin.column}`
                            ? "url(#inset)"
                            : ""
                        }
                        fillOpacity={
                          currentSelectedBin ===
                          `heatmap-rect-id-${bin.row}-${bin.column}`
                            ? 1
                            : currentSelectedBin === ""
                            ? 1
                            : 0.45
                        }
                        strokeWidth={4}
                        onClick={(e) => {
                          if (
                            currentSelectedBin !==
                            `heatmap-rect-id-${bin.row}-${bin.column}`
                          ) {
                            setCurrentSelectedBin(
                              e.currentTarget.getAttribute("id")?.toString() ??
                                ""
                            );
                            setCurrentSelectedColor(selectedColor);
                            handleBinClick?.(bin);
                          } else {
                            setCurrentSelectedColor("");
                            setCurrentSelectedBin("");
                            handleBinClick?.("");
                          }
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
          unstyled={false}
          top={tooltipTop}
          left={tooltipLeft}
          className={classes.tooltipStyles}
        >
          <CalendarHeatmapTooltip tooltipData={tooltipData} />
        </Tooltip>
      )}
    </div>
  );
};

export { ChildCalendarHeatmap };
