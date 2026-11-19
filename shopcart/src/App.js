import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import products from "./products";
import Navbar from "./navbar";

class App extends Component {
  state = {
    products: products,
    customer: null,
    sortType: "normal"
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

  handleSort = event => {
    const sortType = event.target.value;

    this.setState(previousState => {
      const sortedProducts = [...previousState.products];

      switch (sortType) {
        case "lowest":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;

          case "highest":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;

            default:
              sortedProducts.sort((a, b) => a.id - b.id);
      }

      return {
        products: sortedProducts,
        sortType
      };
    });
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
          sortType={this.state.sortType}
          onSort={this.handleSort}
          onAdd={this.handleAdd}
          onSubtract={this.handleSubtract}
        />
      </BrowserRouter>
    );
  }
}

export default App;