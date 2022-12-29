import React, { FC, useEffect } from "react";
import Container from "../../components/utils/Container";
import ReviewContent from "../../components/review/ReviewContent";
import ReviewControlPanel from "../../components/review/ReviewControlPanel";
import { useDispatch } from "react-redux";
import { getReviewPanel } from "../../redux/actions/review";
import { useParams } from "react-router-dom";

interface Props {
  match: any;
}

const ReviewPage: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();

  useEffect(() => {
    dispatch(getReviewPanel(params.id));
  }, []);

  return (
    <Container size="50">
      <div className="review" style={{ minHeight: "calc(100vh - 180px)" }}>
        <ReviewControlPanel match={match} />
        <ReviewContent match={match} />
      </div>
    </Container>
  );
};

export default ReviewPage;
