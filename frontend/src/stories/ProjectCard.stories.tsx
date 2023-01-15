import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import ProjectCard from "../components/projectCard/ProjectCard";

export default {
  title: "Projects/ProjectCard",
  component: ProjectCard,
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
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => <ProjectCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  project: { id: "14944750", name: "New Jersey festival", description: null, created_at: new Date(), favorite: "0", status_id: "1", status: "Completed" },
  projectCardHandler: () => {},
  members: [
    { id: "160a290b-865d-442b-a019-396b468234db", project_id: "31646963", user_id: "93ace1ba-419c-4c14-853a-d662e008fa47", email: "vse@vse.cz", firstname: "Adam", lastname: "Kolcár", color: "#4834d4" },
    { id: "160a290b-865d-442b-a019-396b468234db", project_id: "31646963", user_id: "93ace1ba-419c-4c14-853a-d662e008fa47", email: "vse@vse.cz", firstname: "Milan", lastname: "Jilek", color: "#2834d4" },
    { id: "160a290b-865d-442b-a019-396b468234db", project_id: "31646963", user_id: "93ace1ba-419c-4c14-853a-d662e008fa47", email: "vse@vse.cz", firstname: "Julie", lastname: "Mikova", color: "#4834d4" }
  ]
};
