import React, { useEffect } from "react";
import Container from "../../components/utils/Container";
import ReviewContent from "../../components/review/ReviewContent";
import ReviewControlPanel from "../../components/review/ReviewControlPanel";
import { useDispatch } from "react-redux";
import { getReviewPanel } from "../../redux/actions/review";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const ReviewPage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getReviewPanel(params.id));
  }, []);

  return (
    <Container size="50">
      <div className="review" style={{ minHeight: "calc(100vh - 180px)" }}>
        <ReviewControlPanel />
        <ReviewContent />
      </div>
    </Container>
  );
};

export default ReviewPage;
