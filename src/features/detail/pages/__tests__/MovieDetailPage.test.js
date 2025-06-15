import { render, screen } from '@testing-library/react';
import MovieDetailPage from '../MovieDetailPage';
import '@testing-library/jest-dom';

// Mock del componente BackButton
jest.mock('../../components/BackButton', () => {
    return function MockBackButton() {
        return <button data-testid="back-button">Back</button>;
    };
});

const mockMovieWithCredits = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    overview: 'This is a test movie overview',
    release_date: '2023-01-15',
    runtime: 120,
    vote_average: 8.5,
    rating: 'PG-13',
    genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
    ],
    credits: {
        crew: [
            { job: 'Director', name: 'John Director' },
            { job: 'Producer', name: 'Jane Producer' },
        ],
        cast: [
            { name: 'Actor One' },
            { name: 'Actor Two' },
            { name: 'Actor Three' },
            { name: 'Actor Four' },
        ],
    },
};

const mockMovieMinimalData = {
    id: 2,
    title: 'Minimal Movie',
    poster_path: '/minimal-poster.jpg',
    backdrop_path: '/minimal-backdrop.jpg',
    overview: 'Minimal overview',
    release_date: '2023-06-10',
    vote_average: 7.2,
};

describe('MovieDetailPage', () => {
    test('renders movie title', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getAllByText('Test Movie')).toHaveLength(2); // Appears in both desktop and mobile views
    });

    test('renders movie overview', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        // Use getAllByText since overview appears in both desktop and mobile layouts
        const overviewElements = screen.getAllByText('This is a test movie overview');
        expect(overviewElements).toHaveLength(2);
        expect(overviewElements[0]).toBeInTheDocument();
    });

    test('renders release year', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getAllByText('2023')).toHaveLength(2); // Shows in both desktop and mobile
    });

    test('renders formatted runtime', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getAllByText('2h 0m')).toHaveLength(2); // Displays formatted runtime in both views
    });

    test('renders rating when provided', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getAllByText('PG-13')).toHaveLength(2); // Rating chip appears in both layouts
    });

    test('renders formatted vote average', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getAllByText('8.5')).toHaveLength(2); // IMDb rating shown in both views
    });

    test('renders IMDb logo', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getAllByText('IMDb')).toHaveLength(2); // IMDb branding appears twice
    });

    test('renders director information', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getByText('Director')).toBeInTheDocument();
        expect(screen.getByText('John Director')).toBeInTheDocument(); // Shows director name from credits
    });

    test('renders main actors (first 3)', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getByText('Stars')).toBeInTheDocument();
        expect(screen.getByText('Actor One')).toBeInTheDocument();
        expect(screen.getByText('Actor Two')).toBeInTheDocument();
        expect(screen.getByText('Actor Three')).toBeInTheDocument();
        expect(screen.queryByText('Actor Four')).not.toBeInTheDocument(); // Only shows first 3 actors
    });

    test('renders genres', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getByText('Genres')).toBeInTheDocument();
        expect(screen.getByText('Action, Adventure')).toBeInTheDocument(); // Displays comma-separated genres
    });

    test('renders movie images with correct URLs', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);

        // Get all images with the same alt text
        const allImages = screen.getAllByAltText('Test Movie');
        expect(allImages).toHaveLength(2);

        // Backdrop image (desktop) - find by class or src containing w1920
        const backdropImage = allImages.find(
            (img) => img.getAttribute('src')?.includes('w1920') || img.className.includes('iIxebV'),
        );
        expect(backdropImage).toBeDefined();

        // Poster image (mobile) - find by src containing w500
        const posterImage = allImages.find((img) => img.getAttribute('src')?.includes('w500'));
        expect(posterImage).toBeDefined();
    });

    test('renders BackButton component', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getByTestId('back-button')).toBeInTheDocument(); // Mocked BackButton is present
    });

    test('renders Overview heading in mobile layout', () => {
        render(<MovieDetailPage movie={mockMovieWithCredits} />);
        expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument(); // Mobile-specific heading
    });

    // Tests for graceful handling of missing data
    test('handles missing runtime gracefully', () => {
        const movieWithoutRuntime = { ...mockMovieMinimalData, runtime: null };
        render(<MovieDetailPage movie={movieWithoutRuntime} />);
        const naElements = screen.getAllByText('N/A');
        expect(naElements.length).toBeGreaterThanOrEqual(2); // Shows N/A for missing runtime in both views
    });

    test('handles missing rating gracefully', () => {
        render(<MovieDetailPage movie={mockMovieMinimalData} />);
        expect(screen.queryByText('PG-13')).not.toBeInTheDocument(); // No rating chip when rating is missing
    });

    test('handles missing director gracefully', () => {
        render(<MovieDetailPage movie={mockMovieMinimalData} />);
        expect(screen.getByText('Director')).toBeInTheDocument();
        const naElements = screen.getAllByText('N/A');
        expect(naElements.length).toBeGreaterThan(0); // Shows N/A when director is missing
    });

    test('handles missing cast gracefully', () => {
        render(<MovieDetailPage movie={mockMovieMinimalData} />);
        expect(screen.getByText('Stars')).toBeInTheDocument(); // Stars section is present even when cast is empty
    });

    test('handles missing genres gracefully', () => {
        render(<MovieDetailPage movie={mockMovieMinimalData} />);
        expect(screen.getByText('Genres')).toBeInTheDocument();
        const naElements = screen.getAllByText('N/A');
        expect(naElements.length).toBeGreaterThan(0); // Shows N/A when genres are missing
    });

    test('formats vote average correctly', () => {
        render(<MovieDetailPage movie={mockMovieMinimalData} />);
        expect(screen.getAllByText('7.2')).toHaveLength(2); // Vote average displayed in both views
    });

    test('handles invalid vote average', () => {
        const movieWithInvalidRating = { ...mockMovieMinimalData, vote_average: NaN };
        render(<MovieDetailPage movie={movieWithInvalidRating} />);
        const naElements = screen.getAllByText('N/A');
        expect(naElements.length).toBeGreaterThanOrEqual(4); // Shows N/A for invalid vote average
    });

    test('formats runtime correctly for different values', () => {
        const movieWith150MinRuntime = { ...mockMovieWithCredits, runtime: 150 };
        render(<MovieDetailPage movie={movieWith150MinRuntime} />);
        expect(screen.getAllByText('2h 30m')).toHaveLength(2); // Correctly formats 150 minutes as 2h 30m
    });

    test('formats runtime correctly for less than 60 minutes', () => {
        const movieWith45MinRuntime = { ...mockMovieWithCredits, runtime: 45 };
        render(<MovieDetailPage movie={movieWith45MinRuntime} />);
        expect(screen.getAllByText('0h 45m')).toHaveLength(2); // Correctly formats short runtime as 0h 45m
    });
});
