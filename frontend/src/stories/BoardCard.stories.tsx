import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import BoardCard from "../components/boardCard/BoardCard";

export default {
  title: "Board/BoardCard",
  component: BoardCard,
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
} as ComponentMeta<typeof BoardCard>;

const Template: ComponentStory<typeof BoardCard> = (args) => <BoardCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "123u7e6",
  title: "Hire new management",
  description: "No description",
  priority: "High",
  due_date: "2022-08-03T16:08:27.000Z",
  dragging: () => {},
  showModalHandler: () => {}
};
