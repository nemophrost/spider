goog.provide('spider.controllers.SelectTool');

goog.require('goog.dom.classes');
goog.require('goog.style');

goog.require('spider.controllers.Tool');

/**
 * @param {spider.controllers.Viewport} viewportController
 * @constructor
 * @implements {spider.controllers.Tool}
 */
spider.controllers.SelectTool = function(viewportController) {
	this.viewportController = viewportController;
};

/**
 * @inheritDoc
 */
spider.controllers.SelectTool.prototype.pointerDown = function(e, coord) {
	this.viewportController.setSelection([e.target]);
};

/**
 * @inheritDoc
 */
spider.controllers.SelectTool.prototype.pointerMove = function(e, coord) {
	
};

/**
 * @inheritDoc
 */
spider.controllers.SelectTool.prototype.pointerUp = function(e, coord) {
	
};
