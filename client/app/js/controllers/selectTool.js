goog.provide('spider.controllers.SelectTool');

goog.require('spider.controllers.Tool');
goog.require('spider.dom.Transformer');

goog.require('goog.dom.classes');
goog.require('goog.style');

/**
 * @param {spider.controllers.Viewport} viewportController
 * @constructor
 * @implements {spider.controllers.Tool}
 */
spider.controllers.SelectTool = function(viewportController) {
	this.viewportController = viewportController;

	this.handlesPointerMove = false;

	/** @private */
	this._transformer = new spider.dom.Transformer();
};

/**
 * @inheritDoc
 */
spider.controllers.SelectTool.prototype.pointerDown = function(e, coord) {
	this.anchorCoord = coord;
	if (this.viewportController.isSelectable(e.target)) {
		this.viewportController.setSelection([e.target]);
		this._transformer.setElements(this.viewportController.selection());
	} else {
		this.viewportController.deselectAll();
	}
};

/**
 * @inheritDoc
 */
spider.controllers.SelectTool.prototype.pointerMove = function(e, coord) {};

/**
 * @inheritDoc
 */
spider.controllers.SelectTool.prototype.pointerDrag = function(e, coord) {
	if (!this.anchorCoord)
		return;

	this._transformer.setOffset(goog.math.Coordinate.difference(coord, this.anchorCoord));
};

/**
 * @inheritDoc
 */
spider.controllers.SelectTool.prototype.pointerUp = function(e, coord) {
	this._transformer.applyOffset();
};
