import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Notes by tag: ${slug[0]}`,
    description: `Filtered notes by ${slug[0]}`,
    openGraph: {
      title: `Notes by tag: ${slug[0]}`,
      description: `Filtered notes by ${slug[0]}`,
      url: `https://08-zustand-kappa-amber.vercel.app/notes/filter/${slug.join('/')}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${slug[0]}`,
        },
      ],
      type: 'website',
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === 'all' ? '' : slug[0];
  const queryKey = tag
    ? ['notes', { page: 1, searchValue: '', tag }]
    : ['notes', { page: 1, searchValue: '' }];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes(1, '', tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
