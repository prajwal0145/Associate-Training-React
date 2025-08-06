import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/features/products/productSlice";
import { productApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.products);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const performSearch = useCallback(
    async (query) => {
      try {
        dispatch(setLoading(true));
        const response = await productApi.searchProducts(query);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchResults([]);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      performSearch(query);
      setSearchTerm(query);
    }
  }, [searchParams, performSearch]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for cricket equipment..."
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Search Results for "{searchTerm}"
            </h1>
            <p className="text-gray-600">
              {isLoading
                ? "Searching..."
                : `${searchResults.length} product${
                    searchResults.length !== 1 ? "s" : ""
                  } found`}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="large" />
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try searching with different keywords or browse our categories.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Search for Products
            </h3>
            <p className="text-gray-600">
              Enter a search term to find cricket equipment and accessories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
