goog.provide('spider.controllers.App');

goog.require('spider.controllers.Viewport');
goog.require('spider.controllers.BlockTool');
goog.require('spider.controllers.SelectTool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 */
spider.controllers.App = function() {
	this.viewport = new spider.controllers.Viewport(this);

	/** @type {Array.<spider.controllers.Tool>} */
	this.tools = [
		new spider.controllers.SelectTool(this.viewport),
		new spider.controllers.BlockTool(this.viewport),
	];

	/** @type {spider.controllers.Tool} */
	this.activeTool = this.tools[1];

	goog.events.listen(
		document,
		goog.events.EventType.KEYDOWN,
		this._keyDown,
		false,
		this
	);
};

/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
spider.controllers.App.prototype._keyDown = function(e) {
	e.preventDefault();

	if (e.keyCode == goog.events.KeyCodes.V) {
		this.activeTool = this.tools[0];
	}
	else if (e.keyCode == goog.events.KeyCodes.B) {
		this.activeTool = this.tools[1];
	}
};
