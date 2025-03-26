import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;