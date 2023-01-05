import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import { createStore } from "redux";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import store from "../../redux/store";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Timer localstorage="ioiiui" disabled={false} />
      </Provider>
    </BrowserRouter>
  );
});

afterEach(() => {
  cleanup();
});

test("Pause button should be visible after timer starts", () => {
  const start = screen.getByTestId("start");
  fireEvent.click(start);
  const pause = screen.getByTestId("pause");
  expect(pause).toBeInTheDocument();
});
