import React from "react";

const Completed = (props) => {
  return (
    <div>
      <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
        <title />
        <defs>
          <path d="M5 6v9h14v-3H8V6H5z" id="prefix__a" />
        </defs>
        <g fill="none" fillRule="evenodd">
          <circle cx={12} cy={12} fill="#2ECC71" r={12} />
          <use fill="#ECF0F1" transform="rotate(-45 12 10.5)" xlinkHref="#prefix__a" />
          <use xlinkHref="#prefix__a" />
        </g>
      </svg>
    </div>
  );
};

export default Completed;
