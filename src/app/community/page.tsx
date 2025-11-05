'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Headphones, ArrowRight } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock data - will be replaced with Firebase data
const posts = [
  {
    id: '1',
    type: 'blog' as const,
    title: 'Behind the Grill: Why Smash Burgers Are Superior',
    slug: 'why-smash-burgers',
    excerpt: 'The science behind the perfect crust and why we chose the smash burger technique for The Underground Kitchen.',
    publishedAt: '2025-10-31',
    tags: ['cooking', 'technique'],
    coverImageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80',
  },
  {
    id: '2',
    type: 'podcast' as const,
    title: 'Burger & Beer Pairings in Grand Rapids',
    slug: 'burger-beer-pairings',
    excerpt: 'Exploring the best local craft beers to pair with our signature burgers.',
    duration: 1180,
    publishedAt: '2025-11-01',
    tags: ['pairings', 'local'],
    coverImageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80',
  },
  {
    id: '3',
    type: 'blog' as const,
    title: 'The Art of the Perfect Bun',
    slug: 'perfect-bun',
    excerpt: 'Why your bun matters just as much as your patty, and how we source ours.',
    publishedAt: '2025-10-28',
    tags: ['ingredients', 'quality'],
    coverImageUrl: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=800&q=80',
  },
];

export default function CommunityPage() {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Community</span> Hub
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Stories, recipes, and love letters to Grand Rapids food culture
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-12">
          <Button variant="primary" size="sm">All</Button>
          <Button variant="secondary" size="sm">
            <Calendar size={16} className="mr-2" />
            Blog
          </Button>
          <Button variant="secondary" size="sm">
            <Headphones size={16} className="mr-2" />
            Podcast
          </Button>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/community/${post.type === 'podcast' ? 'p' : 'b'}/${post.slug}`}>
                <Card>
                  {/* Cover Image */}
                  {post.coverImageUrl && (
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 -mt-2 -mx-2">
                      <img 
                        src={post.coverImageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 mb-3">
                    {post.type === 'podcast' ? (
                      <Headphones size={16} className="text-purple-400" />
                    ) : (
                      <Calendar size={16} className="text-orange-400" />
                    )}
                    <span className="text-sm text-white/50 uppercase">
                      {post.type}
                    </span>
                    {post.type === 'podcast' && post.duration && (
                      <span className="text-sm text-white/50">
                        • {formatDuration(post.duration)}
                      </span>
                    )}
                  </div>
                  
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-white/50">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>

                  {post.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-white/5 text-xs text-white/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-8 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
          <p className="text-white/70 mb-6">
            Get our latest posts, special offers, and burger news delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="glass-input flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

