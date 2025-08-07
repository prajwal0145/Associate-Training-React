import React from "react";

// --- Main App Component ---
export default function AboutUs() {
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <div className="container mx-auto p-6 md:p-12">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            About Our Cricket Store
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your one-stop shop for all things cricket.
          </p>
        </header>

        {/* Main Content */}
        <main className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to the ultimate destination for cricket enthusiasts! Our
            application was born from a deep passion for the game. We noticed
            that it was often difficult for players at all levels—from local
            club members to aspiring professionals—to find high-quality,
            reliable cricket gear all in one place.
          </p>
          <br />
          <p className="text-gray-600 leading-relaxed">
            Our mission is simple: to provide the best cricket equipment, from
            bats and balls to protective gear and apparel, with just a few
            clicks. We partner with trusted brands to ensure every product we
            offer meets the highest standards of quality and performance.
            Whether you're just starting out or are a seasoned player, our store
            is here to support your cricketing journey.
          </p>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Cricket Store Application. All
            Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
