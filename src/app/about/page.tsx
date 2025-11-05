'use client';

import { motion } from 'framer-motion';
import { Flame, Heart, Users, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { BRAND } from '@/lib/constants';

export default function AboutPage() {
  const values = [
    {
      icon: Flame,
      title: 'Quality First',
      description: 'We source the best ingredients and never compromise on quality.',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Building connections through food, one burger at a time.',
    },
    {
      icon: Users,
      title: 'Local Pride',
      description: 'Proud to be part of the Grand Rapids food scene.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing boundaries while respecting burger tradition.',
    },
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
          alt="texture"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="gradient-text">The Underground Kitchen</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We're more than a burger joint—we're a movement to redefine what fast-casual dining can be
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card hover={false}>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                The Underground Kitchen was born in Grand Rapids with a mission: to prove that fast-casual 
                doesn't have to mean compromising on quality, community, or creativity. We're locals who 
                fell in love with the burger—and with this city.
              </p>
              <p>
                Grand Rapids gave us everything we needed: incredible local farmers, talented bakers crafting 
                artisan buns, a community that values authenticity, and neighbors who became our first 
                customers—and our biggest fans. We're not just in GR, we're OF GR.
              </p>
              <p>
                Every burger starts with hand-selected local beef, hand-smashed on our flat-top. Our buns 
                come from Grand Rapids bakeries. Our produce is Michigan-grown when possible. We pair with 
                local breweries for the perfect burger-and-beer experience. This is community-supported 
                dining at its finest.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="gradient-text">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center mb-4">
                    <value.icon size={24} className="text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-white/80 leading-relaxed">
            To create exceptional burger experiences that bring people together, support our local 
            community, and prove that fast-casual dining can be both innovative and authentic. We're 
            here to serve not just great food, but to build lasting connections through the universal 
            language of a damn good burger.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

