import React, { FC } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Container from "../utils/Container";
import ReportControlPanel from "./ReportControlPanel";
import ReportContent from "./ReportContent";

interface Props {
  match: any;
}

const ReportPage: FC<Props> = ({ match }) => {
  return (
    <Container size="50">
      <div className="report">
        <ReportControlPanel match={match} />
        <ReportContent match={match} />
      </div>
    </Container>
  );
};

export default ReportPage;
