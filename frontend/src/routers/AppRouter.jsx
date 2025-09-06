import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chats from "../chats/Chats";
import ProtectedRoute from "../auth/ProtectedRoute";
import Layout from "../layout/Layout";

const AppRouter = ({toggleNavbar}) => {
  return (
    <Routes>
      <Route path="/" element={<Layout toggleNavbar={toggleNavbar} />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        path="/chats"
        element={
          <ProtectedRoute>
            <Chats />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
