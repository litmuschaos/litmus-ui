import { Input, useTheme } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { getAvailableIcons, IconName } from "./base";
import { Icon } from "./Icon";

export default {
  title: "Core/Icon/Overview",
  component: Icon,
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

const IconWrapper = ({ name }: { name: IconName }) => {
  const theme = useTheme();
  const borderColor = theme.palette.background.default;

  return (
    <div
      style={{
        width: "150px",
        padding: "12px",
        border: `1px solid ${borderColor}`,
        textAlign: "center",
      }}
    >
      <Icon name={name} />
      <div
        style={{
          paddingTop: "16px",
          wordBreak: "break-all",
        }}
      >
        {name}
      </div>
    </div>
  );
};

const icons = getAvailableIcons().sort((a, b) => a.localeCompare(b));

export const IconsOverview = () => {
  const [filter, setFilter] = useState("");

  const searchIcon = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "300px",
        }}
      >
        <Input onChange={searchIcon} placeholder="Search icons by name" />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {icons
          .filter((val) => val.includes(filter))
          .map((i) => {
            return <IconWrapper name={i} key={i} />;
          })}
      </div>
    </div>
  );
};
