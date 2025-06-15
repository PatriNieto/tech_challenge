import { useState, useMemo } from 'react';
import { Movie } from '@/types/movies';
import MovieCard from '../components/MovieCard';

export default function MoviesListPage({ movies }: { movies: Movie[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    const filteredMovies = useMemo(() => {
        if (!searchTerm.trim()) return movies;
        return movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [movies, searchTerm]);

    // pages
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const currentMovies = filteredMovies.slice(startIndex, endIndex);

    // Reset search
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <input
                type="text"
                placeholder="Search Movie..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                    width: '90%',
                    maxWidth: '400px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    margin: '0 auto',
                    outline: 'none',
                }}
            />

            <div style={{ marginBottom: '1rem', color: '#666' }}>
                {startIndex + 1}-{Math.min(endIndex, filteredMovies.length)} of{' '}
                {filteredMovies.length} movies
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}
            >
                {currentMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {totalPages > 1 && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '2rem',
                    }}
                >
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            background: currentPage === 1 ? '#f5f5f5' : 'white',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            color: currentPage === 1 ? '#999' : '#333',
                        }}
                    >
                        ← Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: currentPage === pageNum ? '#007bff' : 'white',
                                    color: currentPage === pageNum ? 'white' : '#333',
                                    cursor: 'pointer',
                                    fontWeight: currentPage === pageNum ? 'bold' : 'normal',
                                }}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            background: currentPage === totalPages ? '#f5f5f5' : 'white',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            color: currentPage === totalPages ? '#999' : '#333',
                        }}
                    >
                        Next →
                    </button>
                </div>
            )}

            {searchTerm && filteredMovies.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
                    No se encontraron películas para &quot;{searchTerm}&quot;
                </p>
            )}
        </div>
    );
}
