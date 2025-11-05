'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Headphones, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Mock data - replace with Firebase later
const mockPodcasts: any = {
  'burger-beer-pairings': {
    id: '2',
    type: 'podcast',
    title: 'Burger & Beer Pairings in Grand Rapids',
    slug: 'burger-beer-pairings',
    excerpt: 'Exploring the best local craft beers to pair with our signature burgers.',
    coverImageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=1200&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 1180,
    publishedAt: '2025-11-01T12:00:00Z',
    tags: ['pairings', 'local', 'beer'],
    transcript: `
Welcome to The Underground Kitchen Podcast! I'm your host, and today we're talking about one of my favorite topics: pairing our burgers with Grand Rapids' incredible craft beer scene.

Grand Rapids is known as Beer City USA for a reason. We have more breweries per capita than almost anywhere in the country. And lucky for us burger lovers, beer and burgers are a match made in heaven.

Let's start with our Beer City Bacon Stack. This burger is rich, savory, with that beer-cheese sauce that's become our signature. For this, you want something that can cut through the richness. I recommend a good IPA from Founders Brewing. The hop bitterness and citrus notes balance perfectly with the bacon and cheese.

The Underground Classic—our signature smashed burger—is more straightforward. Beef, lettuce, tomato, onion, secret sauce. This is where you want something crisp and refreshing. A pilsner from Brewery Vivant works beautifully here. It cleanses your palate between bites without overwhelming the burger.

Now, the Truffle Mushroom Melt. This is our fancy burger. Earthy mushrooms, truffle aioli, swiss cheese. You need something equally sophisticated. I'm thinking a Belgian dubbel from New Holland Brewing. Those malty, slightly sweet notes complement the earthiness of the mushrooms perfectly.

The key to great pairings is thinking about balance. You want the beer to enhance the burger, not compete with it. Too hoppy can overpower delicate flavors. Too sweet can clash with savory elements.

Here's my pro tip: when in doubt, go with what's local and fresh. Grand Rapids breweries are making world-class beer right in our backyard. Try different combinations. Take notes. Find what YOU love.

And remember, the best pairing is always the one you enjoy most. These are guidelines, not rules. Food and beer should be fun, not stressful.

That's all for today's episode. Come visit us at The Underground Kitchen and try these pairings yourself. We're proud to feature local brews from our Grand Rapids brewery friends.

Until next time, keep it smashed and keep it local!
    `,
  },
};

export default function PodcastPostPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    const foundPost = mockPodcasts[slug];
    setPost(foundPost || null);
    setLoading(false);
  }, [params.slug]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <h1 className="text-4xl font-bold mb-4">Episode Not Found</h1>
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
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center space-x-2 mb-3">
                <Headphones size={20} className="text-purple-400" />
                <span className="text-sm text-purple-400 uppercase font-semibold">
                  Podcast Episode
                </span>
                {post.duration && (
                  <span className="text-sm text-white/70">
                    • {formatDuration(post.duration)}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
            </div>
          </motion.div>
        )}

        {/* Audio Player Card */}
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

            {/* Audio Player */}
            {post.audioUrl && (
              <div className="space-y-4">
                <audio 
                  controls 
                  className="w-full rounded-xl"
                  style={{
                    filter: 'invert(0.9) hue-rotate(180deg)',
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={post.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                <div className="flex items-center justify-between text-sm text-white/60 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  
                  {post.tags && (
                    <div className="flex gap-2">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="text-purple-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Transcript */}
        {post.transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-center space-x-2 mb-6 pb-6 border-b border-white/10">
              <Headphones size={20} className="text-purple-400" />
              <h2 className="text-2xl font-bold">Episode Transcript</h2>
            </div>
            <div className="whitespace-pre-wrap text-white/80 leading-relaxed space-y-4">
              {post.transcript.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card hover={false}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">More Episodes</h3>
              <p className="text-white/70 mb-6">
                Subscribe to hear more stories from The Underground Kitchen
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/community?type=podcast">
                  <Button>All Podcasts</Button>
                </Link>
                <Link href="/menu">
                  <Button variant="secondary">View Menu</Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </article>
    </div>
  );
}

