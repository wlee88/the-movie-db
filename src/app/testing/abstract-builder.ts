export type BuilderCallback<TResult> = (entity: TResult) => Partial<TResult>;

/**
 * Base implementation for a generic builder pattern.
 * Example usage:
 *  * - new MovieBuilder().build();
 * You be selective with which property you want changed while keeping the others random
 * by using the `with` function, before building the result.
 *
 * Example usage:
 * - new MovieBuilder().with({title: 'new test title}).build();
 */
export abstract class AbstractBuilder<TResult> {
	constructor(protected readonly result: TResult) {}

	with(valueObjectOrCallback: Partial<TResult> | BuilderCallback<TResult>): this {
		// Check valueObject is a class.
		const mutation =
			typeof valueObjectOrCallback === 'function' ? valueObjectOrCallback(this.result) : valueObjectOrCallback;
		Object.assign(this.result, mutation);
		return this;
	}

	build(): TResult {
		return this.result;
	}
}
