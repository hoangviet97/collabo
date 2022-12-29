import React from "react";

const Canceled = (props) => {
  return (
    <div>
      <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" {...props}>
        <title />
        <g fill="none" fillRule="evenodd">
          <circle cx={12} cy={12} fill="#E74C3C" r={12} />
          <path d="M12 9.879l4.243-4.243 2.121 2.121L14.121 12l4.243 4.243-2.121 2.121L12 14.121l-4.243 4.243-2.121-2.121L9.879 12 5.636 7.757l2.121-2.121L12 9.879z" fill="#ECF0F1" />
        </g>
      </svg>
    </div>
  );
};

export default Canceled;
