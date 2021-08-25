import { ParentSize } from "@visx/visx";
import React from "react";
import { CalendarHeatMap } from "./base";
import { ChildCalendarHeatmap } from "./ChildCalendarHeatmap";

// Parent wrapper for the heatamp
//  Here, the parent size (width, size) is calculated and
//  passed to the ChildCalendarHeatmap component
const CalendarHeatmap: React.FC<CalendarHeatMap> = ({ ...rest }) => {
  return (
    <ParentSize>
      {({ width, height }) =>
        // Child component is only rendered when (width,height) > 0
        width > 0 &&
        height > 0 && (
          // All the props are passed to the child component as sent by
          // the user, additonally the (width,height) also added
          <ChildCalendarHeatmap height={height} width={width} {...rest} />
        )
      }
    </ParentSize>
  );
};

export { CalendarHeatmap };
