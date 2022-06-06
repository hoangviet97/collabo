import React, { useEffect, FC } from "react";
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
import BudgetPage from "../budget/BudgetPage";
import Tags from "../tags/Tags";
import Messages from "../messages/Messages";
import Report from "../report/Report";
import NotFound from "../layout/NotFound";
import Session from "../session/Session";
import { getProject } from "../../actions/project";
import { getAllInvitations } from "../../actions/invitation";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Unauthorized from "../layout/Unauthorized";
import ProtectedProjectRoute from "../routing/ProtectedProjectRoute";

interface Props {
  match: any;
  history: any;
}

const MainContent: FC<Props> = ({ match, history }) => {
  const dispatch = useDispatch();
  const { push } = history;
  let path = window.location.pathname;
  let pathValue: string = path.split("/")[1];

  useEffect(() => {
    if (pathValue.length === 8 && /^\d+$/.test(pathValue)) {
      dispatch(getProject({ project_id: pathValue, push: push }));
    }
  }, [match]);

  return (
    <div className="mainContent">
      <Switch>
        <Route exact path="/" component={Projects} />
        <Route exact path="/settings" component={UserSettings} />
        <ProtectedProjectRoute exact path="/:id/tasks" component={ProjectTasks} />
        <ProtectedProjectRoute exact path="/:id/overview" component={Overview} />
        <Route exact path="/notify" component={Invitations} />
        <ProtectedProjectRoute exact path="/:id/calendar" component={ProjectCalendar} />
        <ProtectedProjectRoute exact path="/:id/board" component={KanbanBoard} />
        <ProtectedProjectRoute exact path="/:id/tags" component={Tags} />
        <ProtectedProjectRoute exact path="/:id/budget" component={BudgetPage} />
        <ProtectedProjectRoute path="/:id/documents" component={Documents} />
        <ProtectedProjectRoute exact path="/:id/tracker" component={TimeTracker} />
        <ProtectedProjectRoute exact path="/:id/messages" component={Messages} />
        <ProtectedProjectRoute exact path="/:id/team" component={Team} />
        <ProtectedProjectRoute path="/:id/report" component={Report} />
        <ProtectedProjectRoute path="/:id/sessions" component={Session} />
        <ProtectedProjectRoute exact path="/:id" component={ProjectTasks} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default withRouter(MainContent);
