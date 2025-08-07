import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">
              CricketStore
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your one-stop destination for all cricket equipment and
              accessories. Quality gear for champions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/cricketstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/cricketstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.897 3.708 13.746 3.708 12.449s.49-2.448 1.418-3.323C5.901 8.252 7.152 7.762 8.449 7.762s2.448.49 3.323 1.364c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.875-2.026 1.365-3.323 1.365zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.875-2.026 1.365-3.323 1.365z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/cricketstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary-400 transition-all duration-300"
                aria-label="Follow us on Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/cricketstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Categories
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">
              Categories
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category/cricket-bats"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Cricket Bats
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/helmets"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Helmets
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/shoes"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Shoes
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/protective-gear"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Protective Gear
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/accessories"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Accessories
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">
              Contact Info
            </h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-primary-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>123 Cricket Street, Sports City, Maharashtra 400001</p>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-primary-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href="tel:+911234567890"
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-primary-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:info@cricketstore.com"
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  info@cricketstore.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-primary-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Mon-Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-300">
                Subscribe to our newsletter for latest updates and offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400">
              &copy; 2024 CricketStore. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/returns"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
