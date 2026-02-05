'use client';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';

import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';

interface NotesClientProps {
  tag: string;
}

function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const queryKey = tag
    ? ['notes', { page, searchValue, tag }]
    : ['notes', { page, searchValue }];
  const { data, isSuccess } = useQuery({
    queryKey,
    queryFn: () => fetchNotes(page, searchValue, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const totalPages = data?.totalPages || 0;

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
