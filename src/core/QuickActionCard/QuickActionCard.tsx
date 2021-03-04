import { List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { QuickActionCardProps, QuickActionCardPropsArray } from "./base";
import { useStyles } from "./styles";

const QuickActionItems: React.FC<QuickActionCardProps> = ({
  src,
  onClick,
  alt,
  text,
}) => {
  const classes = useStyles();
  return (
    <ListItem button onClick={onClick} className={classes.listItems}>
      <img src={src} alt={alt} />
      <Typography className={classes.singleActionLink}>{text}</Typography>
    </ListItem>
  );
};

const QuickActionCard: React.FC<QuickActionCardPropsArray> = ({
  quickActions,
  title,
  className,
}) => {
  const classes = useStyles();

  return (
    <div
      data-testid="quickActionCardComponent"
      className={`${classes.quickActionCard} ${className}`}
    >
      <Typography className={classes.title}>{title}</Typography>

      <List>
        {quickActions.map((quickAction) => (
          <QuickActionItems key={quickAction.alt} {...quickAction} />
        ))}
      </List>
    </div>
  );
};

export { QuickActionCard };
