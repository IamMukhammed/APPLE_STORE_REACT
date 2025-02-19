import React, { useState } from "react";
import "../css/app.css";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import HelpPage from "./screens/helpPage";
import Test from "./screens/Test";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpenn] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  /* HANDLERS */

  const handleSignupClose = () => setSignupOpenn(false);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <>
      {location.pathname === "/" ? ( 
        <HomeNavbar 
          cartItems={cartItems}
          onAdd={onAdd} 
          onRemove={onRemove} 
          onDelete={onDelete} 
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpenn}
          setLoginOpen={setLoginOpen}
        /> 
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd} 
          onRemove={onRemove} 
          onDelete={onDelete} 
          onDeleteAll={onDeleteAll}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpenn} 
        /> 
      )}
        <Switch>
          <Route path="/products">
            <ProductsPage onAdd={onAdd} />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />

        <AuthenticationModal 
          signupOpen={signupOpen}
          loginOpen={loginOpen}
          handleSignupClose={handleSignupClose}
          handleLoginClose={handleLoginClose}
        />
      </>
  );
}

export default App;
function setCartItems(cartUpdate: any[]) {
  throw new Error("Function not implemented.");
}

