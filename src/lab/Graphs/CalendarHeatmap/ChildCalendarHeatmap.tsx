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

// The heatmap contains buckets (or columns) and every bucket contains bins (or rows)
// max function here calculates the maximum number of bins among all the
// given buckets
function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

// accessors
const bins = (d: WeekData) => d.bins;

const ChildCalendarHeatmap = ({
  width = 1000,
  height = 140,
  // As per design the binWidth and binHeight as a default value
  // but this can be overridden as per design changes
  binWidth = 17.9,
  binHeight = 17.9,
  calendarHeatmapMetric,
  margin = { top: 10, left: 40, right: 10, bottom: 20 },
  valueThreshold = [],
  colorMap,
  // Tooltip here has been kept generic
  // tooltipData is passed to the tooltip so that user can
  // render the tooltip as per latest design
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
  // As per given Litmus use case, the percentage will be between 0-100
  const minValue = 0;
  const maxValue = 100;
  // To calculate the max number of bins among all the buckets
  // this varialble will be helpful for future designs for
  // render a different dimension of heatmap
  const bucketSizeMax = max(calendarHeatmapMetric, (d) => bins(d).length);

  // Array of colors as per the interval of the values
  // this may be passed by the user or it will take palette.graph.calendarHeatmap
  // colors by default
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

  // y-axis label props as per visx
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
      // Storing the data of the selected bin
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
  // Check if data is present in the calendarHeatmapMetric
  if (calendarHeatmapMetric.length === 0 || !calendarHeatmapMetric) {
    return null;
  }
  return width < 10 ? null : (
    <div className={classes.root}>
      {/* Print all the months on top */}
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
          {/* Filter for giving border to the bin for the case when it is selected */}
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
                  // First check whether the particular bin is elected or not
                  // then check whether it contains valid data or not
                  // if data is valid then give it appropriate color
                  // as per color array
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
                        ] ?? "lightGrey"; // lightGrey is a fallback color

                  return (
                    // First check whether bin is valid or not
                    // also any bin with value -1 is not rendered
                    // this is done to handle the cases when the calendar
                    // is starting from lets say Wednesday, so from Sunday to
                    // Tuesday the metric will have value -1
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
                        // set filter based on whether user has selected it or not
                        filter={
                          currentSelectedBin ===
                          `heatmap-rect-id-${bin.row}-${bin.column}`
                            ? "url(#inset)"
                            : ""
                        }
                        // set opacity based on whether user has selected it or not
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
                            // if the bin which is clicked was not selected
                            // previously then select it
                            setCurrentSelectedBin(
                              e.currentTarget.getAttribute("id")?.toString() ??
                                ""
                            );
                            setCurrentSelectedColor(selectedColor);
                            handleBinClick?.(bin);
                          } else {
                            // if the bin which is clicked was selected
                            // previously then deselect it
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
        // Tooltip
        <Tooltip
          unstyled={false}
          top={tooltipTop}
          left={tooltipLeft}
          className={classes.tooltipStyles}
        >
          {/* Render tooltip as passed by the user */}
          <CalendarHeatmapTooltip tooltipData={tooltipData} />
        </Tooltip>
      )}
    </div>
  );
};

export { ChildCalendarHeatmap };
