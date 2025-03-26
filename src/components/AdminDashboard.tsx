import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Plus } from 'lucide-react';

interface ProductForm {
  name: string;
  description: string;
  base_price: number;
  colors: string[];
  sizes: string[];
}

const AdminDashboard = () => {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    base_price: 0,
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name: form.name,
          description: form.description,
          base_price: form.base_price * 100 // Convert to cents
        })
        .select()
        .single();

      if (productError) throw productError;

      // Create variants
      const variants = form.colors.flatMap(color =>
        form.sizes.map(size => ({
          product_id: product.id,
          color,
          size,
          inventory_count: 100 // Default inventory
        }))
      );

      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variants);

      if (variantsError) throw variantsError;

      // Reset form
      setForm({
        name: '',
        description: '',
        base_price: 0,
        colors: ['White', 'Black'],
        sizes: ['S', 'M', 'L', 'XL']
      });

      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Create New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Price ($)
            </label>
            <input
              type="number"
              value={form.base_price}
              onChange={(e) => setForm({ ...form, base_price: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;