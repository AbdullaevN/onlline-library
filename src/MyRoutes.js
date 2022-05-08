import MainPage from "./pages/MainPage";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "pages/AddUser";
import EditUser from "pages/EditUser";
import MyNavbar from "components/MyNavbar";
import CartPage from "pages/CartPage";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
