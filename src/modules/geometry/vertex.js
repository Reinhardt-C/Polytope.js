/** Class for vertices in arbitrary dimensions */
export default class Vertex {
	/**
	 * Create a new vertex
	 * @param {Number[]} pos - Coordinates of the vertex
	 */
	constructor(...pos) {
		this.pos = pos;
	}

	/**
	 * Create a scaled version of this vertex
	 * @param {Number} k - The scale factor (centered on the origin)
	 * @returns {Vertex} the scaled vertex
	 */
	scale(k) {
		// Multiply all coordinates by scale factor
		return new Vertex(this.pos.map(e => e * k));
	}

	/**
	 * Create a scaled version of a vertex
	 * @param {Vertex} vertex - The vertex to scale
	 * @param {Number} k - The scale factor (centered on the origin)
	 * @returns {Vertex} the scaled vertex
	 */
	static scale(vertex, k) {
		return vertex.scale(k);
	}

	/**
	 * Create a rotated version of this vertex
	 * @param {Number[]} axes - The axes (0 is X, 1 is Y, 2 is Z, 3 is W/X4, etc) that form the plane to rotate around
	 * @param {Number} theta - The angle to rotate by
	 * @returns {Vertex} the rotated vertex
	 */
	rotate(axes, theta) {
		// Max dimension used in the rotation
		const dim = Math.max(1, this.dim - 1, ...axes) + 1;
		// Clone to avoid changing this vertex
		const a = [...this.pos];
		// Get require number of extra dimensions
		const dif = dim - this.dim;
		// Add zeroes to allow rotating a vertex in dimensions higher than its own
		for (let i = 0; i < dif; i++) a.push(0);
		// Constant so changing values in a  works
		const v0 = a[axes[0]];
		const v1 = a[axes[0]];
		// Change coordinates along axes by sine/cosine for rotation
		a[axes[0]] = Math.cos(theta) * v0 - Math.sin(theta) * v1;
		a[axes[1]] = Math.sin(theta) * v0 + Math.cos(theta) * v1;
		return new Vertex(...a);
	}

	/**
	 * Create a rotated version of a vertex
	 * @param {Vertex} vertex - The vertex to rotate
	 * @param {Number[]} axes - The axes (0 is X, 1 is Y, 2 is Z, 3 is W/X4, etc) that form the plane to rotate around
	 * @param {Number} theta - The angle to rotate by
	 * @returns {Vertex} the rotated vertex
	 */
	static rotate(vertex, axes, theta) {
		return vertex.rotate(axes, theta);
	}

	/**
	 * Create a version of this vertex projected to lower dimensions
	 * @param {Number} dim - The dimensions to project to
	 * @return {Vertex} the projected vertex
	 */
	project(dim = 3) {
		// If the dim to project to is higher add zeroes
		if (dim > this.dim) return this.pos.concat(...new Array(dim - this.dim).fill(0));
		// Clone to avoid changing this
		let pos = [...this.pos];
		// Factor to multiply all coordinates within target dimensions by at end
		let prod = 1;
		// Constant to use while changing length
		const t = pos.length;
		// Loop over higher dimensions
		for (let i = 3; i < t; i++) {
			// Get the camera position securely
			const cp =
				SETTINGS.cameraPosition.length >= pos.length ? SETTINGS.cameraPosition[pos.length - 1] : 1;
			// Get the coordinate being removed
			let w = pos.pop();
			// Avoid dividing by 0
			if (w == cp) w += 0.0001;
			// Change the product
			prod /= cp - w;
		}
		// For loop is more efficient, as this method is called very often it creates a significant change in performance
		for (let i = 0; i < pos.length; i++) {
			// Scale by prod
			pos[i] = pos[i] * prod;
		}
		// Return the projected vertex
		return new Vertex(...pos);
	}

	/**
	 * Create a version of this vertex projected to lower dimensions
	 * @param {Vertex} vertex - The vertex to project
	 * @param {Number} dim - The dimensions to project to
	 * @return {Vertex} the projected vertex
	 */
	static project(vertex, dim) {
		return vertex.project(dim);
	}

	/**
	 * The dimension of this vertex
	 * @returns {Number} the number of dimensions this vertex is defined in
	 */
	get dim() {
		return this.pos.length;
	}

	/**
	 * The distance from this vertex to the origin
	 * @returns {Number} the magnitude of the vertex's vector
	 */
	get length() {
		return Math.sqrt(this.pos.reduce((a, b) => a + b ** 2));
	}
}
