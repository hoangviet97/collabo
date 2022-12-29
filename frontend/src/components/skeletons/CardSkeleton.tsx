import React from "react";
import ContentLoader from "react-content-loader";

const CardSkeleton = (props: any) => {
  return (
    <ContentLoader viewBox="0 0 500 420" backgroundColor="#ffffff" foregroundColor="#f2f2f2" {...props}>
      <rect x="16" y="17" rx="0" ry="0" width="330" height="150" />
    </ContentLoader>
  );
};

export default CardSkeleton;
