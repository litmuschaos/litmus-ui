import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LitmusThemeProvider } from "../../../theme";
import { Search } from "../Search";

afterEach(cleanup);
jest.useFakeTimers();

describe("Search Component", () => {
  it("Renders", () => {
    render(
      <LitmusThemeProvider platform="litmus-portal">
        <Search data-testid="search" placeholder="search" />
      </LitmusThemeProvider>
    );
    //get Search byRole
    const search = screen.getByRole("Search");
    //get input from Search
    const searchValue = search.querySelector("input") as HTMLElement;
    //check attributes
    expect(searchValue).toHaveProperty("placeholder", "search");
    expect(searchValue).toHaveProperty("type", "text");
    expect(searchValue).toHaveProperty("value", "");
    //pass text value
    fireEvent.change(searchValue, { target: { value: "random search text" } });
    //check passed text value
    expect(searchValue).toHaveProperty("value", "random search text");
  });
});
