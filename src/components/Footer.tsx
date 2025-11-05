'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="glass-card rounded-none border-0 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                {BRAND.name}
              </h3>
              <p className="text-white/70 mb-4 max-w-md">
                Grand Rapids' home for handcrafted burgers, local ingredients, 
                and community that tastes as good as it feels.
              </p>
              <div className="flex space-x-4">
                <a
                  href={BRAND.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn p-3 hover:text-brand-400"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={BRAND.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn p-3 hover:text-brand-400"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={BRAND.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn p-3 hover:text-brand-400"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/menu" className="text-white/70 hover:text-white transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="text-white/70 hover:text-white transition-colors">
                    Order Online
                  </Link>
                </li>
                <li>
                  <Link href="/catering" className="text-white/70 hover:text-white transition-colors">
                    Catering
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-white/70 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2 text-white/70">
                  <Phone size={16} />
                  <a href={`tel:${BRAND.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                    {BRAND.phone}
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-white/70">
                  <Mail size={16} />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                    {BRAND.email}
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-white/70">
                  <MapPin size={16} />
                  <span>{BRAND.city}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

