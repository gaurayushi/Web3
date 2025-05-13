import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { getToken } from "./utils/auth";
import TasksPage from "./components/TasksPage";


// Toastify imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = getToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {token && (
           <>
    <Route
      path="/dashboard"
      element={
        <Layout>
          <Dashboard />
        </Layout>
      }
    />
    <Route
      path="/tasks/:id"
      element={
        <Layout>
          <TasksPage />
        </Layout>
      }
    />
  </>
)}
      </Routes>
       <ToastContainer/>  
      
    </BrowserRouter>
  );
}

export default App;
