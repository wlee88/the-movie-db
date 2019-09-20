const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export enum ImageQuality {
	ORIGINAL = 'original',
	HIGH = 'w500',
	MEDIUM = 'w300',
	LOW = 'w200'
}
export function resolveFullImagePath(movieImagePath: string, quality: ImageQuality) {
	return `${BASE_IMAGE_URL}/${quality}/${movieImagePath}`;
}
