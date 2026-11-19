import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayProducts from "./displayProducts";
import Cart from "./cart";
import Checkout from "./checkout";

function Navbar({ 
  total, 
  products, 
  onAdd, 
  onSubtract, 
  customer, 
  onSignIn,
  sortType,
  onSort,
 }) {
  return (
    <>
<header className="d-flex justify-content-between align-items-center bg-info p-4">
  <h1 className="mb-0">Shop to React</h1>

  <nav
    className="d-flex align-items-center gap-3"
    aria-label="Main navigation"
  >
    <Link
      to="/"
      className="btn btn-outline-dark rounded-pill px-4"
    >
      Home
    </Link>

    <Link
      to="/cart"
      className="text-dark text-decoration-none"
    >
      <FontAwesomeIcon icon={faShoppingCart} /> {total} items
    </Link>
  </nav>
</header>

      <Routes>
        <Route
          path="/"
          element={
            <DisplayProducts
              products={products}
              onAdd={onAdd}
              onSubtract={onSubtract}
              sortType={sortType}
              onSort={onSort}
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