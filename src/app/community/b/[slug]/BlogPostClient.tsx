'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mockPosts } from '@/lib/mockData';

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = mockPosts[slug];
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

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

