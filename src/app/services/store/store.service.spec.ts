import { StoreService } from './store.service';
import * as uuid from 'uuid';

describe('StoreService', () => {
	let sut: StoreService;
	let expectedValue: string;
	beforeEach(() => {
		sut = new StoreService();
		expectedValue = uuid();
	});

	describe('when a value is set in the store', () => {
		beforeEach(() => {
			sut.setValue(expectedValue);
		});

		it('should return the expected value when getting the value', () => {
			expect(sut.getValue()).toBe(expectedValue);
		});

		describe('and the value is subscribed to', () => {
			let actual: string;

			beforeEach(() => {
				sut.getObservable().subscribe(value => (actual = value));
			});
			it('should emit the latest value', () => {
				expect(actual).toBe(expectedValue);
			});
		});
	});
});
