import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/features/wishlist/wishlistSlice";
import Button from "./Button";

const ProductCard = ({ product, onProductClick }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
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

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={() => onProductClick && onProductClick(product.id)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? "text-red-500" : "text-gray-400"
          } hover:text-red-500 transition-colors`}
        >
          ♥
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex mr-2">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>
          <Button onClick={handleAddToCart} size="small" className="ml-2">
            Add to Cart
          </Button>
        </div>

        <div className="mt-2">
          <span
            className={`text-xs px-2 py-1 rounded ${
              product.stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
