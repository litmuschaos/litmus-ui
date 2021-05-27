import { ParentSize } from "@visx/visx";
import React from "react";
import { CalendarHeatMap } from "./base";
import { ChildCalendarHeatmap } from "./ChildCalendarHeatmap";

const CalendarHeatmap: React.FC<CalendarHeatMap> = ({ ...rest }) => {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 &&
        height > 0 && (
          <ChildCalendarHeatmap height={height} width={width} {...rest} />
        )
      }
    </ParentSize>
  );
};

export { CalendarHeatmap };
