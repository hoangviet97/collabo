import { getByRole, render, screen } from "../../../test-utils";
import React from "react";
import NewProject from "./NewProject";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(<NewProject />);
});

it("Should be visible", () => {
  const text = screen.getByRole("textbox", { name: "project-name" });
  expect(text).toBeInTheDocument();
});
