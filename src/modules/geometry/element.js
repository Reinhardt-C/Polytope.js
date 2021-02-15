/** Class for elements in arbitrary dimensions */
export default class Element {
	/**
	 * Create a new element
	 * @param {Number} dimension - Dimension of this element
	 * @param {Number[]} indices - Indices of subelements
	 */
	constructor(dimension, indices) {
		this.dimension = dimension;
		this.indices = indices;
	}
}
