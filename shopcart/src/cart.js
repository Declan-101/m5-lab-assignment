import React from "react";
import { Link } from "react-router-dom";

function Cart({ products, total }) {
  const cartItems = products.filter(product => product.value > 0);
  const grandTotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.value,
    0
  );

  return (
    <main className="container my-4">
      <h2>Your Cart Items</h2>
      {cartItems.length === 0 ? (
        <>
          <p>There are {total} items in your cart.</p>
          <Link className="btn btn-success" to="/">Continue Shop</Link>
        </>
      ) : (
        <>
          <div className="list-group">
            {cartItems.map(product => (
              <div className="list-group-item d-flex align-items-center gap-4" key={product.id}>
                <div>
                  <img src={product.image} alt={product.desc} className="cart-product-image" />
                  <p className="mb-0 mt-2">{product.desc}</p>
                </div>
                <div>
                  <p>Quantity: {product.value}</p>
                  <p>Unit Price: ${product.price.toFixed(2)}</p>
                  <strong>
                    Subtotal: ${(product.price * product.value).toFixed(2)}
                    </strong>
                </div>
              </div>
            ))}
          </div>
          <h3 className="mt-4">
            Grand Total: ${grandTotal.toFixed(2)}
          </h3>
          <Link className="btn btn-primary mt-3" to="/checkout">Check Out</Link>
        </>
      )}
    </main>
  );
}

export default Cart;
