import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  setSelectedCategory,
} from "../redux/features/products/productSlice";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

const ProductListPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, categories } = useSelector(
    (state) => state.products
  );
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const currentCategory = categories.find((cat) => cat.slug === slug);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        let response;

        if (slug) {
          response = await productApi.getProductsByCategory(slug);
          dispatch(setSelectedCategory(slug));
        } else {
          response = await productApi.getAllProducts();
          dispatch(setSelectedCategory(null));
        }

        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [slug, dispatch]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "price") {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentCategory ? currentCategory.name : "All Products"}
          </h1>
          <p className="text-gray-600">
            {currentCategory
              ? currentCategory.description
              : "Browse our complete collection"}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSortChange("name")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortBy === "name"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSortChange("price")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortBy === "price"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => handleSortChange("rating")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortBy === "rating"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Rating {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try browsing other categories or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
