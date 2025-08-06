import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProduct,
  setLoading,
} from "../redux/features/products/productSlice";
import { addToCart } from "../redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/features/wishlist/wishlistSlice";
import { productApi } from "../api/productApi";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, isLoading } = useSelector((state) => state.products);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);

  const isInWishlist =
    selectedProduct &&
    wishlistItems.some((item) => item.id === selectedProduct.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(setLoading(true));
        const response = await productApi.getProductById(id);
        dispatch(setSelectedProduct(response.data));
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/404");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProduct();
  }, [id, dispatch, navigate]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/product/${id}` } } });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(selectedProduct));
    }

    // Show success message (you can implement a toast notification here)
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleWishlistToggle = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/product/${id}` } } });
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(selectedProduct.id));
    } else {
      dispatch(addToWishlist(selectedProduct));
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/product/${id}` } } });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(selectedProduct));
    }
    navigate("/checkout");
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }
      >
        ★
      </span>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <button
                onClick={() => navigate("/")}
                className="hover:text-blue-600"
              >
                Home
              </button>
            </li>
            <li>→</li>
            <li>
              <button
                onClick={() => navigate("/categories")}
                className="hover:text-blue-600"
              >
                Categories
              </button>
            </li>
            <li>→</li>
            <li>
              <button
                onClick={() =>
                  navigate(`/category/${selectedProduct.category}`)
                }
                className="hover:text-blue-600 capitalize"
              >
                {selectedProduct.category.replace("-", " ")}
              </button>
            </li>
            <li>→</li>
            <li className="text-gray-900">{selectedProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedProduct.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(selectedProduct.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({selectedProduct.rating})
                  </span>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    selectedProduct.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedProduct.stock > 0
                    ? `${selectedProduct.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ₹{selectedProduct.price}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>

            {/* Specifications */}
            {selectedProduct.specifications && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  {Object.entries(selectedProduct.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span>{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(selectedProduct.stock, quantity + 1))
                    }
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    disabled={quantity >= selectedProduct.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock === 0}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={selectedProduct.stock === 0}
                  variant="secondary"
                  className="flex-1"
                >
                  Buy Now
                </Button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-md border ${
                    isInWishlist
                      ? "text-red-500 border-red-300"
                      : "text-gray-400 border-gray-300"
                  } hover:text-red-500 transition-colors`}
                >
                  ♥
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
