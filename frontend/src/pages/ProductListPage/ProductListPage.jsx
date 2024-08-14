import React, { useState } from "react";
import Product from "../../components/Product/Product";
import "./ProductListPage.scss";

const ProductListPage = () => {
  const [selectedGender, setSelectedGender] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("Allproduct");
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const { value, type } = event.target;
    if (type === "radio") {
      setSelectedGender(value);
    } else if (type === "radio") {
      setSelectedCategory(value);
    }
  };

  return (
    <div className="ProductListPage">
      <div className="productList">
        <div className="categories">
          <h3> Categories </h3>
          <ul>
            {["Allproduct", "Bag", "Shoes", "Jacket", "Wallet"].map(
              (category) => (
                <li key={category}>
                  <input
                    type="radio"
                    id={category}
                    value={category}
                    checked={selectedCategory === category}
                    onChange={handleChange}
                  />
                  <label htmlFor={category}>{category}</label>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="allProduct">
          <div className="header">
            <h1>All Products</h1>
            <p>Showing results for {selectedOption}</p>
            <div className="sort">
              <div className="gender">
                {["ALL", "FEMALE", "MALE"].map((gender) => (
                  <div key={gender}>
                    <input
                      type="radio"
                      id={gender}
                      value={gender}
                      checked={selectedGender === gender}
                      onChange={handleChange}
                    />
                    <label htmlFor={gender}>{gender}</label>
                  </div>
                ))}
              </div>
              <select
                name="sorting"
                id="sorting"
                value={selectedOption}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Price Sorting
                </option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </div>
          <Product category={selectedCategory} gender={selectedGender} />
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
