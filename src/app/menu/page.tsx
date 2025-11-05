'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Card, CardTitle, CardDescription, CardImage } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Mock data - will be replaced with Firebase data
const menuCategories = [
  { id: 'all', title: 'All' },
  { id: 'burgers', title: 'Burgers' },
  { id: 'sides', title: 'Sides' },
  { id: 'drinks', title: 'Drinks' },
  { id: 'desserts', title: 'Desserts' },
];

const menuItems = [
  {
    id: '1',
    title: 'Beer City Bacon Stack',
    categoryId: 'burgers',
    price: 13.50,
    description: 'Two smashed patties, crispy bacon, beer-cheese sauce, pickles, on a toasted brioche bun.',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
  },
  {
    id: '2',
    title: 'The Underground Classic',
    categoryId: 'burgers',
    price: 11.00,
    description: 'Our signature smashed burger with lettuce, tomato, onion, and our secret sauce.',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80',
  },
  {
    id: '3',
    title: 'Truffle Mushroom Melt',
    categoryId: 'burgers',
    price: 14.50,
    description: 'Sautéed mushrooms, truffle aioli, swiss cheese, caramelized onions.',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80',
  },
  {
    id: '4',
    title: 'Loaded Waffle Fries',
    categoryId: 'sides',
    price: 6.50,
    description: 'Crispy waffle fries topped with cheese sauce, bacon bits, and scallions.',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1630384082935-3b8d4c3e4f37?w=500&q=80',
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background with food texture */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1920&q=80"
          alt="texture"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Our <span className="gradient-text">Menu</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Handcrafted burgers and sides that'll blow your mind
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <Input
              type="text"
              placeholder="Search menu..."
              className="pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {menuCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                {item.imageUrl && (
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 -mt-2 -mx-2">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.isFeatured && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                )}
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-400">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button size="sm">Add to Order</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-white/50">No items found</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to order?</h3>
            <p className="text-white/70 mb-6">
              Place your order now for pickup or delivery
            </p>
            <Button size="lg">Start Your Order</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

