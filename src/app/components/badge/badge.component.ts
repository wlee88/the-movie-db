import { Component, Input } from '@angular/core';

const HIGH_USER_SCORE_BADGE_CSS_CLASS = 'badge--high';
const AVERAGE_USER_SCORE_BADGE_CSS_CLASS = 'badge--average';
const LOW_USER_SCORE_BADGE_CSS_CLASS = 'badge--low';

@Component({
	selector: 'badge',
	templateUrl: './badge.component.html',
	styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
	@Input() voteAverage: number;

	/**
	 * Given a score, determine which class to return
	 */

	get scoreClass() {
		if (this.voteAverage >= 7.5) {
			return HIGH_USER_SCORE_BADGE_CSS_CLASS;
		}
		if (this.voteAverage > 5 && this.voteAverage < 7.5) {
			return AVERAGE_USER_SCORE_BADGE_CSS_CLASS;
		}
		if (this.voteAverage < 5) {
			return LOW_USER_SCORE_BADGE_CSS_CLASS;
		}

		return '';
	}
}
