import { ScoreAsPercentagePipe } from './score-as-percentage.pipe';

describe.only('ScoreAsPercentagePipe', () => {
	let sut: ScoreAsPercentagePipe;

	beforeEach(() => {
		sut = new ScoreAsPercentagePipe();
	});

	test.each([[7.7, '77%'], [1.3, '13%'], [9.8, '98%'], [NaN, '0%'], ['some-string', '0%']])(
		'it should transform %s to %s',
		(score: number, expected: string) => {
			expect(sut.transform(score)).toContain(expected);
		}
	);
});
