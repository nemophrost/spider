goog.provide('spider.controllers.App');

goog.require('spider.controllers.Viewport');
goog.require('spider.controllers.BlockTool');

/**
 * @constructor
 */
spider.controllers.App = function() {
	this.viewport = new spider.controllers.Viewport(this);

	/** @type {Array.<spider.controllers.Tool>} */
	this.tools = [
		new spider.controllers.BlockTool(this.viewport),
	];

	/** @type {spider.controllers.Tool} */
	this.activeTool = this.tools[0];
};
