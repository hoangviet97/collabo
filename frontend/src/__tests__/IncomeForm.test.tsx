import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import IncomeForm from "../components/incomes/IncomeForm";
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
        <IncomeForm />
      </BrowserRouter>
    </Provider>
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("Title input should be empty", async () => {
  const el = screen.getByTestId("title-input");
  expect(el).toHaveValue("");
});
