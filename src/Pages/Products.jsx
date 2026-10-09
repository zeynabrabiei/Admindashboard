import { useCallback, useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";

import styles from "./Products.module.css";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [formError, setFormError] = useState("");

  const fetchProducts = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(PRODUCTS_URL, { signal });

      if (!response.ok) {
        throw new Error("Could not load products. Please try again.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("The products response has an invalid format.");
      }

      setProducts(data);
    } catch (requestError) {
      if (requestError.name !== "AbortError") {
        setError(
          requestError.message || "An unexpected error occurred."
        );
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Products | Admin";

    const controller = new AbortController();

    fetchProducts(controller.signal);

    return () => controller.abort();
  }, [fetchProducts]);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products
      .filter((product) =>
        String(product.title || "")
          .toLowerCase()
          .includes(normalizedSearch)
      )
      .filter(
        (product) =>
          category === "all" || product.category === category
      )
      .sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;

        return sortOrder === "asc"
          ? priceA - priceB
          : priceB - priceA;
      });
  }, [products, search, category, sortOrder]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditTitle(product.title || "");
    setEditPrice(String(product.price ?? ""));
    setFormError("");
  };

  const closeModal = () => {
    setEditingProduct(null);
    setEditTitle("");
    setEditPrice("");
    setFormError("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    const title = editTitle.trim();
    const price = Number(editPrice);

    if (!title) {
      setFormError("Product name is required.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setFormError("Enter a valid price greater than or equal to zero.");
      return;
    }

    setProducts((current) =>
      current.map((product) =>
        product.id === editingProduct.id
          ? { ...product, title, price }
          : product
      )
    );

    closeModal();
  };

  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${product.title}" from this list?`
    );

    if (!confirmed) return;

    setProducts((current) =>
      current.filter((item) => item.id !== product.id)
    );
  };

  useEffect(() => {
    if (!editingProduct) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingProduct]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>CATALOG MANAGEMENT</span>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>
            Search, organize, and manage your product catalog.
          </p>
        </div>

        <div className={styles.total}>
          <span className={styles.totalNumber}>
            {loading ? "..." : products.length}
          </span>
          <span className={styles.totalLabel}>Total products</span>
        </div>
      </header>

      <section className={styles.toolbar} aria-label="Product filters">
        <label className={styles.search}>
          <span className={styles.searchIcon} aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search products by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products by name"
          />
        </label>

        <div className={styles.filters}>
          <label className={styles.filterField}>
            <span>Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="all">All categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.filterField}>
            <span>Sort by price</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="asc">Price: Low to high</option>
              <option value="desc">Price: High to low</option>
            </select>
          </label>
        </div>
      </section>

      {!loading && !error && (
        <div className={styles.results}>
          Showing <strong>{filteredProducts.length}</strong> of{" "}
          <strong>{products.length}</strong> products
        </div>
      )}

      {loading ? (
        <div className={styles.state}>
          <ClipLoader color="#3979ec" size={42} />
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className={styles.state}>
          <div className={styles.stateIcon} aria-hidden="true">
            !
          </div>
          <h2>Unable to load products</h2>
          <p>{error}</p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => fetchProducts()}
          >
            Try again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.state}>
          <div className={styles.stateIcon} aria-hidden="true">
            ⌕
          </div>
          <h2>No products found</h2>
          <p>Try changing your search or category filter.</p>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => {
              setSearch("");
              setCategory("all");
              setSortOrder("asc");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <section className={styles.grid} aria-label="Product list">
          {filteredProducts.map((product) => (
            <article className={styles.card} key={product.id}>
              <div className={styles.imageWrap}>
                {product.category && (
                  <span className={styles.category}>
                    {product.category}
                  </span>
                )}

                <img
                  className={styles.image}
                  src={product.image}
                  alt={product.title || "Product image"}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
              </div>

              <div className={styles.cardBody}>
                <h2 className={styles.productTitle} title={product.title}>
                  {product.title}
                </h2>

                <div className={styles.priceRow}>
                  <span className={styles.price}>
                    {formatPrice(Number(product.price) || 0)}
                  </span>

                  {Number.isFinite(Number(product.rating?.rate)) && (
                    <span className={styles.rating}>
                      ★ {Number(product.rating.rate).toFixed(1)}
                    </span>
                  )}
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.editButton}
                    onClick={() => handleEdit(product)}
                  >
                    Edit product
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(product)}
                    aria-label={`Delete ${product.title}`}
                    title="Delete product"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {editingProduct && (
        <div
          className={styles.overlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-product-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eyebrow}>PRODUCT DETAILS</span>
                <h2 id="edit-product-title">Edit product</h2>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave}>
              <label className={styles.formField}>
                <span>Product name</span>
                <input
                  autoFocus
                  type="text"
                  value={editTitle}
                  onChange={(event) => {
                    setEditTitle(event.target.value);
                    setFormError("");
                  }}
                  maxLength={200}
                  required
                />
              </label>

              <label className={styles.formField}>
                <span>Price (USD)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editPrice}
                  onChange={(event) => {
                    setEditPrice(event.target.value);
                    setFormError("");
                  }}
                  required
                />
              </label>

              {formError && (
                <p className={styles.formError} role="alert">
                  {formError}
                </p>
              )}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.primaryButton}
                >
                  Save changes
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}