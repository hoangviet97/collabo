import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import InvitationPanel from "../components/invitationPanel/InvitationPanel";

export default {
  title: "Invitations/Panel",
  component: InvitationPanel,
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
} as ComponentMeta<typeof InvitationPanel>;

const Template: ComponentStory<typeof InvitationPanel> = (args) => <InvitationPanel {...args} />;

export const Default = Template.bind({});
