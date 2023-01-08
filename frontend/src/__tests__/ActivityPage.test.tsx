import React from "react";
import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import ActivityPage from "../pages/activities/ActivityPage";
import MockAdapter from "axios-mock-adapter";
import axiosClient from "../helpers/axios";
import { getLogs } from "../redux/actions/log";
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
const getListResponse = [{ id: "7d58cf18-1aac-4d72-af6c-5c30c202025d", projects_id: "69260176", members_id: "803c7ccd-2afb-4d1e-9473-fcd08c089998", sender: "803c7ccd-2afb-4d1e-9473-fcd08c089998", type: "session", title: "Unique session 2-0", text: "invites you to a session", created_at: "2023-01-04T19:56:17.000Z", seen: "F", comment: "", firstname: "Alena", lastname: "Such7", email: "test@test.cz", color: "#c0392b" }];

const mockNetworkResponse = () => {
  const mock = new MockAdapter(axiosClient);
  mock.onGet(`/${project_id}/logs`).reply(200, getListResponse);
};

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ActivityPage />
      </BrowserRouter>
    </Provider>
  );
  mockNetworkResponse();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("Should render item after dispatch", async () => {
  await store.dispatch(getLogs(project_id));
  await waitFor(() => expect(screen.getByText("Alena Such7")).toBeInTheDocument());
});
