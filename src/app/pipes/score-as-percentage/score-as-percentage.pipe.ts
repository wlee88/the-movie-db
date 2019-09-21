import { Pipe, PipeTransform } from '@angular/core';

/**
 * Given a user score, converts it to a percentage display
 * note: due to time constraints i'm not catering for if the user score
 * has more than 1 Significant figure after the decimal
 *
 * Example:
 *  Given a user score of 7.7 will convert to 77%.
 */
@Pipe({
	name: 'scoreAsPercentage'
})
export class ScoreAsPercentagePipe implements PipeTransform {
	transform(score: number): any {
		return this.convert(score);
	}

	convert(score: number): string {
		if (isNaN(score)) {
			return '0%';
		}

		return `${score * 10}%`;
	}
}
