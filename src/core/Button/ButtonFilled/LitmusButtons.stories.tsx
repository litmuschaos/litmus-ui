// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { ButtonFilled, ButtonFilledProps } from ".";
import { LitmusThemeProvider } from "../../../theme/ThemeProvider";

export default {
  title: "LitmusDemo/ButtonFilled",
  component: ButtonFilled,
  argTypes: { onClick: { action: "Litmus Button Clicked" } },
} as Meta;

const Template: Story<ButtonFilledProps> = (args) => (
  <LitmusThemeProvider>
    <ButtonFilled {...args}>Litmus Button </ButtonFilled>
  </LitmusThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "default",
};
