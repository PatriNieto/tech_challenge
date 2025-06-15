// pages/movie/[id].tsx
import { GetServerSideProps } from 'next';
import { getMovieWithRating } from '../../lib/apiClient';
import MovieDetailPage from '../../features/detail/pages/MovieDetailPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    try {
        const movie = await getMovieWithRating(id as string);

        return {
            props: {
                movie,
            },
        };
    } catch (error) {
        console.error('Error fetching movie:', error);
        return { notFound: true };
    }
};

export default function MovieDetail({ movie }: { movie: any }) {
    return <MovieDetailPage movie={movie} />;
}
