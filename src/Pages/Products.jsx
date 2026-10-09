import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";  
import styles from "./Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    document.title="Products";
    
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  }, []);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditTitle(product.title);
    setEditPrice(product.price);
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? { ...p, title: editTitle, price: editPrice }
          : p
      )
    );
    setEditingProduct(null);
  };

  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category === "all" ? true : p.category === category
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Products</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Price ↑</option>
          <option value="desc">Price ↓</option>
        </select>

        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <ClipLoader color="#4B5563" size={50} />
          <p>Loading products...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <div className={styles.actions}>
                <button className={styles.edit} onClick={() => handleEdit(product)}>Edit</button>
                <button className={styles.delete} onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProduct && (
        <div className={styles.editModal}>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            placeholder="Price"
          />
          <div className={styles.modalActions}>
            <button onClick={handleSave} className={styles.saveBtn}>Save</button>
            <button onClick={() => setEditingProduct(null)} className={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;