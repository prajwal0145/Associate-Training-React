import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../redux/features/wishlist/wishlistSlice";
import { addToCart } from "../redux/features/cart/cartSlice";
import Button from "../components/Button";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { user } = useSelector((state) => state.auth);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // Optionally remove from wishlist after adding to cart
    // dispatch(removeFromWishlist(product.id));
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => {
      dispatch(addToCart(item));
    });
    navigate("/cart");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Please log in
            </h3>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your wishlist.
            </p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">♥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Save items you love to buy them later!
            </p>
            <Link to="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          {wishlistItems.length > 0 && (
            <Button onClick={handleMoveAllToCart} variant="outline">
              Move All to Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover hover:opacity-80 transition-opacity"
                  />
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md text-red-500 hover:text-red-700 transition-colors"
                >
                  ♥
                </button>
              </div>

              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate hover:text-blue-600">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center mb-3">
                  <div className="flex mr-2">{renderStars(item.rating)}</div>
                  <span className="text-sm text-gray-600">({item.rating})</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{item.price}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full"
                    size="small"
                  >
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="w-full text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Remove from Wishlist
                  </button>
                </div>

                <div className="mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
