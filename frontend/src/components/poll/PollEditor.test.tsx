import { getByRole, render, screen } from "../../test-utils";
import React from "react";
import PollEditor from "./PollEditor";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(<PollEditor setPollWindow getPollData />);
});

it("Should be able to type", () => {
  const text = screen.getByTestId("question-input");
  userEvent.type(text, "test");
  expect(text.value).toBe("test");
});

it("Question title should be visible after send", async () => {
  const input = screen.getByTestId("question-input");
  userEvent.type(input, "sample");

  const btn = screen.getByTestId("question-btn");
  userEvent.click(btn);

  const text = await screen.findByTestId("question-text");
  expect(text).toBeInTheDocument();
});
