import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <CircularProgress
        size={50}
        thickness={5}
        style={{ position: "absolute" }}
      />
      <CircularProgress
        size={50}
        thickness={4.5}
        style={{
          position: "absolute",
          animation: "spin 1.2s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
