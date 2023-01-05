import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import IncomeForm from "../components/incomes/IncomeForm";

export default {
  title: "Example/Header",
  component: IncomeForm,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    )
  ]
} as ComponentMeta<typeof IncomeForm>;

const Template: ComponentStory<typeof IncomeForm> = (args) => <IncomeForm {...args} />;

export const Primary = Template.bind({});
