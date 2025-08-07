import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calculateTotal } from "../redux/features/cart/cartSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
