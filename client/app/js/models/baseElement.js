goog.provide('spider.models.BaseElement');

goog.require('spider.models.Element');
goog.require('spider.util.ThreadMemoizer');

/**
 * @implements {spider.models.Element}
 * @param {Element} element
 */
spider.models.BaseElement = function(element) {
	/** @protected */
	this._el = element;
};

/** @inheritDoc */
spider.models.BaseElement.prototype.offsetParent = function(opt_offsetParent) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.get = function() {
	return this._el;
};

/** @inheritDoc */
spider.models.BaseElement.prototype.x = spider.util.ThreadMemoizer(function(opt_x) {
	return this._el.offsetLeft;
});

/** @inheritDoc */
spider.models.BaseElement.prototype.y = function(opt_y) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.top = function(opt_top) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.bottom = function(opt_bottom) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.left = function(opt_left) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.right = function(opt_right) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.width = function(opt_width) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.height = function(opt_height) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.origin = function(opt_origin) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.size = function(opt_size) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.rect = function(opt_rect) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.anchorPoint = function(opt_anchorPoint) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.corners = function() {};

/** @inheritDoc */
spider.models.BaseElement.prototype.setOffset = function(offset) {};

/** @inheritDoc */
spider.models.BaseElement.prototype.applyOffset = function() {};
