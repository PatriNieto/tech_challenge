import Link from 'next/link';
import Image from 'next/image';
import { Card, MovieTitle } from './styles';
import { Movie } from '@/types/movies';

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link href={`/movie/${movie.id}`} passHref>
            <Card>
                <Image
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    style={{ width: '100%', height: 'auto' }}
                />
                <MovieTitle>{movie.title}</MovieTitle>
            </Card>
        </Link>
    );
}
