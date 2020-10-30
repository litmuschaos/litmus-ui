import { TabProps } from '@material-ui/core/Tab';
export type TabBaseProps = Omit<
  TabProps,
  'label' | 'content' | 'children' | 'onChange' | 'value'
>;
