export interface LegendTableBaseProps<T> {
  // data here will interpreted as array of rows
  data?: Array<T>;

  // heading for the table
  heading?: Array<string>;
}
