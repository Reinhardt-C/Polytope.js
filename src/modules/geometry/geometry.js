import Vertex from "./vertex.js";
import Element from "./element.js";

/** Class for polytopes in arbitrary dimensions */
export default class Polytope {
	/**
	 * Create a new polytope
	 * @param {Vertex[]} vertices - Array of vertices
	 * @param {Element[][]} elements - Array of arrays of elements, starting at faces, each successive element is of one higher dimension.
	 */
	constructor(vertices, elements) {
		this.vertices = vertices;
		this.elements = elements;
	}
}