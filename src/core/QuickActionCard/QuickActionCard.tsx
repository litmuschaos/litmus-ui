import { List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { QuickActionCardProps, QuickActionCardPropsArray } from "./base";
import useStyles from "./styles";

const QuickActionItems: React.FC<QuickActionCardProps> = ({
  src,
  onClick,
  alt,
  text,
}) => {
  const classes = useStyles();
  console.log(src);
  return (
    <ListItem button onClick={onClick} className={classes.listItems}>
      <img src={src} alt={alt} />
      <Typography className={classes.singleActionLink}>{text}</Typography>
      {/* <Paragraph variant="small">{text}</Paragraph> */}
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
      <Typography
        data-testid="quickActionCardComponent-title"
        variant="subtitle1"
        className={classes.title}
      >
        {title}
      </Typography>
      {/* <Subtitle
        data-testid="quickActionCardComponent-title"
        variant="small"
        // color={theme.palette.text.hint}
      >
        {title}
      </Subtitle> */}
      <List>
        {quickActions.map((quickAction) => (
          <QuickActionItems key={quickAction.alt} {...quickAction} />
        ))}
      </List>
    </div>
  );
};

export { QuickActionCard };
