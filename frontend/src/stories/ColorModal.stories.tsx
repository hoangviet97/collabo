import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import ColorModal from "../components/modal/ColorModal";

export default {
  title: "Modals/ColorModal",
  component: ColorModal,
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
} as ComponentMeta<typeof ColorModal>;

const Template: ComponentStory<typeof ColorModal> = (args) => <ColorModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isVisible: true,
  close: () => {}
};
