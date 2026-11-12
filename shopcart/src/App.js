import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import products from "./products";
import Navbar from "./navbar";

class App extends Component {
  state = {
    products: products,
    customer: null
  };

  handleAdd = id => {
    this.setState(previousState => ({
      products: previousState.products.map(product =>
        product.id === id
          ? { ...product, value: product.value + 1 }
          : product
      )
    }));
  };

  handleSubtract = id => {
    this.setState(previousState => ({
      products: previousState.products.map(product =>
        product.id === id
          ? { ...product, value: Math.max(0, product.value - 1) }
          : product
      )
    }));
  };

  handleSignIn = customer => {
    this.setState({ customer });
  };

  render() {
    const totalQuantity = this.state.products.reduce(
      (total, product) => total + product.value,
      0
    );

    return (
      <BrowserRouter>
        <Navbar
          total={totalQuantity}
          customer={this.state.customer}
          onSignIn={this.handleSignIn}
          products={this.state.products}
          onAdd={this.handleAdd}
          onSubtract={this.handleSubtract}
        />
      </BrowserRouter>
    );
  }
}

export default App;