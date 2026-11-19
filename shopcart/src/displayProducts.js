import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function DisplayProducts({ 
  products, 
  onAdd, 
  onSubtract,
  sortType,
  onSort
}) {
  const [show, setShow] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const handleShow = product => {
    setActiveProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <main>
       <div className="p-3"> 
        <label htmlFor="product-sort" className="me-2">
          Sort by:
        </label>

        <select
          id="product-sort"
          value={sortType}
          onChange={onSort}
        >
          <option value="normal">Normal</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
       </div>

      {products.map(product => (
        <section className="product-row" key={product.id}>
          <h2>{product.desc}</h2>
          <p>Price: ${product.price.toFixed(2)}</p>

          <div className="product-details">
            <img
              src={product.image}
              alt={product.desc}
              onClick={() => handleShow(product)}
              style={{ cursor: "pointer" }}
            />

            <button
              className="btn btn-secondary"
              onClick={() => onSubtract(product.id)}
              disabled={product.value === 0}
              aria-label={`Decrease ${product.desc} quantity`}
            >
              −
            </button>

            <span className="quantity-box">{product.value}</span>

            <button
              className="btn btn-info"
              onClick={() => onAdd(product.id)}
              aria-label={`Increase ${product.desc} quantity`}
            >
              +
            </button>

            <span>quantity</span>
          </div>
        </section>
      ))}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{activeProduct?.desc}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          {activeProduct && (
            <>
              <img
                src={activeProduct.image}
                alt={activeProduct.desc}
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px"
                }}
              />

              <p className="mt-3">
                Rating: {activeProduct.ratings} / 5
              </p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default DisplayProducts;