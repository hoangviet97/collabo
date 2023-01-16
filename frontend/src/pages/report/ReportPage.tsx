import React from "react";
import Container from "../../components/utils/Container";
import ReportControlPanel from "../../components/report/ReportControlPanel";
import ReportContent from "../../components/report/ReportContent";

const ReportPage: React.FunctionComponent = () => {
  return (
    <Container size="50">
      <div className="report">
        <ReportControlPanel />
        <ReportContent />
      </div>
    </Container>
  );
};

export default ReportPage;
