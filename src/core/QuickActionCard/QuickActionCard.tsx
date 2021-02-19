import { List, ListItem, useTheme } from "@material-ui/core";
import React from "react";
import { Paragraph, Subtitle } from "../..";
import { QuickActionCardProps, QuickActionCardPropsArray } from "./base";
import useStyles from "./styles";

const QuickActionItems: React.FC<QuickActionCardProps> = ({
  src,
  onClick,
  alt,
  href,
  text,
}) => {
  const classes = useStyles();
  console.log(src);
  return (
    <ListItem button onClick={onClick} className={classes.listItems}>
      <img src={src} alt={alt} />
      {onClick ? (
        <Paragraph variant="small">{text}</Paragraph>
      ) : (
        <a href={href} target="_" rel="noreferrer noopener">
          <Paragraph variant="small">{text}</Paragraph>
        </a>
      )}
    </ListItem>
  );
};

const QuickActionCard: React.FC<QuickActionCardPropsArray> = ({
  quickActions,
  title,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div
      data-testid="quickActionCardComponent"
      className={classes.quickActionCard}
    >
      <Subtitle variant="small" color={theme.palette.text.hint}>
        {title}
      </Subtitle>
      <List>
        {quickActions.map((quickAction) => (
          <QuickActionItems key={quickAction.alt} {...quickAction} />
        ))}
      </List>
    </div>
  );
};

export { QuickActionCard };
