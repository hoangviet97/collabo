import { getByRole, render, screen } from "../../test-utils";
import React from "react";
import PollEditor from "./PollEditor";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<PollEditor setPollWindow getPollData />);
});
