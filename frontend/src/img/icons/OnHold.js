import React from "react";

const OnHold = (props) => {
  return (
    <div>
      <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
        <title />
        <defs>
          <path id="prefix__a" d="M5 6v9h14v-3H8V6H5z" />
        </defs>
        <title>{"background"}</title>
        <path fill="none" d="M-1-1h582v402H-1z" />
        <g>
          <title>{"Layer 1"}</title>
          <circle r={12} fill="#ff5656" cy={12.086} cx={12} />
          <use x={0.129} y={6.781} xlinkHref="#prefix__a" fill="none" />
          <path fill="#fff" d="M6 10.543h12v3.004H6z" />
        </g>
      </svg>
    </div>
  );
};

export default OnHold;
