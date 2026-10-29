import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

function ProductList({ products }) {
  return (
    <main>
      {products.map(product => (
        <section className="product-row" key={product.id}>
          <h2>{product.desc}</h2>

          <div className="product-details">
            <img src={product.image} alt={product.desc} />

            <span className="quantity-box">{product.value}</span>
            <span>quantity</span>
          </div>
        </section>
      ))}
    </main>
  );
}

function Header({ total }) {
  return (
    <header className="d-flex justify-content-between align-items-center bg-info p-4">
      <h1>Shop to React</h1>

      <span>
        <FontAwesomeIcon icon={faShoppingCart} /> {total} items
      </span>
    </header>
  );
}

class App extends Component {

    state = {
    products: [
      {
        id: 1,
        image: "/products/cologne.jpg",
        desc: "Unisex Cologne",
        value: 0
      },
      {
        id: 2,
        image: "/products/iwatch.jpg",
        desc: "Apple iWatch",
        value: 0
      },
      {
        id: 3,
        image: "/products/mug.jpg",
        desc: "Unique Mug",
        value: 0
      },
      {
        id: 4,
        image: "/products/wallet.jpg",
        desc: "Mens Wallet",
        value: 0
      }
    ]
  };

  render() {
    const totalQuantity = this.state.products
      .map(product => product.value)
      .reduce((total, quantity) => total + quantity, 0);

    return (
      <div>
        <Header total={totalQuantity} />
        <ProductList products={this.state.products} />
      </div>
    );
  }
}

export default App;