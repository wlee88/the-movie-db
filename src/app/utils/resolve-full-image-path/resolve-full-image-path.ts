import { Breakpoint, RetinaImage } from '@thisissoon/angular-image-loader';
import { Movie } from '../../contracts';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const IMAGE_LOADING_PLACEHOLDER_URL = 'http://via.placeholder.com/100x150?text=Image+Loading';
export const IMAGE_MISSING_PLACEHOLDER_URL = 'http://via.placeholder.com/100x150?text=Missing+Image';
export const BREAKPOINTS: Breakpoint[] = [
	{ size: 'xs', width: 0 },
	{ size: 'md', width: 768 },
	{ size: 'lg', width: 992 }
];

export enum ImageQuality {
	ORIGINAL = 'original',
	HIGH = 'w500',
	MEDIUM = 'w300',
	LOW = 'w200'
}
export function resolveFullImagePath(movieImagePath: string, quality: ImageQuality) {
	return `${BASE_IMAGE_URL}/${quality}/${movieImagePath}`;
}
export function prepareResponsiveImages(movie: Movie): RetinaImage[] {
	return [
		{
			size: 'xs',
			x1: resolveFullImagePath(movie.poster_path, ImageQuality.LOW),
			x2: resolveFullImagePath(movie.poster_path, ImageQuality.LOW)
		},
		{
			size: 'md',
			x1: resolveFullImagePath(movie.poster_path, ImageQuality.MEDIUM),
			x2: resolveFullImagePath(movie.poster_path, ImageQuality.MEDIUM)
		},
		{
			size: 'lg',
			x1: resolveFullImagePath(movie.poster_path, ImageQuality.HIGH),
			x2: resolveFullImagePath(movie.poster_path, ImageQuality.HIGH)
		}
	];
}
