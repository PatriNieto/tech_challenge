import axios from 'axios';

const apiKey = process.env.TMDB_API_KEY;

const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        language: 'en-US',
    },
    headers: {
        Authorization: `Bearer ${apiKey}`,
    },
});

export const getMovieRating = async (id: string): Promise<string> => {
    try {
        const response = await apiClient.get(`/movie/${id}/release_dates`);

        // Find US release
        const usRelease = response.data.results.find(
            (country: { iso_3166_1: string; release_dates: { certification: string }[] }) =>
                country.iso_3166_1 === 'US',
        );

        if (usRelease && usRelease.release_dates.length > 0) {
            const certification = usRelease.release_dates[0].certification;
            if (certification) {
                return certification;
            }
        }

        // If no US rating, search any other
        for (const country of response.data.results) {
            if (country.release_dates.length > 0) {
                const certification = country.release_dates[0].certification;
                if (certification) {
                    return certification;
                }
            }
        }

        return 'Not Rated';
    } catch (error) {
        console.error('Error fetching movie rating:', error);
        return 'Not Rated';
    }
};

// Function to get movie details along with its rating
export const getMovieWithRating = async (id: string) => {
    try {
        const [movieResponse, rating] = await Promise.all([
            apiClient.get(`/movie/${id}`, {
                params: {
                    append_to_response: 'credits',
                },
            }),
            getMovieRating(id),
        ]);

        const movieData = {
            ...movieResponse.data,
            rating: rating,
        };

        return movieData;
    } catch (error) {
        console.error('Error fetching movie with rating:', error);
        throw error;
    }
};

export default apiClient;
