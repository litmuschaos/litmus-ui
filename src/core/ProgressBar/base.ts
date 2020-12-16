import { LinearProgressProps } from '@material-ui/core';

export type ProgressBarBaseProps = Omit<
  LinearProgressProps,
  'variant' | 'color'
>;
