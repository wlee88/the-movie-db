const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w200/';
export function resolveFullImagePath(movieImagePath: string) {
	return `${BASE_IMAGE_URL}${movieImagePath}`;
}
