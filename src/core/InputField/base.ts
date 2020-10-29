import { TextFieldProps } from '@material-ui/core/TextField';

export type BaseInputProps = Omit<
  TextFieldProps,
  'variant' | 'startAdornment' | 'endAdornment'
>;
