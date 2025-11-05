'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/constants';

export default function OrderPage() {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Order</span> Online
          </h1>
          <p className="text-xl text-white/70">
            Your favorite burgers, delivered or ready for pickup
          </p>
        </motion.div>

        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Order Integration Coming Soon</h2>
          <p className="text-white/70 mb-8">
            We're working on integrating online ordering. For now, give us a call to place your order!
          </p>
          <div className="space-y-4">
            <a href={`tel:${BRAND.phone.replace(/\D/g, '')}`}>
              <Button size="lg" className="w-full sm:w-auto">
                Call {BRAND.phone}
              </Button>
            </a>
            <p className="text-white/50 text-sm">
              Or visit us in {BRAND.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




