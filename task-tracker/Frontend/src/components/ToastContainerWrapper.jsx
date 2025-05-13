// src/components/ToastContainerWrapper.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerWrapper = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastStyle={{
        background: "#1e1e2f",
        color: "#fff",
        borderRadius: "8px",
        padding: "12px 16px",
      }}
    />
  );
};

export default ToastContainerWrapper;
