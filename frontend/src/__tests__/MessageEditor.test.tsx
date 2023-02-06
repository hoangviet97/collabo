import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import MessageEditor from "../components/modal/MessageEditor";
import MockAdapter from "axios-mock-adapter";
import "../setupTests";

Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
});

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MessageEditor project="67ygt56" visible={true} handleCancel={() => {}} handleOk={() => {}} />
      </BrowserRouter>
    </Provider>
  );
});

it("Poll editor should appear after btn click", async () => {
  const el = screen.getByTestId("set-poll");
  fireEvent.click(el);
  const poll = screen.getByTestId("poll-window");
  expect(poll).not.toBeInTheDocument();
});

it("Poll editor should disappear after cancel click", async () => {
  const el = screen.getByTestId("set-poll");
  fireEvent.click(el);
  const poll = screen.getByTestId("poll-window");
  const cancelBtn = screen.getByTestId("cancel-btn");
  fireEvent.click(cancelBtn);
  expect(poll).not.toBeInTheDocument();
});
