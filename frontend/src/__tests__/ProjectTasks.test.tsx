import React from "react";
import "@testing-library/jest-dom";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import ProjectTasks from "../pages/tasks/projectTasks/ProjectTasks";
import MockAdapter from "axios-mock-adapter";
import axiosClient from "../helpers/axios";
import "../setupTests";
import { render } from "../test-utils";

Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
});

const project_id = "9088012";
const match = {
  params: {
    id: "67656",
    taskId: "98789"
  }
};
const getSectionResponse = [{ id: "12345y", name: "Presenter" }];

const mockNetworkResponse = () => {
  const mock = new MockAdapter(axiosClient);
  mock.onGet(`/${project_id}/sections`).reply(200, getSectionResponse);
};

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProjectTasks match={match} />
      </BrowserRouter>
    </Provider>
  );
  mockNetworkResponse();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("Should render item after dispatch", async () => {
  await waitFor(() => expect(screen.getByText("Section")).toBeInTheDocument());
});
