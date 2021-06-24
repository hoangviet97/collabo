import React from "react";

const InProgress = (props) => {
  return (
    <div>
      <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" {...props}>
        <title />
        <title>{"background"}</title>
        <path fill="none" d="M-1-1h582v402H-1z" />
        <g>
          <title>{"Layer 1"}</title>
          <path fill="#4c9ae8" d="M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
          <path stroke="null" fill="#fff" d="M6.602 13.026l-.011-2 8.721-.052.012 2z" />
          <path fill="#fff" d="M17.792 11.988l-4.695 4.719-1.418-1.41 3.285-3.302-3.301-3.284 1.41-1.418 4.719 4.695z" />
        </g>
      </svg>
    </div>
  );
};

export default InProgress;
