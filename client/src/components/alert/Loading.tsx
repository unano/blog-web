import React from 'react'

const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        background: "#0007",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <svg width="205" height="250" viewBox='0 0 62 62'>
        <polygon
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          points="1,1 60,1 60,60 1,60 "
        ></polygon>
        <text fill="#fff" x="7" y="53">
                  Loading
        </text>
      </svg>
    </div>
  );
}

export default Loading