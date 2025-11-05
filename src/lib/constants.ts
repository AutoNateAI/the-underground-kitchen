export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'The Underground Kitchen',
  phone: process.env.NEXT_PUBLIC_BRAND_PHONE || '616.290.9198',
  city: process.env.NEXT_PUBLIC_CITY || 'Grand Rapids, MI',
  tagline: 'Grand Rapids\' Next-Generation Burger Joint',
  description: 'Handcrafted burgers with a twist. We\'re not just serving food—we\'re building a community around the art of the perfect burger.',
  email: 'hello@undergroundkitchen.com',
  socialMedia: {
    instagram: 'https://instagram.com/theundergroundkitchen',
    facebook: 'https://facebook.com/theundergroundkitchen',
    twitter: 'https://twitter.com/tukgr',
  },
};

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Order', href: '/order' },
  { name: 'Catering', href: '/catering' },
  { name: 'Community', href: '/community' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];




