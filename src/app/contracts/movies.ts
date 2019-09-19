export interface Movie {
	vote_count: number;
	id: number;
	video: boolean;
	vote_average: number;
	title: string;
	popularity: number;
	poster_path: string;
	original_language: string;
	original_title: string;
	genre_ids: number[];
	backdrop_path: string;
	adult: boolean;
	runtime: number;
	overview: string;
	release_date: string;
}

export type Movies = Array<Movie>;

export interface MoviesListResponse {
	page: number;
	results: Movies;
	total_pages: number;
	total_results: number;
}
