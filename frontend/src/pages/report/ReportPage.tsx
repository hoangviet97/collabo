import React, { FC } from "react";
import Container from "../../components/utils/Container";
import ReportControlPanel from "../../components/report/ReportControlPanel";
import ReportContent from "../../components/report/ReportContent";

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
