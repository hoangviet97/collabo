import React, { useEffect, FC } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import TimeTrackerPage from "../../pages/timeTracker/TimeTrackerPage";
import ProjectsPage from "../../pages/projects/ProjectsPage";
import UserSettingsPage from "../../pages/settings/UserSettingsPage";
import ProjectTasks from "../../pages/tasks/projectTasks/ProjectTasks";
import OverviewPage from "../../pages/overview/OverviewPage";
import KanbanPage from "../../pages/kanban/KanbanPage";
import ProjectCalendar from "../../pages/calendar/ProjectCalendarPage";
import DocumentsPage from "../../pages/documents/DocumentsPage";
import NotificationsPage from "../../pages/notifications/NotificationsPage";
import TeamPage from "../../pages/team/TeamPage";
import BudgetPage from "../../pages/budget/BudgetPage";
import ActivityPage from "../../pages/activities/ActivityPage";
import TagsPage from "../../pages/tags/TagsPage";
import MessagesPage from "../../pages/messages/MessagesPage";
import ReportPage from "../../pages/report/ReportPage";
import NotFound from "../../pages/404/NotFound";
import SessionsPage from "../../pages/sessions/SessionsPage";
import PersonalTasks from "../../pages/tasks/PersonalTasks/PersonalTasks";
import ReviewPage from "../../pages/reviews/ReviewPage";
import { getProject, resetProject } from "../../redux/actions/project";
import { resetTasks } from "../../redux/actions/task";
import { resetSections } from "../../redux/actions/section";
import { resetTags } from "../../redux/actions/tag";
import { useDispatch } from "react-redux";
import ProtectedProjectRoute from "../../routing/ProtectedProjectRoute";

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
      dispatch(getProject(pathValue, push));
    } else {
      dispatch(resetProject());
      dispatch(resetTasks());
      dispatch(resetSections());
      dispatch(resetTags());
    }
  }, [match]);

  return (
    <div className="mainContent">
      <Switch>
        <Route exact path="/" component={ProjectsPage} />
        <Route exact path="/settings" component={UserSettingsPage} />
        <ProtectedProjectRoute exact path="/:id/tasks" component={ProjectTasks} />
        <ProtectedProjectRoute exact path="/:id/tasks/:taskId" component={ProjectTasks} />
        <ProtectedProjectRoute exact path="/:id/overview" component={OverviewPage} />
        <Route exact path="/notify" component={NotificationsPage} />
        <Route exact path="/my-tasks" component={PersonalTasks} />
        <Route exact path="/my-tasks/:taskId" component={PersonalTasks} />
        <ProtectedProjectRoute exact path="/:id/calendar" component={ProjectCalendar} />
        <ProtectedProjectRoute exact path="/:id/board" component={KanbanPage} />
        <ProtectedProjectRoute exact path="/:id/tags" component={TagsPage} />
        <ProtectedProjectRoute exact path="/:id/activities" component={ActivityPage} />
        <ProtectedProjectRoute exact path="/:id/budget" component={BudgetPage} />
        <ProtectedProjectRoute path="/:id/reviews" component={ReviewPage} />
        <ProtectedProjectRoute path="/:id/documents" component={DocumentsPage} />
        <ProtectedProjectRoute exact path="/:id/tracker" component={TimeTrackerPage} />
        <ProtectedProjectRoute exact path="/:id/messages" component={MessagesPage} />
        <ProtectedProjectRoute exact path="/:id/team" component={TeamPage} />
        <ProtectedProjectRoute path="/:id/report" component={ReportPage} />
        <ProtectedProjectRoute path="/:id/sessions" component={SessionsPage} />
        <ProtectedProjectRoute exact path="/:id" component={ProjectTasks} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default withRouter(MainContent);
