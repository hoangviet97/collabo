import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
// Import our reducer
import reducer from "./redux/reducers/index"; // to access rest of reducers

const render = (ui, { initialState, store = createStore(reducer, initialState), ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
// override render method
export { render };
