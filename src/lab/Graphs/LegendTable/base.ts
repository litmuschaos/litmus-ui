export interface LegendData {
  data: Array<string>;
  baseColor?: string;
}

export type LegendTableProps = {
  data?: Array<LegendData>;
  heading?: Array<string>;
};
