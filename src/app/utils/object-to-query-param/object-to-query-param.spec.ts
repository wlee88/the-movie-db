import { objectToQueryParam } from './object-to-query-param';

describe('object-to-query-param', () => {
	it('should convert correctly', () => {
		const queryObject = { a: 'b', c: 'd', e: 'f' };
		const expected = 'a=b&c=d&e=f';
		const actual = objectToQueryParam(queryObject);
		expect(actual).toEqual(expected);
	});
});
