import { Movie, MovieWithCredits } from '@/types/movies';
import BackButton from '../components/BackButton';
import {
    MovieDetailContainer,
    MobileLayout,
    DesktopLayout,
    DesktopImageSection,
    DesktopContentSection,
    DesktopBackdropImage,
    DesktopImageOverlaySoft as DesktopImageOverlay,
    MobileContainer,
    MobileImage,
    ContentContainer,
    MovieTitle,
    MovieMetadata,
    MetadataLeft,
    MetadataChip,
    RatingContainer,
    IMDbLogo,
    RatingValue,
    OverviewSection,
    OverviewText,
    InfoGrid,
    InfoSection,
    InfoList,
    BackButtonContainer,
    DesktopInfoGridSection,
    DesktopMainContent,
} from './styles';

export default function MovieDetailPage({ movie }: { movie: MovieWithCredits }) {
    // Format the runtime to display in hours and minutes
    let formattedRuntime: string;
    if (!movie.runtime) {
        formattedRuntime = 'N/A';
    } else {
        const minutes = movie.runtime;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        formattedRuntime = `${hours}h ${remainingMinutes}m`;
    }

    //Format the rating to 1 decimal place
    const formatRating = (rating: number): string => {
        if (typeof rating === 'number' && !isNaN(rating)) {
            return rating.toFixed(1);
        }
        return 'N/A';
    };

    //change image source to use the correct path
    const getImageUrl = (movie: Movie, type: 'backdrop' | 'poster' = 'poster') => {
        const imgSrc = 'https://image.tmdb.org/t/p/';
        if (type === 'backdrop') {
            return `${imgSrc}w1920${movie.backdrop_path}`;
        } else {
            return `${imgSrc}w500${movie.poster_path}`;
        }
    };

    // Get director from credits
    const getDirector = () => {
        return (
            movie.credits?.crew.find((person: { job: string }) => person.job === 'Director')
                ?.name || 'N/A'
        );
    };

    // Get main actors (first 3)
    const getMainActors = () => {
        return movie.credits?.cast.slice(0, 3).map((actor: { name: string }) => actor.name) || [];
    };

    // Get genres as string
    const getGenres = () => {
        return movie.genres?.map((genre: { name: string }) => genre.name).join(', ') || 'N/A';
    };

    return (
        <div
            style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <MovieDetailContainer>
                {/* Desktop Layout */}
                <DesktopLayout>
                    <DesktopMainContent>
                        <DesktopImageSection>
                            <DesktopBackdropImage
                                src={getImageUrl(movie, 'backdrop')}
                                alt={movie.title}
                                width={1920}
                                height={1080}
                            />
                            <DesktopImageOverlay />
                        </DesktopImageSection>

                        <DesktopContentSection>
                            <div>
                                <MovieTitle>{movie.title}</MovieTitle>

                                <MovieMetadata>
                                    <MetadataLeft>
                                        <MetadataChip>
                                            {new Date(movie.release_date).getFullYear()}
                                        </MetadataChip>
                                        {movie.rating && (
                                            <MetadataChip>{movie.rating}</MetadataChip>
                                        )}
                                        <MetadataChip>{formattedRuntime}</MetadataChip>
                                    </MetadataLeft>

                                    <RatingContainer>
                                        <IMDbLogo>IMDb</IMDbLogo>
                                        <RatingValue>
                                            {formatRating(movie.vote_average)}
                                        </RatingValue>
                                    </RatingContainer>
                                </MovieMetadata>

                                <OverviewSection>
                                    <OverviewText>{movie.overview}</OverviewText>
                                </OverviewSection>
                            </div>
                        </DesktopContentSection>
                    </DesktopMainContent>

                    <DesktopInfoGridSection>
                        <InfoGrid>
                            <InfoSection>
                                <h3>Director</h3>
                                <InfoList>{getDirector()}</InfoList>
                            </InfoSection>

                            <InfoSection>
                                <h3>Stars</h3>
                                <InfoList>
                                    {getMainActors().map((actor: string, index: number) => (
                                        <div key={index}>{actor}</div>
                                    ))}
                                </InfoList>
                            </InfoSection>

                            <InfoSection>
                                <h3>Genres</h3>
                                <InfoList>{getGenres()}</InfoList>
                            </InfoSection>
                        </InfoGrid>
                    </DesktopInfoGridSection>
                </DesktopLayout>
                {/* Mobile Layout */}
                <MobileLayout>
                    <MobileContainer>
                        <MobileImage
                            src={getImageUrl(movie, 'poster')}
                            alt={movie.title}
                            width={500}
                            height={750}
                        />
                    </MobileContainer>

                    <ContentContainer>
                        <MovieTitle>{movie.title}</MovieTitle>

                        <MovieMetadata>
                            <MetadataLeft>
                                <MetadataChip>
                                    {new Date(movie.release_date).getFullYear()}
                                </MetadataChip>
                                {movie.rating && <MetadataChip>{movie.rating}</MetadataChip>}
                                <MetadataChip>{formattedRuntime}</MetadataChip>
                            </MetadataLeft>

                            <RatingContainer>
                                <IMDbLogo>IMDb</IMDbLogo>
                                <RatingValue>{formatRating(movie.vote_average)}</RatingValue>
                            </RatingContainer>
                        </MovieMetadata>

                        <OverviewSection>
                            <h2>Overview</h2>
                            <OverviewText>{movie.overview}</OverviewText>
                        </OverviewSection>
                    </ContentContainer>
                </MobileLayout>
            </MovieDetailContainer>
            <BackButtonContainer>
                <BackButton />
            </BackButtonContainer>
        </div>
    );
}
