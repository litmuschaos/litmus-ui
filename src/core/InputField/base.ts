import { OutlinedInputProps } from '@material-ui/core';

export type BaseInputProps = Omit<
  OutlinedInputProps,
  'variant' | 'startAdornment' | 'endAdornment'
>;
