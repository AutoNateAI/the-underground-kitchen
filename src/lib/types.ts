// Core Types
export type PostType = 'blog' | 'podcast';
export type LeadStatus = 'new' | 'in_progress' | 'won' | 'lost';
export type LeadType = 'catering' | 'general' | 'career';

// Menu
export interface MenuCategory {
  id: string;
  title: string;
  slug: string;
  order: number;
  description?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  price: number;
  description?: string;
  dietary?: string[]; // e.g. ["vegan", "gluten-free"]
  photoUrl?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  available?: boolean;
}

// Content
export interface Author {
  id: string;
  displayName: string;
  bio?: string;
  headshotUrl?: string;
  socials?: Record<string, string>;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  coverImageUrl?: string;
  
  // Podcast specific
  audioUrl?: string;
  duration?: number; // in seconds
  transcript?: string;
  
  // Meta
  tags?: string[];
  authorId?: string;
  publishedAt?: string;
  
  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
  };
}

// Leads
export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  
  // Catering specific
  eventDate?: string;
  headcount?: number;
  budgetRange?: string;
  
  // Meta
  source?: string;
  createdAt: string;
  status: LeadStatus;
}

// Special Offers
export interface Special {
  id: string;
  title: string;
  description: string;
  validFrom: string;
  validUntil: string;
  imageUrl?: string;
  active: boolean;
}

// Testimonials
export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
  photoUrl?: string;
}

