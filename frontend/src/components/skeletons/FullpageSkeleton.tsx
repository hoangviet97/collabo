import React from "react";
import ContentLoader from "react-content-loader";
import { Skeleton, Spin } from "antd";
import Container from "../utils/Container";

const CardSkeleton = (props: any) => {
  return (
    <Container size="30">
      <div style={{ height: "calc(100vh - 120px)", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin />
      </div>
    </Container>
  );
};

export default CardSkeleton;
