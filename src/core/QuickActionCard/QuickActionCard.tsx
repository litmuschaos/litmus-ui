import { List, ListItem, useTheme } from '@material-ui/core';
import { Paragraph, Subtitle } from 'kubera-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  QuickActionCardProps,
  QuickActionCardPropsArray,
} from '../../models/quickAction';
import useStyles from './styles';

const QuickActionItems: React.FC<QuickActionCardProps> = ({
  src,
  onClick,
  alt,
  href,
  text,
}) => {
  const classes = useStyles();
  return (
    <ListItem
      id="ListItems"
      button
      onClick={onClick}
      className={classes.listItems}
    >
      <img src={src} alt={alt} />
      {onClick ? (
        <Paragraph>{text}</Paragraph>
      ) : (
        <a href={href} target="_" rel="noreferrer noopener">
          <Paragraph>{text}</Paragraph>
        </a>
      )}
    </ListItem>
  );
};

const QuickActionCard: React.FC<QuickActionCardPropsArray> = ({
  propsArray,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div data-cy="quickActionCardComponent" className={classes.quickActionCard}>
      <Subtitle variant="small" color={theme.palette.text.hint}>
        {t('support.quickActionCard.quickActions')}
      </Subtitle>
      <List>
        {propsArray.map((element) => (
          <QuickActionItems {...element} />
        ))}
      </List>
    </div>
  );
};

export default QuickActionCard;
