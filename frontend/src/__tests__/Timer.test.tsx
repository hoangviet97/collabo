import React from "react";
import { Provider } from "react-redux";
import Timer from "../components/timer/Timer";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Timer localstorage="ioiiui" disabled={false} />
      </Provider>
    </BrowserRouter>
  );
});

test("Pause button should be visible after press start", async () => {
  const start = screen.getByTestId("start");
  fireEvent.click(start);
  const pause = screen.getByTestId("pause");
  expect(pause).toBeInTheDocument();
});
