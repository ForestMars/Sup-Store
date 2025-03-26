import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Shirt } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shirt className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">T-Shirt Store</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-gray-800">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;