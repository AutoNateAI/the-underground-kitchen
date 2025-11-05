'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Mock data - replace with Firebase later
const mockPosts: any = {
  'why-smash-burgers': {
    id: '1',
    type: 'blog',
    title: 'Behind the Grill: Why Smash Burgers Are Superior',
    slug: 'why-smash-burgers',
    excerpt: 'The science behind the perfect crust and why we chose the smash burger technique.',
    coverImageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200&q=80',
    publishedAt: '2025-10-31T15:00:00Z',
    tags: ['cooking', 'technique', 'science'],
    body: `
      <p>If you've ever wondered why our burgers at The Underground Kitchen taste different—better—it's not just the quality ingredients or our secret sauce. It's the smash.</p>
      
      <h2>The Maillard Reaction</h2>
      <p>When we smash a ball of fresh ground beef onto our screaming-hot flat-top, something magical happens. The intense heat and pressure create what scientists call the Maillard reaction—a chemical process that transforms amino acids and sugars into hundreds of flavor compounds.</p>
      
      <p>This is what creates that incredible, crispy, caramelized crust that makes a smash burger unforgettable. You can't get this with a thick patty on a grill. The physics just don't work the same way.</p>
      
      <h2>The Technique</h2>
      <p>Here's how we do it at TUK:</p>
      <ul>
        <li>Start with fresh, never-frozen, locally-sourced beef (80/20 blend)</li>
        <li>Form into a loose ball—never pre-form patties</li>
        <li>Heat the flat-top to 400-450°F</li>
        <li>Smash hard with our custom press for exactly 3 seconds</li>
        <li>Let it cook undisturbed for 2 minutes to build the crust</li>
        <li>Flip once, add cheese, and finish for 1 minute</li>
      </ul>
      
      <h2>Why We Don't Grill</h2>
      <p>Traditional grilling has its place, but for the kind of burger we're making, it's all wrong. Grills create distance between the meat and heat source. Flat-tops provide direct, intimate contact. That contact is everything.</p>
      
      <p>Plus, all those delicious juices that would drip through grill grates? On our flat-top, they stay in contact with the patty, contributing to flavor and crust development.</p>
      
      <h2>The Grand Rapids Difference</h2>
      <p>We source our beef from Michigan farms within 50 miles of Grand Rapids. Fresh, never frozen means the proteins are intact and ready to react perfectly with heat. This isn't just better for flavor—it's better for our community and environment.</p>
      
      <p>Next time you bite into one of our burgers, you're not just tasting beef and toppings. You're tasting chemistry, technique, and a whole lot of Grand Rapids love.</p>
    `,
  },
  'perfect-bun': {
    id: '3',
    type: 'blog',
    title: 'The Art of the Perfect Bun',
    slug: 'perfect-bun',
    excerpt: 'Why your bun matters just as much as your patty, and how we source ours.',
    coverImageUrl: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=1200&q=80',
    publishedAt: '2025-10-28T12:00:00Z',
    tags: ['ingredients', 'quality', 'local'],
    body: `
      <p>Let's talk about something that often gets overlooked in the burger conversation: the bun. At The Underground Kitchen, we believe a burger is only as good as the bread holding it together.</p>
      
      <h2>What Makes a Great Bun?</h2>
      <p>A truly great burger bun needs to achieve a delicate balance:</p>
      <ul>
        <li><strong>Soft interior:</strong> Pillowy and yielding, but not mushy</li>
        <li><strong>Sturdy structure:</strong> Strong enough to hold up to juices and toppings</li>
        <li><strong>Slight sweetness:</strong> Complementing the savory beef</li>
        <li><strong>Toasted exterior:</strong> Crispy, buttery, with that perfect golden color</li>
      </ul>
      
      <h2>Our Grand Rapids Bakery Partners</h2>
      <p>We don't make our buns in-house, and that's intentional. Instead, we partner with Grand Rapids' best artisan bakeries who have perfected the craft over generations.</p>
      
      <p>Our brioche-style buns come fresh daily, baked with Michigan butter, local eggs, and just a touch of honey. The recipe is simple, but the execution requires expertise we respect enough not to replicate.</p>
      
      <h2>The Toast Technique</h2>
      <p>Even a perfect bun needs proper preparation. Here's our process:</p>
      <ol>
        <li>Slice the bun evenly (this matters more than you think)</li>
        <li>Brush the cut sides with melted butter</li>
        <li>Toast face-down on the flat-top until golden brown</li>
        <li>The whole process takes exactly 60 seconds</li>
      </ol>
      
      <p>This creates a moisture barrier that prevents sogginess while adding flavor and texture. It's a small detail that makes a huge difference.</p>
      
      <h2>Supporting Local</h2>
      <p>Every bun we serve supports a Grand Rapids family business. That's worth something to us—and we hope it's worth something to you too. When you bite into our burgers, you're supporting a web of local excellence.</p>
    `,
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch - replace with actual Firebase call
    const slug = params.slug as string;
    const foundPost = mockPosts[slug];
    setPost(foundPost || null);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-white/50">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/community">
            <Button>Back to Community</Button>
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <article className="relative z-10 max-w-4xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/community" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Community
          </Link>
        </motion.div>

        {/* Cover image */}
        {post.coverImageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-96 rounded-3xl overflow-hidden mb-8"
          >
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar size={16} className="text-orange-400" />
                <span className="text-sm text-orange-400 uppercase font-semibold">
                  Blog Post
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {post.title}
              </h1>
            </div>
          </motion.div>
        )}

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card hover={false}>
            {post.excerpt && (
              <p className="text-xl text-white/80 mb-6 leading-relaxed">{post.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm pb-6 border-b border-white/10">
              {post.publishedAt && (
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>5 min read</span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag size={16} />
                  <div className="flex gap-2">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="text-orange-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card"
        >
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-orange-400
              prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:text-white/80 prose-ul:my-6
              prose-li:mb-2
              prose-strong:text-white prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card hover={false}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Hungry Yet?</h3>
              <p className="text-white/70 mb-6">
                Come taste what we're talking about. Stop by The Underground Kitchen in Grand Rapids.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/menu">
                  <Button>View Menu</Button>
                </Link>
                <Link href="/community">
                  <Button variant="secondary">More Articles</Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </article>
    </div>
  );
}

