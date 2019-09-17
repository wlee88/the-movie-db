/**
 * Provides a random generated number.
 */
export function randomNumber(upto = 5000): number {
	return Math.round(Math.random() * upto);
}
