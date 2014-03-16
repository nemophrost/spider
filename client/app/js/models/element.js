goog.provide('spider.models.Element');

goog.require('goog.math.Coordinate');
goog.require('goog.math.Size');
goog.require('goog.math.Rect');

/**
 * @interface
 */
spider.models.Element = function() {};

/**
 * Get or set the element's offset parent
 * @param {spider.models.Element=} offsetParent
 * @return {spider.models.Element}
 */
spider.models.Element.prototype.offsetParent = function(opt_offsetParent) {};

/**
 * Get the real DOM Element
 * @return {Element}
 */
spider.models.Element.prototype.get = function() {};

/**
 * Get or set the x coordinate of the origin
 * @param {number=} opt_x
 * @return {number}
 */
spider.models.Element.prototype.x = function(opt_x) {};

/**
 * Get or set the y coordinate of the origin
 * @param {number=} opt_y
 * @return {number}
 */
spider.models.Element.prototype.y = function(opt_y) {};

/**
 * Get or set the top y coordinate of the element
 * @param {number=} opt_top
 * @return {number}
 */
spider.models.Element.prototype.top = function(opt_top) {};

/**
 * Get or set the bottom y coordinate of the element
 * @param {number=} opt_bottom
 * @return {number}
 */
spider.models.Element.prototype.bottom = function(opt_bottom) {};

/**
 * Get or set the left x coordinate of the element
 * @param {number=} opt_left
 * @return {number}
 */
spider.models.Element.prototype.left = function(opt_left) {};

/**
 * Get or set the right x coordinate of the element
 * @param {number=} opt_right
 * @return {number}
 */
spider.models.Element.prototype.right = function(opt_right) {};

/**
 * Get or set the width of the element including padding and border
 * @param {number=} opt_width
 * @return {number}
 */
spider.models.Element.prototype.width = function(opt_width) {};

/**
 * Get or set the height of the element including padding and border
 * @param {number=} opt_height
 * @return {number}
 */
spider.models.Element.prototype.height = function(opt_height) {};

/**
 * Get or set the origin of an element (top left corner)
 * @param {goog.math.Coordinate=} opt_origin
 * @return {goog.math.Coordinate}
 */
spider.models.Element.prototype.origin = function(opt_origin) {};

/**
 * Get or set the size of the element (border box)
 * @param {goog.math.Size=} opt_size
 * @return {goog.math.Size}
 */
spider.models.Element.prototype.size = function(opt_size) {};

/**
 * Get or set the bounding box of the element (border box)
 * @param {goog.math.Rect=} opt_rect
 * @return {goog.math.Rect}
 */
spider.models.Element.prototype.rect = function(opt_rect) {};

/**
 * Get or set the transformation anchor point for the element (defaults to 0.5, 0.5)
 * @param {goog.math.Coordinate=} opt_anchorPoint
 * @return {goog.math.Coordinate}
 */
spider.models.Element.prototype.anchorPoint = function(opt_anchorPoint) {};

/**
 * Get the corner points of the element's bounding box [top left, top right, bottom right, bottom left] including rotation
 * @return {Array.<goog.math.Coordinate>}
 */
spider.models.Element.prototype.corners = function() {};

/**
 * Set an offset for the element
 * @param {goog.math.Coordinate} offset
 */
spider.models.Element.prototype.setOffset = function(offset) {};

/**
 * Apply the last set offset for the element
 */
spider.models.Element.prototype.applyOffset = function() {};
