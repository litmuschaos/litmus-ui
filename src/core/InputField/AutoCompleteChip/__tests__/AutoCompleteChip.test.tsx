import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../../theme";
import { AutoCompleteChip } from "../AutoCompleteChip";
import { testData } from "../testData";

let component: HTMLElement;
let input: HTMLInputElement | null;

beforeEach(() => {
  render(
    <LitmusThemeProvider>
      <AutoCompleteChip
        onChange={() => {}}
        options={testData}
        label="Tags"
        placeholder="Select tags"
        multiple={true}
        disableCloseOnSelect={true}
      />
    </LitmusThemeProvider>
  );

  // Get AutoCompleteChip component
  component = screen.getByTestId("autocomplete");

  // Get the input element
  input = component.querySelector("input");
});

test("Check placeholder and label", () => {
  // Check label
  const label = component.querySelector("label");
  expect(label?.innerHTML).toBe("Tags");

  // Check placeholder
  expect(input?.placeholder).toBe("Select tags");
});

test("Enter value in input and select three item and delete two", () => {
  // Click the input field and type some text
  fireEvent.click(input as Element);
  fireEvent.change(input as Element, { target: { value: "The" } });

  // Check if the value is entered
  expect(input?.value).toBe("The");

  // Select three options
  const options = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
  ];
  options.forEach((opt) => {
    const option = screen.getByText(opt);
    fireEvent.click(option);
  });

  // Remove focus from input
  fireEvent.blur(input as Element);

  // Get the tags
  let selectedTags = component.querySelectorAll(".MuiChip-outlined");

  // Check if tags are selected
  selectedTags.forEach((tag) => {
    const tagText = tag.querySelector("span");
    expect(options).toContain(tagText?.textContent);
  });

  // Close two tags
  const tagsToClose = ["The Shawshank Redemption", "The Dark Knight"];

  selectedTags.forEach((tag) => {
    const tagText = tag.querySelector("span");
    const closeButton = tag.querySelector("svg");

    // Check if the tag is present in tagsToClose list
    if (tagsToClose.includes(tagText?.textContent ?? ""))
      fireEvent.click(closeButton as Element);
  });

  // Check if tags are deleted or not
  selectedTags = component.querySelectorAll(".MuiChip-root");
  expect(selectedTags).toHaveLength(1);
});
