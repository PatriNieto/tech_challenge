// TODO complete the types with required data

export interface MoviesList {
    movies: Movie[];
}

export interface Movie {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    rating?: string;
    backdrop_path?: string;
}

export interface Genre {
    id: number;
    name: string;
}

// Tipos para créditos
export interface CastMember {
    id: number;
    name: string;
    character: string;
    order: number;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
}

export interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
}

// Extend Movie type to include credits and genres
export interface MovieWithCredits extends Movie {
    genres?: Genre[];
    credits?: Credits;
    // Propiedades de conveniencia para acceso fácil
    director?: string;
    mainActors?: string[];
}
