import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import MessageEditor from "../components/modal/MessageEditor";

export default {
  title: "Modals/MessageEditor",
  component: MessageEditor,
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
} as ComponentMeta<typeof MessageEditor>;

const Template: ComponentStory<typeof MessageEditor> = (args) => <MessageEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  project: "123edf5",
  visible: true,
  handleCancel: () => {},
  handleOk: () => {}
};
