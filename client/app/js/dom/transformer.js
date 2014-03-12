goog.provide('spider.dom.Transformer');

goog.require('spider.controllers.Viewport');
goog.require('spider.controllers.BlockTool');
goog.require('spider.controllers.SelectTool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 */
spider.dom.Transformer = function() {
	/**
	 * @type {!Array.<Element>}
	 * @private
	 */
	this._elements = [];
};

/**
 * @param {!Array.<Element>} elements
 */
spider.dom.Transformer.prototype.setElements = function(elements) {
	this._elements = goog.array.map(elements, function(element) {
		return {
			element: element,
		};
	});
};

/**
 * @param {goog.math.Coordinate} offset
 */
spider.dom.Transformer.prototype.setOffset = function(offset) {
	goog.array.forEach(this._elements, function(obj) {
		obj.offset = offset;
		obj.element.style.WebkitTransform = 'translate(' + offset.x + 'px,' + offset.y + 'px)';
	});
};

/**
 * Apply offsets for each element
 */
spider.dom.Transformer.prototype.applyOffset = function() {
	goog.array.forEach(this._elements, function(obj) {
		if (obj.offset) {
			obj.element.style.WebkitTransform = '';
			obj.element.style.left = (parseInt(obj.element.style.left, 10) + obj.offset.x) + 'px';
			obj.element.style.top = (parseInt(obj.element.style.top, 10) + obj.offset.y) + 'px';
			delete obj.offset;
		}
	});
};
