import PodcastPostClient from './PodcastPostClient';
import { mockPodcasts } from '@/lib/mockData';

interface PageProps {
  params: {
    slug: string;
  };
}

// Required for static export with dynamic routes
export function generateStaticParams() {
  return Object.keys(mockPodcasts).map((slug) => ({
    slug: slug,
  }));
}

export default function PodcastPostPage({ params }: PageProps) {
  return <PodcastPostClient slug={params.slug} />;
}
