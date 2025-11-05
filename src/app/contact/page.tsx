'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import LeadForm from '@/components/LeadForm';
import { BRAND } from '@/lib/constants';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Questions, feedback, or just want to chat about burgers? We're here.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card hover={false}>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href={`tel:${BRAND.phone.replace(/\D/g, '')}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-white/70">{BRAND.city}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-white/5">
                <h3 className="font-semibold mb-2">Hours</h3>
                <div className="text-sm text-white/70 space-y-1">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>11am - 9pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>12pm - 10pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>12pm - 8pm</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card hover={false}>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <LeadForm type="general" />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




