import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import TimeTracker from "../timeTracker/TimeTracker";
import Projects from "../projects/Projects";
import UserSettings from "../globalSettings/UserSettings";
import ProjectTasks from "../tasks/ProjectTasks";
import Overview from "../overview/Overview";
import KanbanBoard from "../board/KanbanBoard";
import ProjectCalendar from "../calendar/ProjectCalendar";
import Documents from "../documents/Documents";
import Invitations from "../invitations/Invitations";
import Team from "../team/Team";
import Tags from "../tags/Tags";
import Messages from "../messages/Messages";
import Report from "../report/Report";
import NotFound from "../layout/NotFound";
import Session from "../session/Session";
import { getProject } from "../../actions/project";
import { getAllInvitations } from "../../actions/invitation";
import { connect } from "react-redux";

const MainContent = (props) => {
  let path = window.location.pathname;
  let pathValue = path.split("/")[1];

  useEffect(() => {
    if (pathValue.length === 8 && isNaN(pathValue) === false) {
      props.getProject({ project: pathValue });
      console.log(props.history);
    }
  }, [props.match]);

  useEffect(() => {
    props.getAllInvitations();
  }, []);

  return (
    <div className="mainContent">
      <Switch>
        <Route exact path="/" component={Projects} />
        <Route exact path="/settings" component={UserSettings} />
        <Route exact path="/:id/tasks" component={ProjectTasks} />
        <Route exact path="/:id/overview" component={Overview} />
        <Route exact path="/notify" component={Invitations} />
        <Route exact path="/:id/calendar" component={ProjectCalendar} />
        <Route exact path="/:id/board" component={KanbanBoard} />
        <Route exact path="/:id/tags" component={Tags} />
        <Route path="/:id/documents" component={Documents} />
        <Route exact path="/:id/tracker" component={TimeTracker} />
        <Route exact path="/:id/messages" component={Messages} />
        <Route exact path="/:id/team" component={Team} />
        <Route path="/:id/report" component={Report} />
        <Route path="/:id/sessions" component={Session} />
        <Route exact path="/:id" component={ProjectTasks} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default connect(null, { getProject, getAllInvitations })(withRouter(MainContent));
