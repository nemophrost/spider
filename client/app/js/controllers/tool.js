goog.provide('spider.controllers.Tool');

/**
 * @param {spider.controllers.Viewport} viewportController
 * @interface
 */
spider.controllers.Tool = function(viewportController) {};

/**
 * @param {goog.events.BrowserEvent} e
 * @param {goog.math.Coordinate} coord
 */
spider.controllers.Tool.prototype.pointerDown = function(e, coord) {};

/**
 * @param {goog.events.BrowserEvent} e
 * @param {goog.math.Coordinate} coord
 */
spider.controllers.Tool.prototype.pointerMove = function(e, coord) {};

/**
 * @param {goog.events.BrowserEvent} e
 * @param {goog.math.Coordinate} coord
 */
spider.controllers.Tool.prototype.pointerUp = function(e, coord) {};