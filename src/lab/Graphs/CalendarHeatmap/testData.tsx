import React from "react";
import { CalendarHeatmapTooltipProps } from ".";
import { WeekData } from "./base";

const TestCalendarHeatmapTooltip = ({
  tooltipData,
}: CalendarHeatmapTooltipProps): React.ReactElement => {
  return (
    <div>
      <div style={{ marginBottom: "0.2rem" }}>
        {tooltipData?.data?.bin?.bin.value}% Average Resiliency
      </div>
      <div>{tooltipData?.data?.bin?.bin.workflowCount} runs</div>
    </div>
  );
};

const testData: Array<WeekData> = [
  {
    bins: [
      { value: -1 },
      { value: -1 },
      { value: -1 },
      { value: -1 },
      { value: undefined },
      { value: undefined },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: 0, workflowCount: 10 },
      { value: 14, workflowCount: 10 },
      { value: 27, workflowCount: 10 },
      { value: 40, workflowCount: 10 },
      { value: 50, workflowCount: 10 },
      { value: 60, workflowCount: 10 },
      { value: 70, workflowCount: 10 },
    ],
  },
  {
    bins: [
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: 60 },
      { value: 70 },
      { value: 80 },
      { value: 90 },
      { value: 99 },
      { value: 100 },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: 20 },
      { value: 20 },
      { value: 20 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 40 },
    ],
  },
  {
    bins: [
      { value: 20 },
      { value: 20 },
      { value: 20 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 70 },
      { value: 80 },
      { value: 90 },
      { value: 100 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 100 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: undefined },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: undefined },
      { value: undefined },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 10 },
      { value: undefined },
      { value: 10 },
      { value: 10 },
      { value: 10 },
      { value: 1 },
    ],
  },
  {
    bins: [
      { value: 0 },
      { value: 14 },
      { value: 27 },
      { value: 40 },
      { value: 50 },
      { value: 60 },
      { value: 70 },
    ],
  },
  {
    bins: [
      { value: 80 },
      { value: 90 },
      { value: 100 },
      { value: 0 },
      { value: 15 },
      { value: 25 },
      { value: 40 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 20 },
      { value: 30 },
      { value: 40 },
      { value: 50 },
      { value: 50 },
      { value: 50 },
    ],
  },
  {
    bins: [
      { value: 60 },
      { value: 70 },
      { value: 80 },
      { value: 90 },
      { value: 99 },
      { value: 100 },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: 20 },
      { value: 20 },
      { value: 20 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 40 },
    ],
  },
  {
    bins: [
      { value: 20 },
      { value: 20 },
      { value: 20 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 70 },
      { value: 80 },
      { value: 90 },
      { value: 100 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 100 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
    ],
  },
  {
    bins: [
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: undefined },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 14 },
      { value: 25 },
      { value: 10 },
      { value: 15 },
      { value: 25 },
      { value: 10 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 10 },
      { value: undefined },
      { value: 10 },
      { value: 10 },
      { value: 10 },
      { value: 1 },
    ],
  },
  {
    bins: [
      { value: 0 },
      { value: 14 },
      { value: 27 },
      { value: 40 },
      { value: 50 },
      { value: 60 },
      { value: 70 },
    ],
  },
  {
    bins: [
      { value: 80 },
      { value: 90 },
      { value: 100 },
      { value: 0 },
      { value: 15 },
      { value: 25 },
      { value: 40 },
    ],
  },
  {
    bins: [
      { value: 10 },
      { value: 20 },
      { value: 30 },
      { value: 40 },
      { value: 50 },
      { value: 50 },
      { value: 50 },
    ],
  },
  {
    bins: [
      { value: 0 },
      { value: 5 },
      { value: 10 },
      { value: 15 },
      { value: 20 },
      { value: 25 },
      { value: 30 },
    ],
  },
  {
    bins: [
      { value: 35 },
      { value: 40 },
      { value: 45 },
      { value: 50 },
      { value: 55 },
      { value: 60 },
      { value: 65 },
    ],
  },
  {
    bins: [
      { value: 70 },
      { value: 75 },
      { value: 80 },
      { value: 85 },
      { value: 90 },
      { value: 95 },
      { value: 100 },
    ],
  },
];
export { testData, TestCalendarHeatmapTooltip };
