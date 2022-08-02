import React, { useEffect, FC, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { getMembers } from "../../actions/member";
import { getReviewPanel } from "../../actions/review";
import { member } from "../../types/types";
import AvatarIcon from "../utils/AvatarIcon";
import { Avatar, Input, Badge } from "antd";
import ReviewLink from "./ReviewLink";

interface Props {
  match: any;
}

const ReviewControlPanel: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const location = useLocation();
  const [memberList, setMemberList] = useState([]);
  const reviewMembers = useSelector((state: RootStateOrAny) => state.review.review_panel);

  return (
    <div className="review__panel">
      <h2>Reviews</h2>
      <Input placeholder="Search members by name or e-mail" />
      <div style={{ marginTop: "30px" }}>
        {reviewMembers.map((member: any) => (
          <ReviewLink member={member} match={match} />
        ))}
      </div>
    </div>
  );
};

export default ReviewControlPanel;
