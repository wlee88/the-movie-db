/**
 * Given an object, will split the keys and values into key value query param string.
 * @param queryObject - the object to turn into a query string.
 */
export function objectToQueryParam(queryObject: object): string {
	return Object.keys(queryObject)
		.map(key => key + '=' + queryObject[key])
		.join('&');
}
