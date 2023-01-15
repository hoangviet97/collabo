import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import IncomeForm from "../components/incomes/IncomeForm";

export default {
  title: "Incomes/IncomeForm",
  component: IncomeForm,
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
} as ComponentMeta<typeof IncomeForm>;

const Template: ComponentStory<typeof IncomeForm> = (args) => <IncomeForm {...args} />;

export const Default = Template.bind({});
