import React, { FC, useEffect } from "react";
import Container from "../../components/utils/Container";
import ReviewContent from "../../components/review/ReviewContent";
import ReviewControlPanel from "../../components/review/ReviewControlPanel";
import { useDispatch } from "react-redux";
import { getReviewPanel } from "../../redux/actions/review";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const dispatch = useDispatch();
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
