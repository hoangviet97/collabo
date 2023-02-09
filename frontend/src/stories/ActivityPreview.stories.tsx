import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import LogPreview from "../components/logs/LogPreview";

export default {
  title: "Activity/ActivityPreview",
  component: LogPreview,
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
} as ComponentMeta<typeof LogPreview>;

const Template: ComponentStory<typeof LogPreview> = (args) => <LogPreview {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  data: {
    id: "1481deab-6784-4d99-bccc-06e0f4078f46",
    projects_id: "66285580",
    members_id: "935b6fa2-c7f5-494c-a4ea-c323d7b43ff1",
    sender: "ccfefbcd-1fc9-4fff-ac66-ee9a83454bc5",
    type: "task",
    title: "Create strategic plan",
    text: "assigned you a task",
    created_at: new Date(),
    seen: "F",
    comment: null,
    firstname: "Vitek",
    lastname: "Pham",
    email: "phav02@vse.cz",
    color: "#686de0"
  }
};
