import { getByRole, render, screen } from "../../test-utils";
import React from "react";
import InvitationPanel from "./InvitationPanel";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";

beforeEach(() => {
  render(<InvitationPanel />);
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "10745490"
  })
}));

test("Input should be initially empty", () => {
  const emailElement = screen.getByRole("textbox");
  expect(emailElement.value).toBe("");
});

test("Should be able to type email", () => {
  const emailElement = screen.getByRole("textbox", { name: "email" });
  userEvent.type(emailElement, "vitas01@vse.cz");
  expect(emailElement.value).toBe("vitas01@vse.cz");
});
