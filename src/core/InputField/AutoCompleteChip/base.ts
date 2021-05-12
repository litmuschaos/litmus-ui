import { TextFieldProps } from "@material-ui/core";
import { AutocompleteProps } from "@material-ui/lab";

export type Option = {
  name: string;
  [index: string]: any;
};

type BaseTextFieldProps = Pick<
  TextFieldProps,
  "variant" | "label" | "placeholder"
>;

type BaseAutocompleteProps = Omit<
  AutocompleteProps<
    Option,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >,
  "renderInput" | "renderOption"
>;

export type BaseAutocompleteChipInputProps = BaseAutocompleteProps &
  BaseTextFieldProps;
