import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setLoading,
} from "../redux/features/products/productSlice";
import { productApi } from "../api/productApi";
import Spinner from "../components/Spinner";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(setLoading(true));
        const response = await productApi.getCategories();
        dispatch(setCategories(response.data));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length === 0) {
      fetchCategories();
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch, categories.length]);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-gray-600">
            Find exactly what you need for your cricket game
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="p-8 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.slug === "cricket-bats" && "🏏"}
                  {category.slug === "helmets" && "⛑️"}
                  {category.slug === "shoes" && "👟"}
                  {category.slug === "protective-gear" && "🛡️"}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                  Shop Now →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
