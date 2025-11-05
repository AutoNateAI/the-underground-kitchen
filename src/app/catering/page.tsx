'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import LeadForm from '@/components/LeadForm';

export default function CateringPage() {
  const features = [
    {
      icon: Users,
      title: 'Any Size Event',
      description: 'From intimate gatherings to large corporate events',
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'We work around your timeline and requirements',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description: 'Premium quality without breaking the bank',
    },
  ];

  const packages = [
    'Burger bar with build-your-own options',
    'Slider platters with variety selections',
    'Complete meal packages with sides & drinks',
    'Vegetarian & vegan options available',
    'Custom menus for dietary restrictions',
    'Professional setup & service staff',
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background with catering image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80"
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
            <span className="gradient-text">Catering</span> Services
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Elevate your next event with The Underground Kitchen's premium burger catering
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-brand-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Package Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card hover={false}>
              <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
              <ul className="space-y-4">
                {packages.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-brand-400" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Minimum order:</strong> 20 people
                  <br />
                  <strong className="text-white">Lead time:</strong> 48 hours preferred
                  <br />
                  <strong className="text-white">Pricing:</strong> Starting at $12-18 per person
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card hover={false}>
              <h2 className="text-3xl font-bold mb-6">Request a Quote</h2>
              <LeadForm type="catering" />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

