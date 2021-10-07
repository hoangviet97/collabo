import React from "react";

const Other = (props) => {
  return (
    <svg data-name="Layer 1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <clipPath id="prefix__a">
          <path fill="none" d="M0 0h128v128H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#prefix__a)">
        <path d="M112 128H16V0h60.69a8 8 0 015.65 2.34l27.32 28.32a8 8 0 012.34 5.65z" fill="#d4e2e8" />
        <path d="M82.34 2.34A8 8 0 0076.69 0H68a8 8 0 018 8v24a8 8 0 008 8h20a8 8 0 018 8v-7.69c0-2.12-.84-8.15-2.34-9.65z" fill="#b0c5cc" />
        <path d="M82.34 2.34A8 8 0 0076.69 0H72a8 8 0 018 8v16a8 8 0 008 8h16a8 8 0 018 8v-3.69a8 8 0 00-2.34-5.65z" fill="#0062ff" />
      </g>
    </svg>
  );
};

export default Other;
