'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Flame, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { BRAND } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80" 
            alt="Delicious burger"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>
        
        {/* Floating orbs for depth */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="gradient-text">
                The Underground
              </span>
              <br />
              <span className="text-white">Kitchen</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-200 mb-8 max-w-3xl mx-auto font-medium">
              {BRAND.tagline}
            </p>
            
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              Handcrafted burgers made with local ingredients in the heart of Grand Rapids. 
              We're building more than a restaurant—we're building community, one burger at a time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/order">
                <Button size="lg" className="w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/menu">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Menu
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-2 text-white/60">
              <Flame size={20} className="text-brand-400" />
              <span className="text-sm">
                Call us: <a href={`tel:${BRAND.phone.replace(/\D/g, '')}`} className="text-brand-400 hover:text-brand-300 transition-colors">{BRAND.phone}</a>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="gradient-text">Underground?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We're redefining what a burger joint can be
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80" 
                  alt="Gourmet burger"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>Craft Burgers</CardTitle>
              <CardDescription>
                Hand-smashed patties, premium local beef, and flavor combinations 
                you won't find anywhere else in West Michigan.
              </CardDescription>
            </Card>

            <Card>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&q=80" 
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>GR Community</CardTitle>
              <CardDescription>
                Proudly local. We source from Grand Rapids farmers and makers, 
                and we're building the burger community this city deserves.
              </CardDescription>
            </Card>

            <Card>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80" 
                  alt="Fresh ingredients"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>Fresh & Local</CardTitle>
              <CardDescription>
                Farm-fresh produce, artisan buns from local bakeries, and 
                ingredients you can feel good about eating.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Catering That <span className="gradient-text">Elevates</span>
                </h2>
                <p className="text-xl text-white/70 mb-6">
                  From corporate events to private parties, bring The Underground 
                  Kitchen experience to your next gathering.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-brand-400" />
                    <span className="text-white/80">Custom menu planning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-brand-400" />
                    <span className="text-white/80">Flexible serving sizes</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-brand-400" />
                    <span className="text-white/80">Professional setup & service</span>
                  </li>
                </ul>
                <Link href="/catering">
                  <Button size="lg">
                    Book Catering
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80"
                    alt="Catering spread"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience <span className="gradient-text">The Underground?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join Grand Rapids' most exciting burger community today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/order">
                <Button size="lg">Order Now</Button>
              </Link>
              <Link href="/community">
                <Button variant="secondary" size="lg">Join Community</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

