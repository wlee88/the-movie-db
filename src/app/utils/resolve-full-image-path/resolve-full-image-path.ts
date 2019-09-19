const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
export function resolveFullImagePath(movieImagePath: string) {
	return `${BASE_IMAGE_URL}${movieImagePath}`;
}
