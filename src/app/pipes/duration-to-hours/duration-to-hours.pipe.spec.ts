import { DurationToHoursPipe } from './duration-to-hours.pipe';
import { PipeTransform } from '@angular/core';

describe('DurationToHoursPipe', () => {
	let sut: PipeTransform;

	beforeEach(() => {
		sut = new DurationToHoursPipe();
	});

	test.each([[220, '3h 40m'], [180, '3h 0m'], [40, '0h 40m']])('it should transform %s to %s', (duration, expected) => {
		expect(sut.transform(duration)).toContain(expected);
	});
});
