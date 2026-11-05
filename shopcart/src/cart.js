import React from "react";

function Cart({ products }) {
  const cartItems = products.filter(product => product.value > 0);

  return (
    <main className="container my-4">
      <h2>Your Cart Items</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="list-group">
          {cartItems.map(product => (
            <div
              className="list-group-item d-flex align-items-center gap-4"
              key={product.id}
            >
              <div>
                <img
                  src={product.image}
                  alt={product.desc}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain"
                  }}
                />
                <p className="mb-0 mt-2">{product.desc}</p>
              </div>

              <strong>Quantity: {product.value}</strong>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Cart;