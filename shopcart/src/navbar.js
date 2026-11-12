import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayProducts from "./displayProducts";
import Cart from "./cart";
import Checkout from "./checkout";

function Navbar({ total, products, onAdd, onSubtract, customer, onSignIn }) {
  return (
    <>
      <header className="d-flex justify-content-between align-items-center bg-info p-4">
        <Link to="/" className="text-dark text-decoration-none">
          <h1 className="mb-0">Shop to React</h1>
        </Link>

        <Link to="/cart" className="text-dark text-decoration-none">
          <FontAwesomeIcon icon={faShoppingCart} /> {total} items
        </Link>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <DisplayProducts
              products={products}
              onAdd={onAdd}
              onSubtract={onSubtract}
            />
          }
        />

        <Route
          path="/cart"
          element={<Cart products={products} total={total} />}
        />
        <Route path="/checkout" element={
          <Checkout total={total} customer={customer} onSignIn={onSignIn} />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default Navbar;