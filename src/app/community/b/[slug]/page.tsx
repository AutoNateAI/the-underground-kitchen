import BlogPostClient from './BlogPostClient';
import { mockPosts } from '@/lib/mockData';

interface PageProps {
  params: {
    slug: string;
  };
}

// Required for static export with dynamic routes
export function generateStaticParams() {
  return Object.keys(mockPosts).map((slug) => ({
    slug: slug,
  }));
}

export default function BlogPostPage({ params }: PageProps) {
  return <BlogPostClient slug={params.slug} />;
}
