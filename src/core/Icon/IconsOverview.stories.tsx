import { Input, makeStyles } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { IconName } from "./base";
import { Icon } from "./Icon";
import { getAvailableIcons } from "./utils";

export default {
  title: "Core/Icon/Icons Overview",
  component: Icon,
  parameters: {
    options: {
      showPanel: false,
    },
  },
};
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    background: "#F5F6F8",
    padding: "1rem",
  },
  search: { width: "18rem", marginBottom: "1rem" },
  iconGroup: { display: "flex", flexWrap: "wrap" },
  iconWrapperRoot: {
    width: "10rem",
    padding: ".8rem",
    margin: "0.2rem",
    textAlign: "center",
    cursor: "pointer",
    border: "1px solid white",
    borderRadius: "0.5rem",
    transition:
      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      boxShadow:
        "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      background: "#FFF",
    },
  },
  iconLabel: {
    paddingTop: "1rem",
    wordBreak: "break-all",
  },
}));

const IconWrapper = ({ name }: { name: IconName }) => {
  const classes = useStyles();

  return (
    <div className={classes.iconWrapperRoot}>
      <Icon name={name} size={"lg"} color="#5B44BA" />
      <div className={classes.iconLabel}>{name}</div>
    </div>
  );
};

const icons = getAvailableIcons().sort((a, b) => a.localeCompare(b));

export const IconsOverview = () => {
  const classes = useStyles();

  const [filter, setFilter] = useState("");

  const searchIcon = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <Input onChange={searchIcon} placeholder="Search icons by name" />
      </div>
      <div className={classes.iconGroup}>
        {icons
          .filter((val) => val.includes(filter))
          .map((i) => {
            return <IconWrapper name={i} key={i} />;
          })}
      </div>
    </div>
  );
};
