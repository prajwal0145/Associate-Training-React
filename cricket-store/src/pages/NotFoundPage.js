import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved or deleted.
        </p>
        <div className="space-x-4">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
          <Link to="/categories">
            <Button variant="outline">Browse Categories</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
