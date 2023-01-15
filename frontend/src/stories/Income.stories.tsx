import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import Income from "../components/incomes/Income";

export default {
  title: "Incomes/Income",
  component: Income,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded"
  },
  decorators: [
    (story) => (
      <Provider store={store}>
        <BrowserRouter>{story()}</BrowserRouter>
      </Provider>
    )
  ]
} as ComponentMeta<typeof Income>;

const Template: ComponentStory<typeof Income> = (args) => <Income {...args} />;

export const Default = Template.bind({});
Default.args = {
  income: {
    id: "f917d35d-76a6-4035-9495-b60a096c731e",
    projects_id: "66285580",
    members_id: "ccfefbcd-1fc9-4fff-ac66-ee9a83454bc5",
    title: "mon",
    amount: 900,
    created_at: "2022-07-02 10:29:20.669"
  }
};
