import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../../contracts/time';

/**
 * Converts a duration in minutes to a nicely formatted hourly format.
 * For example:
 *  Given an input of 220, returns `3h 40 min`
 */
@Pipe({
	name: 'durationToHours'
})
export class DurationToHoursPipe implements PipeTransform {
	transform(minutes: number): string {
		const time = this.convert(minutes);
		return `${time.hours}h ${time.minutes}min`;
	}

	/**
	 * Given a quantity of minutes return a time object.
	 * @param minutesToConvert to be be converted to time object
	 */
	private convert(minutesToConvert: number): Time {
		const hours = minutesToConvert / 60;
		const roundedDownHours = Math.floor(hours);
		const roundedUpMinutes = Math.round((hours - roundedDownHours) * 60);

		return { hours: roundedDownHours, minutes: roundedUpMinutes };
	}
}
